"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function TuneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="4" cy="14" r="2" fill="currentColor" />
      <circle cx="12" cy="10" r="2" fill="currentColor" />
      <circle cx="20" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 8l-4 4 4 4M15 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 13a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="3"
        y="13"
        width="4"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="17"
        y="13"
        width="4"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M20 19v1a3 3 0 0 1-3 3h-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const CARDS = [
  {
    glass:
      "linear-gradient(155deg, rgba(125,211,252,0.97) 0%, rgba(4,48,119,0.95) 100%)",
    icon: TuneIcon,
    rotate: "lg:-rotate-6",
    shift: "lg:mt-10",
    hidden: "-translate-x-20 translate-y-16 opacity-0 lg:-translate-x-40 lg:translate-y-24",
    delay: "",
    title: "Personalização",
    body: "Soluções moldadas pra realidade do seu negócio — sem fórmula genérica.",
    footer: { kind: "tags" as const, items: ["Design", "Fluxos", "Permissões", "Integrações"] },
  },
  {
    glass:
      "linear-gradient(155deg, rgba(36,81,255,0.98) 0%, rgba(4,48,119,0.97) 100%)",
    icon: CodeIcon,
    rotate: "",
    shift: "lg:mt-0",
    hidden: "translate-y-20 opacity-0 lg:translate-y-32",
    delay: "delay-100",
    title: "Desenvolvimento",
    body: "Do primeiro protótipo ao produto em produção, com foco em resultado.",
    footer: {
      kind: "terminal" as const,
      command: "deploy --production",
      lines: ["✓ build concluído", "✓ live em produção"],
    },
  },
  {
    glass:
      "linear-gradient(155deg, rgba(31,41,55,0.98) 0%, rgba(0,0,0,0.97) 100%)",
    icon: HeadsetIcon,
    rotate: "lg:rotate-6",
    shift: "lg:mt-6",
    hidden: "translate-x-20 translate-y-16 opacity-0 lg:translate-x-40 lg:translate-y-24",
    delay: "delay-200",
    title: "Suporte",
    body: "Acompanhamento de perto, do primeiro dia em diante, pra sua operação nunca parar.",
    footer: {
      kind: "status" as const,
      title: "Suporte online agora",
      subtitle: "Fale com nosso time quando precisar",
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
          <span
            className="block whitespace-nowrap text-[clamp(1.5rem,5vw,3.75rem)]"
          >
            Um ecossistema
          </span>
          <span
            className="block whitespace-nowrap text-[clamp(1.5rem,5vw,3.75rem)]"
          >
            sob <span className="text-[var(--btn-primary)]">medida.</span>
          </span>
        </h2>

        <div
          ref={rowRef}
          className="relative mt-16 flex flex-col items-center gap-8 sm:mt-20 lg:w-fit lg:flex-row lg:items-start lg:gap-2"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`z-10 flex w-full max-w-sm shrink-0 flex-col transition-all duration-700 ease-out ${card.delay} ${card.shift} lg:w-[22rem] lg:min-h-[27rem] xl:w-[26rem] xl:min-h-[29rem] ${
                  visible
                    ? "translate-x-0 translate-y-0 opacity-100"
                    : card.hidden
                }`}
              >
                <div
                  className={`relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/25 p-7 text-white shadow-xl backdrop-blur-xl transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl lg:p-8 xl:p-9 ${card.rotate}`}
                  style={{ background: card.glass }}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-[var(--ink)] shadow-sm">
                    <Icon />
                  </span>

                  <h3 className="mt-5 text-2xl font-bold leading-snug xl:text-[1.75rem]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/80 xl:text-lg">
                    {card.body}
                  </p>

                  <div className="snake-border-white -mx-7 -mb-7 mt-auto flex min-h-32 flex-col justify-center rounded-t-2xl bg-black/25 p-5 lg:-mx-8 lg:-mb-8 xl:-mx-9 xl:-mb-9 xl:min-h-36 xl:p-6">
                    {card.footer.kind === "tags" && (
                      <div className="flex flex-wrap gap-2">
                        {card.footer.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {card.footer.kind === "terminal" && (
                      <div className="font-mono text-xs leading-relaxed text-white/80 xl:text-sm">
                        <div className="mb-2 flex items-center gap-1.5">
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
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {card.footer.title}
                          </p>
                          <p className="text-xs text-white/60">
                            {card.footer.subtitle}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

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
