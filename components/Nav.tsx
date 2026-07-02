"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { label: "APPROACH", href: "/approach" },
  { label: "WORKSHOPS", href: "/schedule" },
  { label: "ABOUT", href: "/about-us" },
  { label: "OUTCOMES", href: "/outcomes" },
  { label: "GALLERY", href: "/gallery" },
  { label: "BLOG", href: "/blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,calc(100%-2rem))]">
      <nav
        aria-label="Main"
        className="flex items-center justify-between gap-4 rounded-full border border-white/60 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur-xl"
      >
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Young Guns Studio home">
          <Image
            src="/images/logo-wordmark.png"
            alt="Young Guns Studio"
            width={711}
            height={147}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-sans text-[16px] font-bold text-ygs-navy hover:text-ygs-red transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/lets-chat"
            className="hidden sm:inline-flex flex-col items-center rounded-full bg-gradient-to-r from-ygs-red to-ygs-navy px-5 py-2 leading-tight text-white"
          >
            <span className="font-title text-[13px] font-bold italic">START</span>
            <span className="font-heading text-[9px] font-bold tracking-wider">YOUR JOURNEY</span>
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full text-ygs-navy"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="lg:hidden mt-2 rounded-3xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur-xl">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-xl px-4 py-3 font-heading text-sm font-bold text-ygs-navy hover:bg-ygs-pink/30"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/lets-chat"
              className="mt-2 block rounded-xl bg-ygs-red px-4 py-3 text-center font-heading text-sm font-bold text-white"
              onClick={() => setOpen(false)}
            >
              START YOUR JOURNEY
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
