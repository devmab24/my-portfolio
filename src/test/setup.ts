import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom has no IntersectionObserver (used by AnimatedSection). Report every
// element as visible straight away so animated sections render their content.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(private readonly callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver;
window.scrollTo = () => {};

afterEach(() => {
  cleanup();
  localStorage.clear();
});
