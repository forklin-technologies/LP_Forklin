// Página de documento legal da LP (Termos de Uso e Política de Privacidade).
// O texto fica em src/landing/legal/*.html (HTML simples: p, h2, ul/li, strong, a) e o visual em
// src/app/legal.css. A página é gerada estática no build.
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import "@/app/legal.css";

type Props = {
  file: string; // arquivo em src/landing/legal
  title: string;
  updated: string; // ex.: "Atualizados em 26/10/2026."
  other: { href: string; label: string }; // o outro documento, no fim da página
};

export default function LegalPage({ file, title, updated, other }: Props) {
  const html = fs.readFileSync(path.join(process.cwd(), "src/landing/legal", file), "utf8");
  return (
    <div className="lg">
      <header className="lg-nav">
        <Link href="/" aria-label="Forklin, voltar ao início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lp/logo.png" alt="Forklin" width={128} height={33} />
        </Link>
        <nav className="lg-links" aria-label="Principal">
          <Link href="/">Início</Link>
          <Link href="/#s4">Soluções</Link>
          <Link href="/#s2">Produtos</Link>
          <Link href="/#oqs">Fale conosco</Link>
        </nav>
        <div className="lg-acts">
          <a href="https://app.forklin.com.br" rel="noopener">
            Acessar
          </a>
          <Link className="lg-cta" href="/#oqs">
            Solicitar orçamento
            <span className="ar">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </header>

      <main className="lg-main">
        <h1>{title}</h1>
        <p className="lg-up">{updated}</p>

        <article className="lg-doc" dangerouslySetInnerHTML={{ __html: html }} />

        <footer className="lg-foot">
          <Link href={other.href}>{other.label}</Link>
          <span>© 2026 Forklin. Todos os direitos reservados.</span>
        </footer>
      </main>
    </div>
  );
}
