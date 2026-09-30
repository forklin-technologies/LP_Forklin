// Chamada final + rodapé "gordo" no padrão apple.com: claro (#f5f5f7), colunas de texto,
// sem decoração. Os links/contatos vêm de src/lib/contact.ts (item sem valor não aparece).
import Image from "next/image";
import { RevealText } from "./effects";
import { CONTACT_EMAIL, INSTAGRAM_URL, PRIVACY_URL, TERMS_URL, WHATSAPP_DISPLAY, WHATSAPP_URL, YOUTUBE_URL } from "@/lib/contact";

export function FinalCTA() {
  return (
    <section id="contato" data-theme-section="light" className="px-5 py-24 text-center sm:py-32">
      <RevealText texto="Encontre a solução ideal para a sua organização." destaque={["organização."]} className="ap-headline mx-auto max-w-[13em]" />
      <p className="ap-lead mx-auto mt-5 max-w-[40ch]">Conte o que você precisa. Nossa equipe indica o melhor caminho, sem compromisso.</p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
        <a href="#fale-conosco" className="ap-btn">
          Solicitar orçamento
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="ap-link">
          Falar no WhatsApp <span aria-hidden>›</span>
        </a>
      </div>
    </section>
  );
}

type Link = { label: string; href: string; externo?: boolean };

export function FooterApple() {
  const colunas: { titulo: string; links: Link[] }[] = [
    {
      titulo: "Navegação",
      links: [
        { label: "Início", href: "#top" },
        { label: "Soluções", href: "#segmentos" },
        { label: "Fale conosco", href: "#fale-conosco" },
      ],
    },
    {
      titulo: "Segmentos",
      links: [
        { label: "For Education", href: "#for-education" },
        { label: "For Sales", href: "#for-sales" },
        { label: "B2B personalizado", href: "#b2b" },
      ],
    },
    {
      titulo: "Contato",
      links: [
        { label: WHATSAPP_DISPLAY, href: WHATSAPP_URL, externo: true },
        { label: CONTACT_EMAIL, href: CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : "" },
        { label: "Instagram", href: INSTAGRAM_URL, externo: true },
        { label: "YouTube", href: YOUTUBE_URL, externo: true },
      ],
    },
    {
      titulo: "Legal",
      links: [
        { label: "Termos e condições", href: TERMS_URL },
        { label: "Política de privacidade", href: PRIVACY_URL },
      ],
    },
  ];

  return (
    <footer data-theme-section="light" className="px-5 pb-10 text-[12px] text-[#6e6e73]">
      <div className="mx-auto max-w-[1024px] border-t border-[#d2d2d7] pt-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {colunas.map((c) => {
            const links = c.links.filter((l) => l.href && l.label);
            if (links.length === 0) return null;
            return (
              <div key={c.titulo}>
                <p className="font-semibold text-[#1d1d1f]">{c.titulo}</p>
                <ul className="mt-2.5 space-y-2">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} {...(l.externo ? { target: "_blank", rel: "noreferrer" } : {})} className="hover:text-[#1d1d1f] hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-[#d2d2d7] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} Forklin. Todos os direitos reservados.</p>
          <Image src="/images/logo-forklin-full.png" alt="Forklin" width={1200} height={315} className="h-4 w-auto self-start opacity-70" />
        </div>
      </div>
    </footer>
  );
}
