"use client";

import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "#";

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
    <section className="relative bg-[var(--surface)] px-6 pb-24 pt-16 text-center sm:px-10 sm:pb-32 sm:pt-20">
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
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--navy)] px-12 py-5 text-lg font-semibold text-white transition hover:bg-[var(--navy-mid)]"
        >
          Falar no WhatsApp
        </a>
      </div>
    </section>
  );
}
