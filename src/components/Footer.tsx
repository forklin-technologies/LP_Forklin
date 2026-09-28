"use client";

import Logo from "./Logo";
import { SOCIAL_LINKS } from "@/lib/contact";

type FooterLink = { label: string; href: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#top" },
      { label: "Segmentos", href: "#segmentos" },
      { label: "Contato", href: "#contato" },
    ],
  },
  {
    title: "Segmentos",
    links: [
      { label: "For Education", href: "#for-education" },
      { label: "For Sales", href: "#for-sales" },
    ],
  },
  {
    title: "Produtos",
    links: [
      { label: "Diário Digital", href: "#for-education" },
      { label: "Biblioteca", href: "#for-education" },
      { label: "Patrimônio", href: "#for-education" },
    ],
  },
];

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
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

const SOCIAL_ICONS = { Instagram: InstagramIcon, LinkedIn: LinkedInIcon };

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

function ArrowOutIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2.2"
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
    <footer className="relative overflow-hidden bg-gradient-to-r from-[var(--navy)] to-[var(--brand)] px-6 pt-16 text-white sm:px-10 sm:pt-20">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-xs">
            <a href="#top" className="inline-flex" aria-label="Forklin, voltar ao topo">
              <Logo light />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Personalização, desenvolvimento e suporte em um único ecossistema
              de soluções para educação e vendas.
            </p>

            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-5 flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-white/20"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/90">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition hover:text-white"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 group-hover:scale-x-100" />
                        </span>
                        {link.external && (
                          <span className="opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100">
                            <ArrowOutIcon />
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>


        <div className="relative mt-16 border-t border-white/15 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/60 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Forklin Technologies. Todos os direitos
              reservados.
            </p>
            {/* TODO: adicionar Política de Privacidade e Termos de Uso quando as páginas existirem */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className="group inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-4 pr-1.5 text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              Voltar ao topo
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowUpIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
