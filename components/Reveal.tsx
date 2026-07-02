"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fade-up reveal on scroll, mirroring the original Framer entrance animations.
 * Respects prefers-reduced-motion (content simply appears).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred to a frame: avoids a synchronous set-state cascade on mount.
      const t = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        // Reveal when scrolled into view — or already above the viewport
        // (jump scrolls and anchor links skip intersection frames).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
