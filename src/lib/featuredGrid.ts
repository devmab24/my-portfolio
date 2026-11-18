/**
 * Layout for the homepage "Featured Projects" grid, so the last row is never left
 * half-empty. The grid is `grid-cols-1 md:grid-cols-2 lg:grid-cols-6`; each card
 * spans part of those columns:
 *
 * - md (2 columns): an odd last card spans the full row.
 * - lg: counts like 4 or 8 use 2 columns (a full 2 x n grid). Otherwise 3 per row,
 *   and the cards in a short last row widen to fill it (2 → halves, 1 → full width).
 *
 * The class names are written out in full because Tailwind only generates classes
 * it finds as complete strings in the source.
 */
export const FEATURED_GRID_CLASS = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6';

export function featuredItemClass(index: number, total: number): string {
  const classes: string[] = [];

  if (total % 2 === 1 && index === total - 1) classes.push('md:col-span-2');

  const twoColumns = total % 3 !== 0 && total % 2 === 0;
  if (twoColumns) {
    classes.push('lg:col-span-3');
  } else {
    const remainder = total % 3;
    const inLastRow = remainder > 0 && index >= total - remainder;
    if (!inLastRow) classes.push('lg:col-span-2');
    else classes.push(remainder === 1 ? 'lg:col-span-6' : 'lg:col-span-3');
  }

  return classes.join(' ');
}
