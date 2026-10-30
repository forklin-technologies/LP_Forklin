"use client";

import { useInView } from "@/hooks/useInView";
import RevealTitle from "./RevealTitle";

const STEPS = [
  {
    title: "Diagnóstico",
    desc: "Entendemos o seu processo, as pessoas envolvidas e onde está o gargalo.",
  },
  {
    title: "Proposta",
    desc: "Escopo, prazo e investimento claros antes de qualquer linha de código.",
  },
  {
    title: "Desenvolvimento",
    desc: "Construção em etapas, com entregas que você acompanha e valida.",
  },
  {
    title: "Implantação e suporte",
    desc: "Treinamento do time e evolução contínua depois que o sistema entra no ar.",
  },
];

export default function B2B() {
  const [textRef, textVisible] = useInView<HTMLDivElement>(0.2, true);
  const [stepsRef, stepsVisible] = useInView<HTMLOListElement>(0.2, true);

  return (
    <section
      id="b2b"
      className="relative scroll-mt-8 px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Passos do trabalho sob medida (esquerda no desktop, depois do texto no celular) */}
        <ol
          ref={stepsRef}
          className="order-2 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:order-1"
        >
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-[opacity,transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:border-[var(--brand)]/35 hover:shadow-[0_24px_48px_-24px_rgba(4,48,119,0.25)] sm:p-7"
              style={{
                opacity: stepsVisible ? 1 : 0,
                transform: stepsVisible ? "none" : "translateY(16px)",
                transitionDelay: stepsVisible ? `${i * 120}ms` : "0ms",
              }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-light)] text-sm font-bold tabular-nums text-[var(--btn-primary)] transition-colors duration-300 group-hover:bg-[var(--btn-primary)] group-hover:text-white">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-lg font-bold tracking-tight text-[var(--ink)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{step.desc}</p>
            </li>
          ))}
        </ol>

        {/* Texto (direita no desktop) */}
        <div
          ref={textRef}
          className={`order-1 transition-all duration-700 ease-out lg:order-2 ${
            textVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="inline-flex rounded-full bg-[var(--btn-primary)] px-5 py-2 text-sm font-semibold text-white">
            B2B personalizado
          </span>
          <RevealTitle
            parts={[
              { text: "Soluções sob medida para" },
              { text: "a sua empresa.", accent: true },
            ]}
            className="mt-6 text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-[var(--ink)]"
          />
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--ink-soft)]">
            Quando o produto pronto não resolve, construímos o sistema em torno do seu
            processo, com a mesma base, segurança e suporte do ecossistema Forklin.
          </p>
        </div>
      </div>
    </section>
  );
}
