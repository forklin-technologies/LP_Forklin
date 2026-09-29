"use client";

// Navegação no padrão apple.com (skill apple-design-web + materials): fina (48px), fixa no topo,
// transparente sobre o hero e "vidro fosco" depois de rolar. Vidro só aqui (chrome), nunca nos
// cards. Sobre a seção escura (html[data-theme=dark]) o vidro escurece junto (ver globals.css).
import Image from "next/image";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Educação", href: "#educacao" },
  { label: "Vendas", href: "#vendas" },
  { label: "B2B", href: "#b2b" },
];

export default function Nav() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`ap-nav fixed inset-x-0 top-0 z-50 ${rolou || aberto ? "ap-nav--glass" : ""}`}>
      <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-5" aria-label="Principal">
        <a href="#top" className="flex items-center" aria-label="Forklin, início">
          <Image src="/images/logo-forklin-full.png" alt="Forklin" width={1200} height={315} priority className="ap-logo h-[18px] w-auto" />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="ap-nav-link text-[13px]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#fale-conosco" className="ap-btn ap-btn--sm">
            Fale conosco
          </a>
          <button
            type="button"
            className="ap-nav-link -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            onClick={() => setAberto((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d={aberto ? "M4 4l10 10M14 4 4 14" : "M2 6h14M2 12h14"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      {aberto && (
        <ul className="mx-auto max-w-[1024px] px-5 pb-6 md:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setAberto(false)} className="ap-nav-link block py-3 text-[22px] font-semibold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
