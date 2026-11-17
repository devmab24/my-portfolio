/**
 * Local admin API for the dev server (`npm run dev` only; never part of a build).
 *
 *   GET  /__admin/api/projects          -> contents of src/content/projects.json
 *   PUT  /__admin/api/projects          -> validate + write src/content/projects.json
 *   GET  /__admin/api/images            -> files in public/project-images/
 *   POST /__admin/api/images?name=x.webp -> save an uploaded image there
 *
 * Guards: loopback clients only, Host must be localhost (DNS rebinding), and
 * writes need a same-origin request with the X-Local-Admin header (other
 * websites can't send it without a CORS preflight, which is never approved).
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';
import type { Project } from '../src/types/project';
import { cleanProject, validateProjects } from '../src/content/validateProjects';

const API = '/__admin/api';
const MAX_JSON_BYTES = 1024 * 1024; // 1 MB
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const IMAGE_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};
// SVG can carry scripts when opened directly, so uploads are raster-only
// (existing SVGs can still be listed and picked).
const UPLOAD_TYPES = new Set(['.webp', '.png', '.jpg', '.jpeg']);
const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '[::1]', '::1']);

const isLoopback = (address?: string) =>
  !!address && (address === '::1' || address === '127.0.0.1' || address.startsWith('::ffff:127.') || address.startsWith('127.'));

const hostnameOf = (hostHeader?: string) => {
  if (!hostHeader) return '';
  return hostHeader.startsWith('[') ? hostHeader.slice(0, hostHeader.indexOf(']') + 1) : hostHeader.split(':')[0];
};

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

async function readBody(req: IncomingMessage, limit: number): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += (chunk as Buffer).length;
    if (size > limit) throw Object.assign(new Error(`Upload too large (max ${Math.round(limit / 1024 / 1024)} MB).`), { status: 413 });
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks);
}

async function writeAtomic(file: string, data: string | Buffer) {
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, data);
  await fs.rename(tmp, file);
}

export function localAdmin(root: string): Plugin {
  const projectsFile = path.join(root, 'src', 'content', 'projects.json');
  const imagesDir = path.join(root, 'public', 'project-images');

  return {
    name: 'local-admin',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        if (!url.pathname.startsWith(API)) return next();

        // --- guards -----------------------------------------------------------
        if (!isLoopback(req.socket.remoteAddress)) return send(res, 403, { error: 'The admin only works from this computer.' });
        if (!LOCAL_HOSTNAMES.has(hostnameOf(req.headers.host))) return send(res, 403, { error: 'Open the admin via http://localhost.' });
        const isWrite = req.method !== 'GET';
        if (isWrite) {
          const origin = req.headers.origin;
          const sameOrigin = origin !== undefined && origin === `http://${req.headers.host}`;
          if (req.headers['x-local-admin'] !== '1' || !sameOrigin) {
            return send(res, 403, { error: 'Writes must come from the admin page.' });
          }
        }

        try {
          // --- projects -------------------------------------------------------
          if (url.pathname === `${API}/projects`) {
            if (req.method === 'GET') {
              return send(res, 200, JSON.parse(await fs.readFile(projectsFile, 'utf8')));
            }
            if (req.method === 'PUT') {
              let list: unknown;
              try {
                list = JSON.parse((await readBody(req, MAX_JSON_BYTES)).toString('utf8'));
              } catch {
                return send(res, 400, { error: 'Request body is not valid JSON.' });
              }
              const cleaned = Array.isArray(list) ? (list as Project[]).map((p) => cleanProject(p)) : list;
              const problems = validateProjects(cleaned);
              if (Object.keys(problems).length) return send(res, 422, { error: 'Validation failed.', problems });
              await writeAtomic(projectsFile, JSON.stringify(cleaned, null, 2) + '\n');
              return send(res, 200, { saved: (cleaned as Project[]).length, projects: cleaned });
            }
          }

          // --- images ---------------------------------------------------------
          if (url.pathname === `${API}/images`) {
            if (req.method === 'GET') {
              const files = (await fs.readdir(imagesDir)).filter((f) => IMAGE_TYPES[path.extname(f).toLowerCase()]).sort();
              return send(res, 200, files.map((f) => `/project-images/${f}`));
            }
            if (req.method === 'POST') {
              const raw = url.searchParams.get('name') ?? '';
              const ext = path.extname(raw).toLowerCase();
              const base = path
                .basename(raw, path.extname(raw))
                .toLowerCase()
                .replace(/[^a-z0-9_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
              if (!base || !UPLOAD_TYPES.has(ext)) {
                return send(res, 400, { error: 'Use a .webp, .png or .jpg image with a simple file name.' });
              }
              const name = `${base}${ext}`;
              const target = path.join(imagesDir, name);
              if (path.dirname(target) !== imagesDir) return send(res, 400, { error: 'Invalid file name.' });
              const exists = await fs.stat(target).then(() => true, () => false);
              if (exists && url.searchParams.get('overwrite') !== '1') {
                return send(res, 409, { error: `public/project-images/${name} already exists.`, path: `/project-images/${name}` });
              }
              const body = await readBody(req, MAX_IMAGE_BYTES);
              if (!body.length) return send(res, 400, { error: 'The file is empty.' });
              await writeAtomic(target, body);
              return send(res, 201, { path: `/project-images/${name}`, bytes: body.length });
            }
          }

          return send(res, 404, { error: 'Unknown admin endpoint.' });
        } catch (error) {
          const status = (error as { status?: number }).status ?? 500;
          return send(res, status, { error: error instanceof Error ? error.message : 'Unexpected error.' });
        }
      });
    },
  };
}
