"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import { WhatsAppIcon } from "./WhatsAppButton";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contato"
      className="relative scroll-mt-8 bg-[var(--surface)] px-6 pb-24 pt-16 text-center sm:px-10 sm:pb-32 sm:pt-24"
    >
      <div
        ref={sectionRef}
        className={`mx-auto max-w-4xl transition-all duration-700 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="text-balance text-5xl font-extrabold leading-tight text-[var(--ink)] sm:text-6xl lg:text-7xl">
          Encontre a solução ideal
          <br />
          para sua{" "}
          <span className="text-[var(--btn-primary)]">organização.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--ink-soft)]">
          Conte-nos o que sua organização precisa e nossa equipe ajudará
          você a encontrar as soluções Forklin que melhor atendem ao seu
          momento.
        </p>

        <p className="mt-3 text-sm text-[var(--ink-faint)]">
          Atendimento personalizado. Sem compromisso.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-4 rounded-full border border-[var(--line)] bg-white py-2.5 pl-2.5 pr-9 text-lg font-semibold text-[var(--navy)] shadow-[0_16px_40px_-20px_rgba(4,48,119,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(4,48,119,0.45)]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 group-hover:scale-105">
            <WhatsAppIcon size={24} />
          </span>
          Falar no WhatsApp
        </a>

        <p className="mt-4 text-sm font-medium text-[var(--ink-soft)]">
          {WHATSAPP_DISPLAY}
        </p>
      </div>
    </section>
  );
}
