"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function PermissionsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FluxosIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 12h3.5l2-7 4 14 2-7h5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IntegracoesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 15l6-6M8 12l-2 2a3 3 0 104.2 4.2l2-2M16 12l2-2a3 3 0 10-4.2-4.2l-2 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CARDS = [
  {
    glass:
      "linear-gradient(155deg, rgba(125,211,252,0.97) 0%, rgba(4,48,119,0.95) 100%)",
    rotate: "lg:-rotate-6",
    shift: "lg:mt-10",
    hidden: "-translate-x-20 translate-y-16 opacity-0 lg:-translate-x-40 lg:translate-y-24",
    delay: "",
    number: "01",
    topRight: "Sob medida",
    title: "Personalização",
    body: "Soluções moldadas pra realidade do seu negócio — sem fórmula genérica.",
    tagline: "Feito para o seu contexto.",
    footer: {
      kind: "list" as const,
      items: [
        { label: "Design", icon: DesignIcon },
        { label: "Permissões", icon: PermissionsIcon },
        { label: "Fluxos", icon: FluxosIcon },
        { label: "Integrações", icon: IntegracoesIcon },
      ],
    },
  },
  {
    glass:
      "linear-gradient(155deg, rgba(36,81,255,0.98) 0%, rgba(4,48,119,0.97) 100%)",
    rotate: "",
    shift: "lg:mt-0",
    hidden: "translate-y-20 opacity-0 lg:translate-y-32",
    delay: "delay-100",
    number: "02",
    topRight: "Do planejamento ao resultado",
    title: "Desenvolvimento",
    body: "Do primeiro protótipo ao produto em produção, com foco em resultado.",
    tagline: "Código que gera valor.",
    footer: {
      kind: "terminal" as const,
      command: "deploy --production",
      lines: ["✓ build concluído", "✓ testes aprovados", "✓ live em produção"],
    },
  },
  {
    glass:
      "linear-gradient(155deg, rgba(31,41,55,0.98) 0%, rgba(0,0,0,0.97) 100%)",
    rotate: "lg:rotate-6",
    shift: "lg:mt-6",
    hidden: "translate-x-20 translate-y-16 opacity-0 lg:translate-x-40 lg:translate-y-24",
    delay: "delay-200",
    number: "03",
    topRight: "Sempre presente",
    title: "Suporte",
    body: "Acompanhamento de perto, do primeiro dia em diante, pra sua operação nunca parar.",
    tagline: "Mais que suporte. Parceria.",
    footer: {
      kind: "status" as const,
      title: "Suporte online agora",
      subtitle: "Fale com nosso time quando precisar.",
    },
  },
];

export default function EcosystemCards() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--surface)] px-6 pb-10 pt-10 sm:px-10 sm:pb-14 sm:pt-14">
      <Image
        src="/images/hero-network.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover opacity-40"
      />

      <div className="relative mx-auto max-w-7xl lg:w-fit">
        <h2 className="font-semibold italic leading-tight text-[var(--ink)]">
          <span className="block whitespace-nowrap text-[clamp(1.5rem,5vw,3.75rem)]">
            Conhecimento
          </span>
          <span className="block whitespace-nowrap text-[clamp(1.5rem,5vw,3.75rem)]">
            em <span className="text-[var(--btn-primary)]">movimento.</span>
          </span>
        </h2>

        <div
          ref={rowRef}
          className="relative mt-16 flex flex-col items-center gap-8 sm:mt-20 lg:w-fit lg:flex-row lg:items-stretch lg:gap-2"
        >
          {CARDS.map((card) => (
            <div
              key={card.title}
              className={`z-10 flex w-full max-w-sm shrink-0 flex-col transition-all duration-700 ease-out ${card.delay} ${card.shift} lg:w-[22rem] lg:min-h-[19rem] xl:w-[26rem] xl:min-h-[21rem] ${
                visible
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : card.hidden
              }`}
            >
              <div
                className={`relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/25 p-7 text-white shadow-xl backdrop-blur-xl transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl lg:p-8 xl:p-9 ${card.rotate}`}
                style={{ background: card.glass }}
              >
                {/* marca d'água decorativa */}
                <Image
                  src="/images/logo-forklin.png"
                  alt=""
                  aria-hidden
                  width={96}
                  height={96}
                  className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 opacity-[0.12] xl:h-24 xl:w-24"
                />

                {/* cabeçalho: número + rótulo */}
                <div className="relative flex items-start justify-between">
                  <span className="text-sm font-medium text-white/70">
                    {card.number}
                  </span>
                  {card.topRight && (
                    <div className="text-right">
                      <div className="ml-auto mb-1.5 h-px w-10 bg-white/25" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
                        {card.topRight}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="relative mt-5 text-2xl font-bold leading-snug xl:text-[1.75rem]">
                  {card.title}
                </h3>
                <p className="relative mt-3 text-base leading-relaxed text-white/80 xl:text-lg">
                  {card.body}
                </p>

                {/* conteúdo do pilar */}
                <div className="relative mt-6">
                  {card.footer.kind === "list" && (
                    <div className="space-y-2.5">
                      {card.footer.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={item.label}
                            className="flex items-center gap-3 rounded-xl bg-[rgba(4,48,119,0.5)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[rgba(4,48,119,0.65)]"
                          >
                            <ItemIcon />
                            <span className="flex-1">{item.label}</span>
                            <span className="text-white/60">
                              <ChevronIcon />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {card.footer.kind === "terminal" && (
                    <div className="rounded-xl bg-black/30 p-4 font-mono text-xs leading-relaxed text-white/80 xl:text-sm">
                      <div className="mb-2.5 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-red-400/80" />
                        <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                      </div>
                      <p className="text-white">
                        <span className="text-emerald-300">$ </span>
                        {card.footer.command}
                      </p>
                      {card.footer.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  )}

                  {card.footer.kind === "status" && (
                    <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3.5">
                      <span className="relative flex h-3 w-3 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">
                          {card.footer.title}
                        </p>
                        <p className="text-xs text-white/60">
                          {card.footer.subtitle}
                        </p>
                      </div>
                      <span className="text-white/50">
                        <ChevronIcon />
                      </span>
                    </div>
                  )}

                </div>

                <div className="relative mt-auto flex items-center gap-2 pt-6 text-xs text-white/50">
                  <span className="h-px w-4 bg-white/30" />
                  {card.tagline}
                </div>
              </div>
            </div>
          ))}

          <div className="pointer-events-none absolute right-0 top-0 z-0 hidden w-40 -translate-y-[74%] lg:block xl:w-52 xl:-translate-y-[76%]">
            <div className="ml-auto w-fit -rotate-3 rounded-2xl rounded-br-sm bg-white px-3.5 py-2 text-xs font-medium leading-snug text-[var(--ink)] shadow-md">
              Olá Viajante 👋
              <br />
              Precisa de ajuda?
            </div>
            <Image
              src="/images/robot-session2-nobg.png"
              alt="Assistente virtual Forklin"
              width={324}
              height={418}
              className="mt-1 w-full -rotate-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
