#!/usr/bin/env node
// PreToolUse hook: block file edits in this project until Claude has queried
// Context7 docs (query-docs) since the user's latest message.
//
// Exempt: files outside the project (e.g. Claude's memory/scratchpad) and the
// project's own .claude/ folder, so the hook can always be fixed or disabled.
// Fails open (allows the edit) if the transcript can't be read, so a broken
// hook never locks you out.

import { readFileSync } from 'node:fs';
import path from 'node:path';

const CONTEXT7_TOOL = /^mcp__context7(-local)?__query-docs$/;

const allow = () => process.exit(0);

function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason,
      },
    }),
  );
  process.exit(0);
}

let input;
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  allow();
}

const projectDir = path.resolve(process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd());
const target = input.tool_input?.file_path || input.tool_input?.notebook_path;

if (target) {
  const rel = path.relative(projectDir, path.resolve(projectDir, target));
  const outsideProject = rel.startsWith('..') || path.isAbsolute(rel);
  const inClaudeDir = rel === '.claude' || rel.startsWith(`.claude${path.sep}`);
  if (outsideProject || inClaudeDir) allow();
}

let entries;
try {
  entries = readFileSync(input.transcript_path, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
} catch {
  allow();
}

const isHumanPrompt = (e) => {
  if (e.type !== 'user' || e.isMeta) return false;
  if (e.origin?.kind) return e.origin.kind === 'human';
  const c = e.message?.content;
  return typeof c === 'string' || (Array.isArray(c) && !c.some((b) => b.type === 'tool_result'));
};

let lastPrompt = -1;
entries.forEach((e, i) => {
  if (isHumanPrompt(e)) lastPrompt = i;
});

const consulted = entries.slice(lastPrompt + 1).some(
  (e) =>
    e.type === 'assistant' &&
    Array.isArray(e.message?.content) &&
    e.message.content.some((b) => b.type === 'tool_use' && CONTEXT7_TOOL.test(b.name)),
);

if (consulted) allow();

deny(
  'Project rule: look up the relevant Context7 documentation before changing files. ' +
    'Call resolve-library-id, then query-docs (mcp__context7__query-docs) for the library or API this ' +
    'change touches, then retry the edit. If the change does not involve any library, query the docs of ' +
    'the framework the file belongs to (e.g. React, Vite, Tailwind).',
);
