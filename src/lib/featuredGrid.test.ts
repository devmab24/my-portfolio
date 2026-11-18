import { describe, expect, it } from 'vitest';
import { featuredItemClass } from './featuredGrid';

const spans = (total: number) => Array.from({ length: total }, (_, i) => featuredItemClass(i, total));
const lgSpan = (cls: string) => Number(/lg:col-span-(\d)/.exec(cls)?.[1]);

describe('featuredItemClass', () => {
  it('lays 4 projects out as a full 2 x 2 grid', () => {
    expect(spans(4).map(lgSpan)).toEqual([3, 3, 3, 3]);
    expect(spans(4).some((c) => c.includes('md:col-span-2'))).toBe(false);
  });

  it('keeps 3 per row when the count divides by 3', () => {
    expect(spans(3).map(lgSpan)).toEqual([2, 2, 2]);
    expect(spans(6).map(lgSpan)).toEqual([2, 2, 2, 2, 2, 2]);
  });

  it('widens a short last row so it fills the width', () => {
    expect(spans(5).map(lgSpan)).toEqual([2, 2, 2, 3, 3]);
    expect(spans(7).map(lgSpan)).toEqual([2, 2, 2, 2, 2, 2, 6]);
  });

  it('every row adds up to the full width for 1 to 12 projects', () => {
    for (let total = 1; total <= 12; total++) {
      const sum = spans(total).map(lgSpan).reduce((a, b) => a + b, 0);
      expect(sum % 6).toBe(0);
    }
  });

  it('stretches an odd last card across both columns at tablet width', () => {
    expect(spans(5)[4]).toContain('md:col-span-2');
    expect(spans(5)[3]).not.toContain('md:col-span-2');
  });
});
