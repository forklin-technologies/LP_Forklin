"use client";

import Image from "next/image";

const PRODUCT_COLUMNS = [
  {
    title: "PRODUTO",
    links: [{ label: "Privacidade", href: "#" }],
  },
  { title: "PRODUTO", links: [] as { label: string; href: string }[] },
  { title: "PRODUTO", links: [] as { label: string; href: string }[] },
  { title: "PRODUTO", links: [] as { label: string; href: string }[] },
];

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M7.5 10v6.5M7.5 7.5v.01M11.5 16.5V13c0-1.4.9-2.2 2-2.2s1.8.8 1.8 2.2v3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 19V5M6 11l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[var(--navy)] to-[var(--brand)] px-6 pb-8 pt-16 text-white sm:px-10 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-1.5">
              <Image
                src="/images/logo-forklin.png"
                alt=""
                aria-hidden
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-lg font-bold">forklin</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Personalização, desenvolvimento e suporte — em um único
              ecossistema de soluções.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            {PRODUCT_COLUMNS.map((col, i) => (
              <div key={i}>
                <h3 className="text-xs font-bold uppercase tracking-wide text-white/90">
                  {col.title}
                </h3>
                {col.links.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-white/70 transition hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
          className="absolute bottom-8 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-10"
        >
          <ArrowUpIcon />
        </button>

        <div className="mt-12 border-t border-white/15 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/60 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Forklin Technologies – Todos os
              direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition hover:text-white">
                Política de Privacidade
              </a>
              <a href="#" className="transition hover:text-white">
                Termos de Uso
              </a>
              <a href="#" className="transition hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
