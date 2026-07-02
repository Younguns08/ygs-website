"use client";

import { useEffect, useState } from "react";

/**
 * Letter-by-letter stagger reveal, matching the original Framer hero
 * headline animation (each character fades in and rises with a small delay).
 * Screen readers get the intact string; the animated copy is aria-hidden.
 */
export default function SplitText({
  text,
  className = "",
  baseDelay = 0,
  stagger = 18,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  const [go, setGo] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    // Kick off on mount (hero is above the fold).
    const t = requestAnimationFrame(() => setGo(true));
    return () => cancelAnimationFrame(t);
  }, []);

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={className}>
        {[...text].map((ch, i) =>
          ch === " " ? (
            " "
          ) : (
            <span
              key={i}
              className="inline-block will-change-transform"
              style={{
                opacity: go ? 1 : 0,
                transform: go ? "none" : "translateY(0.6em)",
                transition: `opacity 0.45s ease ${baseDelay + i * stagger}ms, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${baseDelay + i * stagger}ms`,
              }}
            >
              {ch}
            </span>
          )
        )}
      </span>
    </>
  );
}
