/**
 * Spread onto an above-the-fold <img> to fetch it early: <img {...highPriority} />.
 * React 18 only knows the lowercase DOM attribute (camelCase `fetchPriority` arrives
 * in React 19 and warns on 18); spreading keeps TypeScript's React 18 types happy.
 * After upgrading to React 19, replace with the `fetchPriority="high"` prop.
 */
export const highPriority = { fetchpriority: 'high' } as Record<string, string>;
