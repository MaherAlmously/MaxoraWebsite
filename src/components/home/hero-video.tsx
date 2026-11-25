'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { useIsDarkTheme } from '@/lib/use-is-dark-theme';

const POSTER = '/video/hero-network-poster.jpg';
const CLIP = '/video/hero-network.mp4';

/**
 * Ambient footage behind the hero headline: an abstract teal network mesh,
 * which happens to sit almost exactly on the brand's cyan.
 *
 * The poster frame is the base layer and always renders, so server HTML, a
 * failed load, and `prefers-reduced-motion` all land on the same still image.
 * The <video> is only mounted after hydration when motion is welcome, which
 * means the 1.3 MB clip is never fetched for people who asked not to see
 * animation - pausing it after the fact would still have cost them the
 * download.
 *
 * Everything is heavily scrimmed in `HeroBackground`; this component only
 * supplies the imagery.
 */
export function HeroVideo() {
  const reduceMotion = useReducedMotion();
  const isDark = useIsDarkTheme();
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Decorative, and 1.3 MB of it. Skip the download entirely for anyone on
    // an explicitly metered connection.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) setSaveData(true);
  }, []);

  // Dark mode only. The footage is bright lines on near-black; composited at
  // a third opacity over the light theme's near-white it just greys the whole
  // hero out, and the clean light background is worth more than the motion.
  const wantsVideo = mounted && isDark && !reduceMotion && !saveData;

  useEffect(() => {
    if (!wantsVideo) return;
    const el = videoRef.current;
    if (!el) return;
    // Autoplay can still be refused (iOS low-power mode, data saver). If it is,
    // we simply never fade the poster out.
    const attempt = el.play();
    if (attempt) attempt.then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [wantsVideo]);

  // Once mounted we know the real theme; in light mode the whole layer goes,
  // poster included. Before mount we match the server, which renders dark.
  if (mounted && !isDark) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element -- next/image would
          add a second decode for a frame the <video> already carries, and this
          is a pure decorative backdrop with a known intrinsic size. */}
      <img
        src={POSTER}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover"
      />

      {wantsVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 [transition-timing-function:var(--ease-out-expo)] ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
          src={CLIP}
          poster={POSTER}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
          tabIndex={-1}
        />
      )}
    </div>
  );
}
