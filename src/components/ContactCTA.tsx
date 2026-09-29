"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "./icons";

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
      className="relative scroll-mt-8 px-6 pb-24 pt-16 text-center sm:px-10 sm:pb-32 sm:pt-24"
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
          href="#fale-conosco"
          className="group mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-[var(--btn-primary)] px-10 py-5 text-lg font-semibold text-white shadow-[0_16px_40px_-20px_rgba(4,48,119,0.6)] transition hover:-translate-y-0.5 hover:bg-[var(--btn-primary-hover)]"
        >
          Fale conosco
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRightIcon />
          </span>
        </a>
      </div>
    </section>
  );
}
