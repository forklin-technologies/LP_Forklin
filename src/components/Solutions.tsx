"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DIARIO_DIGITAL_URL =
  process.env.NEXT_PUBLIC_DIARIO_DIGITAL_URL ?? "https://drclass.forklin.com.br";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Solutions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="solucoes"
      className="relative overflow-hidden bg-[var(--surface)] px-6 pb-10 pt-10 sm:px-10 sm:pb-14 sm:pt-14"
    >
      <Image
        src="/images/hero-network.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover opacity-40"
      />

      <div
        ref={sectionRef}
        className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.5fr] lg:items-center lg:gap-14"
      >
        {/* Texto */}
        <div
          className={`max-w-xl transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="inline-flex rounded-full bg-[var(--btn-primary)] px-5 py-2 text-sm font-semibold text-white">
            Soluções
          </span>

          <h2 className="mt-6 text-balance text-4xl font-bold italic leading-tight sm:text-5xl">
            <span className="text-[var(--ink)]">Da ideia ao produto,</span>
            <br />
            <span className="text-[var(--btn-primary)]">
              em produção real.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-lg text-[var(--ink-soft)]">
            O Diário Digital nasceu de um problema real de gestão escolar.
            Hoje roda em produção, com chamada, calendário e histórico de
            alunos centralizados em um só lugar.
          </p>

          <div className="mt-8 flex max-w-lg items-center gap-3 rounded-full bg-[#38BDF8] p-1.5 pl-6 shadow-lg">
            <p className="flex-1 text-left text-sm font-medium leading-snug text-white">
              Personalização, desenvolvimento e suporte aplicados a um
              produto real.
            </p>
            <a
              href={DIARIO_DIGITAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Acesse
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Imagem do produto */}
        <div
          className={`transition-all delay-150 duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Image
            src="/images/session3-image.png"
            alt="Dashboard do Diário Digital em uso"
            width={2377}
            height={1776}
            sizes="(min-width: 1024px) 820px, 90vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
