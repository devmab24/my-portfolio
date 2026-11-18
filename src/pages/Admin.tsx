import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Plus, Trash2 } from 'lucide-react';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import type { Project, ProjectType } from '@/types/project';
import { PROJECT_TYPES, cleanProject, projectErrors, slugify } from '@/content/validateProjects';

/**
 * Local admin (dev server only; the route isn't registered in production builds).
 * Every change is written straight to src/content/projects.json through the
 * dev-server API in scripts/local-admin-plugin.ts. Commit + push to publish.
 */

const API = '/__admin/api';
const WRITE_HEADERS = { 'Content-Type': 'application/json', 'X-Local-Admin': '1' };

interface FormState {
  slug: string;
  title: string;
  description: string;
  projectType: ProjectType;
  tags: string;
  imageSrc: string;
  demoUrl: string;
  githubUrl: string;
  downloadUrl: string;
  timeline: string;
  role: string;
  challenges: string;
  keyFeatures: string;
  featured: boolean;
  draft: boolean;
}

const emptyForm = (projectType: ProjectType): FormState => ({
  slug: '', title: '', description: '', projectType, tags: '', imageSrc: '', demoUrl: '', githubUrl: '',
  downloadUrl: '', timeline: '', role: '', challenges: '', keyFeatures: '', featured: false, draft: true,
});

const toForm = (p: Project): FormState => ({
  slug: p.slug, title: p.title, description: p.description, projectType: p.projectType,
  tags: p.tags.join(', '), imageSrc: p.imageSrc ?? '', demoUrl: p.demoUrl ?? '', githubUrl: p.githubUrl ?? '',
  downloadUrl: p.downloadUrl ?? '', timeline: p.timeline ?? '', role: p.role ?? '', challenges: p.challenges ?? '',
  keyFeatures: (p.keyFeatures ?? []).join('\n'), featured: !!p.featured, draft: !!p.draft,
});

const fromForm = (f: FormState): Project =>
  cleanProject({
    slug: f.slug, title: f.title, description: f.description, projectType: f.projectType,
    tags: f.tags.split(','), imageSrc: f.imageSrc, demoUrl: f.demoUrl, githubUrl: f.githubUrl,
    downloadUrl: f.downloadUrl, timeline: f.timeline, role: f.role, challenges: f.challenges,
    keyFeatures: f.keyFeatures.split('\n'), featured: f.featured, draft: f.draft,
  });

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, init);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const problems = body.problems as Record<string, string[]> | undefined;
    const detail = problems ? Object.entries(problems).map(([k, v]) => `${k}: ${v.join(' ')}`).join('\n') : '';
    throw new Error([body.error ?? `Request failed (${res.status})`, detail].filter(Boolean).join('\n'));
  }
  return body as T;
}

const inputClass =
  'w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50';

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <label className="block space-y-1">
    <span className="text-sm font-medium">{label}</span>
    {children}
    {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
  </label>
);

const Admin = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loadError, setLoadError] = useState('');
  const [tab, setTab] = useState<ProjectType>('web');
  const [editing, setEditing] = useState<{ originalSlug: string | null; form: FormState } | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  // Bumped each time the form is opened, so it is scrolled into view even when it
  // was already open (the form sits above the list, often off-screen).
  const [formRequest, setFormRequest] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!formRequest) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    formRef.current?.scrollIntoView?.({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    titleRef.current?.focus({ preventScroll: true });
  }, [formRequest]);

  const load = useCallback(async () => {
    try {
      const [list, imgs] = await Promise.all([api<Project[]>('/projects'), api<string[]>('/images')]);
      setProjects(list);
      setImages(imgs);
      setLoadError('');
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (next: Project[], message: string) => {
    setBusy(true);
    try {
      const result = await api<{ projects: Project[] }>('/projects', {
        method: 'PUT',
        headers: WRITE_HEADERS,
        body: JSON.stringify(next),
      });
      setProjects(result.projects);
      toast({ title: message, description: 'Saved to src/content/projects.json. Commit and push to publish.' });
      return true;
    } catch (e) {
      toast({ title: 'Not saved', description: e instanceof Error ? e.message : String(e), variant: 'destructive' });
      return false;
    } finally {
      setBusy(false);
    }
  };

  const counts = useMemo(() => {
    const c = Object.fromEntries(PROJECT_TYPES.map((t) => [t.value, 0])) as Record<ProjectType, number>;
    projects?.forEach((p) => (c[p.projectType] = (c[p.projectType] ?? 0) + 1));
    return c;
  }, [projects]);

  const startNew = () => {
    setEditing({ originalSlug: null, form: emptyForm(tab) });
    setSlugTouched(false);
    setErrors([]);
    setFormRequest((n) => n + 1);
  };

  const startEdit = (p: Project) => {
    setEditing({ originalSlug: p.slug, form: toForm(p) });
    setSlugTouched(true);
    setErrors([]);
    setFormRequest((n) => n + 1);
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setEditing((cur) => {
      if (!cur) return cur;
      const form = { ...cur.form, [key]: value };
      if (key === 'title' && !slugTouched && cur.originalSlug === null) form.slug = slugify(String(value));
      return { ...cur, form };
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !projects) return;
    const project = fromForm(editing.form);
    const problems = projectErrors(project);
    if (projects.some((p) => p.slug === project.slug && p.slug !== editing.originalSlug)) {
      problems.push(`Slug "${project.slug}" is already used by another project.`);
    }
    setErrors(problems);
    if (problems.length) return;

    const next =
      editing.originalSlug === null
        ? [...projects, project]
        : projects.map((p) => (p.slug === editing.originalSlug ? project : p));
    if (await save(next, editing.originalSlug === null ? `Added "${project.title}"` : `Updated "${project.title}"`)) {
      setTab(project.projectType);
      setEditing(null);
    }
  };

  const remove = async (p: Project) => {
    if (!projects || !window.confirm(`Delete "${p.title}"? This removes it from projects.json.`)) return;
    const deleted = await save(projects.filter((x) => x.slug !== p.slug), `Deleted "${p.title}"`);
    if (deleted && editing?.originalSlug === p.slug) setEditing(null);
  };

  const move = async (p: Project, dir: -1 | 1) => {
    if (!projects) return;
    // Move within the same category, swapping with the neighbouring project of that category.
    const same = projects.map((x, i) => [x, i] as const).filter(([x]) => x.projectType === p.projectType);
    const pos = same.findIndex(([x]) => x.slug === p.slug);
    const other = same[pos + dir];
    if (!other) return;
    const next = [...projects];
    const i = same[pos][1];
    [next[i], next[other[1]]] = [next[other[1]], next[i]];
    await save(next, 'Order updated');
  };

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const doUpload = (overwrite: boolean) =>
        api<{ path: string }>(`/images?name=${encodeURIComponent(file.name)}${overwrite ? '&overwrite=1' : ''}`, {
          method: 'POST',
          headers: { 'Content-Type': file.type || 'application/octet-stream', 'X-Local-Admin': '1' },
          body: file,
        });
      let result: { path: string };
      try {
        result = await doUpload(false);
      } catch (err) {
        if (!(err instanceof Error && err.message.includes('already exists'))) throw err;
        if (!window.confirm(`${file.name} already exists in public/project-images. Replace it?`)) return;
        result = await doUpload(true);
      }
      setImages((cur) => Array.from(new Set([...cur, result.path])).sort());
      update('imageSrc', result.path);
      toast({ title: 'Image uploaded', description: `${result.path}. Prefer WebP, about 1200 px wide.` });
    } catch (e) {
      toast({ title: 'Upload failed', description: e instanceof Error ? e.message : String(e), variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Admin" path="/admin" noindex />
      <div className="container max-w-5xl mx-auto px-4 py-10 space-y-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Projects admin</h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Local only: changes are written to <code>src/content/projects.json</code>. Commit and push to publish them.
              Drafts are hidden on the site.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/projects">View site</Link>
            </Button>
            <Button onClick={startNew} disabled={!projects || busy}>
              <Plus className="mr-1 h-4 w-4" /> Add project
            </Button>
          </div>
        </header>

        {loadError && (
          <p role="alert" className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm whitespace-pre-line">
            Could not load projects: {loadError}
          </p>
        )}
        {!projects && !loadError && <p className="text-muted-foreground">Loading…</p>}

        {editing && (
          <form
            ref={formRef}
            onSubmit={submit}
            className="scroll-mt-6 rounded-xl border border-border/60 bg-card p-6 space-y-5"
            aria-label="Project form"
          >
            <h2 className="text-xl font-semibold">
              {editing.originalSlug === null ? 'New project' : `Edit "${editing.form.title || editing.originalSlug}"`}
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title *">
                <input
                  ref={titleRef}
                  className={inputClass}
                  value={editing.form.title}
                  onChange={(e) => update('title', e.target.value)}
                  required
                />
              </Field>
              <Field label="Slug (URL) *" hint={`/projects/${editing.form.slug || '…'}`}>
                <input
                  className={inputClass}
                  value={editing.form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    update('slug', e.target.value);
                  }}
                  required
                />
              </Field>
              <Field label="Category *">
                <select
                  className={inputClass}
                  value={editing.form.projectType}
                  onChange={(e) => update('projectType', e.target.value as ProjectType)}
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Tags *" hint="Comma-separated, e.g. React, Node.js, MongoDB">
                <input className={inputClass} value={editing.form.tags} onChange={(e) => update('tags', e.target.value)} />
              </Field>
            </div>

            <Field label="Description *">
              <textarea
                className={inputClass}
                rows={3}
                value={editing.form.description}
                onChange={(e) => update('description', e.target.value)}
                required
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Image" hint="Pick an existing image or upload a new one (WebP, ~1200 px wide).">
                <div className="flex gap-2">
                  <select className={inputClass} value={editing.form.imageSrc} onChange={(e) => update('imageSrc', e.target.value)}>
                    <option value="">No image (placeholder icon)</option>
                    {images.map((src) => (
                      <option key={src} value={src}>
                        {src.replace('/project-images/', '')}
                      </option>
                    ))}
                  </select>
                  <label className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-md border border-input px-3 text-sm hover:bg-secondary">
                    Upload
                    <input
                      type="file"
                      accept=".webp,.png,.jpg,.jpeg"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) upload(file);
                        e.target.value = '';
                      }}
                    />
                  </label>
                </div>
              </Field>
              <div className="flex items-end">
                {editing.form.imageSrc && (
                  <img src={editing.form.imageSrc} alt="" width={160} height={90} className="h-[90px] w-40 rounded-md border object-cover" />
                )}
              </div>
              <Field label="Live demo URL" hint="Full https:// link. Leave empty to hide the button.">
                <input className={inputClass} value={editing.form.demoUrl} onChange={(e) => update('demoUrl', e.target.value)} />
              </Field>
              <Field label="GitHub URL" hint="Link to the repository, not just github.com.">
                <input className={inputClass} value={editing.form.githubUrl} onChange={(e) => update('githubUrl', e.target.value)} />
              </Field>
              <Field label="Download URL" hint="e.g. /downloads/script.py (file in public/downloads/)">
                <input className={inputClass} value={editing.form.downloadUrl} onChange={(e) => update('downloadUrl', e.target.value)} />
              </Field>
              <Field label="Timeline" hint="e.g. 3 months. Leave empty to hide.">
                <input className={inputClass} value={editing.form.timeline} onChange={(e) => update('timeline', e.target.value)} />
              </Field>
              <Field label="Role" hint="e.g. Full-Stack Developer. Leave empty to hide.">
                <input className={inputClass} value={editing.form.role} onChange={(e) => update('role', e.target.value)} />
              </Field>
            </div>

            <Field label="Challenges & solutions" hint="Leave empty to hide the section.">
              <textarea className={inputClass} rows={3} value={editing.form.challenges} onChange={(e) => update('challenges', e.target.value)} />
            </Field>
            <Field label="Key features" hint="One per line. Leave empty to hide the section.">
              <textarea className={inputClass} rows={4} value={editing.form.keyFeatures} onChange={(e) => update('keyFeatures', e.target.value)} />
            </Field>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.form.featured} onChange={(e) => update('featured', e.target.checked)} />
                Featured on the homepage
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.form.draft} onChange={(e) => update('draft', e.target.checked)} />
                Draft (hidden on the site)
              </label>
            </div>

            {errors.length > 0 && (
              <ul role="alert" className="list-disc space-y-1 rounded-md border border-destructive/50 bg-destructive/10 p-4 pl-8 text-sm">
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={busy}>
                {busy ? 'Saving…' : 'Save project'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditing(null)} disabled={busy}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {projects && (
          <Tabs value={tab} onValueChange={(v) => setTab(v as ProjectType)}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              {PROJECT_TYPES.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>
                  {t.label} ({counts[t.value]})
                </TabsTrigger>
              ))}
            </TabsList>

            {PROJECT_TYPES.map((t) => {
              const items = projects.filter((p) => p.projectType === t.value);
              return (
                <TabsContent key={t.value} value={t.value} className="mt-6">
                  {items.length === 0 ? (
                    <p className="py-10 text-center text-muted-foreground">No projects in this category yet.</p>
                  ) : (
                    <ul className="divide-y divide-border/60 rounded-xl border border-border/60">
                      {items.map((p, i) => (
                        <li
                          key={p.slug}
                          aria-current={editing?.originalSlug === p.slug ? 'true' : undefined}
                          className={`flex flex-wrap items-center gap-3 p-4 ${
                            editing?.originalSlug === p.slug ? 'bg-primary/5' : ''
                          }`}
                        >
                          {p.imageSrc ? (
                            <img src={p.imageSrc} alt="" width={64} height={40} className="h-10 w-16 rounded object-cover" />
                          ) : (
                            <div className="h-10 w-16 rounded bg-muted" />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-medium">{p.title}</span>
                              {p.draft && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">Draft</span>}
                              {p.featured && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Featured</span>}
                            </div>
                            <p className="truncate text-xs text-muted-foreground">/projects/{p.slug}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button size="icon" variant="ghost" aria-label={`Move ${p.title} up`} disabled={busy || i === 0} onClick={() => move(p, -1)}>
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" aria-label={`Move ${p.title} down`} disabled={busy || i === items.length - 1} onClick={() => move(p, 1)}>
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            {!p.draft && (
                              <Button size="icon" variant="ghost" aria-label={`View ${p.title} on the site`} asChild>
                                <Link to={`/projects/${p.slug}`}>
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}
                            <Button size="icon" variant="ghost" aria-label={`Edit ${p.title}`} disabled={busy} onClick={() => startEdit(p)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" aria-label={`Delete ${p.title}`} disabled={busy} onClick={() => remove(p)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Admin;
