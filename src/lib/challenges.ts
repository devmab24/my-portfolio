/**
 * Turns a project's free-text `challenges` field into list items for the
 * "Challenges & Solutions" section.
 *
 * Text written as "Challenge 1: <title>" followed by description / "Solution: ..."
 * lines becomes one item per challenge. Any other text becomes one item per line.
 */
export interface ChallengeItem {
  title?: string;
  lines: string[];
}

const HEADING = /^challenge\b[^:]*:\s*(.*)$/i;
/** Leading label that is shown in bold, e.g. "Solution: ..." or "Approach: ...". */
export const LINE_LABEL = /^((?:solution|approach|resolution|outcome|result)s?)\s*:\s*/i;

export function parseChallenges(text: string | undefined): ChallengeItem[] {
  const lines = (text ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.some((line) => HEADING.test(line))) return lines.map((line) => ({ lines: [line] }));

  const items: ChallengeItem[] = [];
  for (const line of lines) {
    const heading = HEADING.exec(line);
    if (heading) items.push({ title: heading[1] || line, lines: [] });
    else if (items.length) items[items.length - 1].lines.push(line);
    else items.push({ lines: [line] });
  }
  return items;
}
