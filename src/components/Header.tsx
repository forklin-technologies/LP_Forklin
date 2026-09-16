"use client";

import { useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Clientes", href: "#clientes" },
  { label: "Como Funciona", href: "#como-funciona" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
        <a href="#top" className="flex items-center">
          <Logo />
        </a>

        <nav className="hidden items-center gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[var(--ink)] transition hover:text-[var(--brand)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <span className="h-6 w-px bg-[var(--line)]" aria-hidden />
          <a
            href="#acessar"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--navy-mid)]"
          >
            Acessar
            <span aria-hidden>&rarr;</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[var(--ink)] lg:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#acessar"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Acessar
              <span aria-hidden>&rarr;</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
