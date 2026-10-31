// LP do ecossistema Forklin (v2): hero com o painel real, "1 conta", do improviso ao sistema,
// as duas frentes, FAQ, orçamento sob medida e rodapé.
//
// O conteúdo vive em arquivos próprios, fáceis de editar:
//   src/landing/body.html  → a estrutura (HTML) de todas as seções
//   src/app/lp.css         → o visual (carregado no layout)
//   public/lp/lp.js        → as animações e a interação (rolagem, FAQ, orçamento via WhatsApp)
//   public/lp/*            → imagens e logos
// A página é gerada estática no build; o HTML já vai pronto para o Google e para quem não tem JavaScript.
//
// A LP anterior (estilo Apple, com barra de pré-lançamento e formulário de contato) continua no
// histórico do Git (último commit antes desta versão: 48e1752) e seus componentes seguem em
// src/components, sem uso.
import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

const html = fs.readFileSync(path.join(process.cwd(), "src/landing/body.html"), "utf8");

export default function Home() {
  return (
    <>
      <div id="fk-lp" dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/lp/lp.js" strategy="afterInteractive" />
    </>
  );
}
