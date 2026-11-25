'use client';

import { useEffect, useState } from 'react';

/**
 * False during SSR and the first client render, true afterwards.
 *
 * Anything whose output depends on the current time has to wait for this.
 * These pages are statically generated, so a `new Date()` read during render
 * would be the build time, baked into the HTML forever - which for campaign
 * pricing means a sale that never ends.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
