"use client";

import { useEffect, useRef } from "react";

/**
 * Lazy background hero video: poster paints immediately, the video file only
 * loads (then autoplays) once the hero is on screen. Keeps first load light.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = "/hero.mp4";
          video.play().catch(() => {});
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster="/hero-poster.jpg"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
