"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { WHATSAPP_URL } from "@/lib/contact";

const NAV_LINKS = [
  { label: "Soluções", href: "#segmentos" },
  { label: "Educação", href: "#for-education" },
  { label: "Vendas", href: "#for-sales" },
  { label: "B2B", href: "#b2b" },
];

/** Header flutuante em vidro (glassmorphism), fixo no topo e arredondado. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Some ao rolar para baixo, volta ao rolar para cima (e sempre visível perto do topo).
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      setScrolled(y > 16);
      if (y < 80) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      if (Math.abs(delta) > 6) lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-3 z-50 px-3 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] sm:top-4 sm:px-6 ${
        hidden && !open ? "-translate-y-[140%]" : "translate-y-0"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl border border-white/70 bg-white/55 backdrop-blur-2xl backdrop-saturate-150 transition-[box-shadow,background-color,border-radius] duration-500 ${
          open ? "rounded-3xl" : "rounded-full"
        } ${
          scrolled
            ? "bg-white/70 shadow-[0_12px_40px_-12px_rgba(4,48,119,0.25)]"
            : "shadow-[0_8px_30px_-16px_rgba(4,48,119,0.2)]"
        }`}
      >
        <div className="flex h-[4.5rem] items-center justify-between pl-6 pr-3 sm:h-20 sm:pl-8">
          <a href="#top" className="flex items-center" onClick={() => setOpen(false)}>
            <Logo className="h-8 sm:h-9" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2.5 text-[15px] font-medium text-[var(--ink-soft)] transition hover:bg-white/70 hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[var(--btn-primary)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(4,48,119,0.6)] transition hover:bg-[var(--btn-primary-hover)] lg:inline-flex"
          >
            Entrar em contato
            <span aria-hidden>&rarr;</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-[var(--ink)] transition hover:bg-white/70 lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 px-3 pb-4 lg:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-white/70"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--btn-primary)] px-5 py-3 text-sm font-semibold text-white"
            >
              Entrar em contato
              <span aria-hidden>&rarr;</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
