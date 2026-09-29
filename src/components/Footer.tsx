import type { ReactNode } from "react";
import Logo from "./Logo";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  PRIVACY_URL,
  TERMS_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
  YOUTUBE_URL,
} from "@/lib/contact";

type FooterLink = { label: string; href: string; external?: boolean };

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10 9.2 5 2.8-5 2.8V9.2Z" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Só entra o que tiver valor em lib/contact.ts.
const SOCIALS: { label: string; href: string; icon: () => ReactNode; external: boolean }[] = [
  { label: "Instagram", href: INSTAGRAM_URL, icon: InstagramIcon, external: true },
  { label: "YouTube", href: YOUTUBE_URL, icon: YouTubeIcon, external: true },
  {
    label: "E-mail",
    href: CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : "",
    icon: MailIcon,
    external: false,
  },
].filter((social) => social.href);

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#top" },
      { label: "Segmentos", href: "#segmentos" },
      { label: "Fale conosco", href: "#fale-conosco" },
    ],
  },
  {
    title: "Segmentos",
    links: [
      { label: "For Education", href: "#for-education" },
      { label: "For Sales", href: "#for-sales" },
      { label: "B2B personalizado", href: "#b2b" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: WHATSAPP_DISPLAY, href: WHATSAPP_URL, external: true },
      { label: CONTACT_EMAIL, href: CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}` : "" },
      { label: "Termos e condições", href: TERMS_URL },
      { label: "Política de privacidade", href: PRIVACY_URL },
    ].filter((link) => link.href),
  },
].filter((col) => col.links.length > 0);

export default function Footer() {
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
              de soluções para educação, vendas e empresas.
            </p>

            {SOCIALS.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      {...(social.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/85 transition hover:-translate-y-0.5 hover:bg-white hover:text-[var(--btn-primary)]"
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
                        className="group inline-flex items-center gap-1.5 break-all text-sm text-white/70 transition hover:text-white"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 group-hover:scale-x-100" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-16 border-t border-white/15 pb-24 pt-6 sm:pb-6">
          <p className="text-center text-xs text-white/60 sm:text-left">
            © {new Date().getFullYear()} Forklin Technologies. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
