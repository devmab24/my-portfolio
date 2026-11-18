import { describe, expect, it } from 'vitest';
import { parseChallenges } from './challenges';

describe('parseChallenges', () => {
  it('groups "Challenge N:" headings with the lines that follow them', () => {
    const text =
      'Challenge 1: Reliable output\n\nResponses can be malformed.\n\nSolution: Validate with Zod.\n\n' +
      'Challenge 2: Rate limiting\r\nServerless instances.\nApproach: Use Redis.';
    expect(parseChallenges(text)).toEqual([
      { title: 'Reliable output', lines: ['Responses can be malformed.', 'Solution: Validate with Zod.'] },
      { title: 'Rate limiting', lines: ['Serverless instances.', 'Approach: Use Redis.'] },
    ]);
  });

  it('keeps text before the first heading as its own item', () => {
    expect(parseChallenges('Intro line\nChallenge: Data\nToo little.')).toEqual([
      { lines: ['Intro line'] },
      { title: 'Data', lines: ['Too little.'] },
    ]);
  });

  it('makes one item per line when there are no headings', () => {
    expect(parseChallenges('First problem.\n\nSecond problem.')).toEqual([
      { lines: ['First problem.'] },
      { lines: ['Second problem.'] },
    ]);
  });

  it('returns nothing for empty text', () => {
    expect(parseChallenges(undefined)).toEqual([]);
    expect(parseChallenges('  \n ')).toEqual([]);
  });
});
