'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the `.dark` class the theme toggle puts on <html>.
 *
 * There is no ThemeProvider in this app - `theme-toggle.tsx` flips the class
 * directly and a pre-paint script in the root layout restores it - so anything
 * that needs the theme in JS (rather than in CSS, where `dark:` handles it)
 * has to watch the element.
 *
 * Defaults to true, matching the server-rendered `className="dark"`.
 */
export function useIsDarkTheme(): boolean {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true,
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
