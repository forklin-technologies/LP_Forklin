"use client";

// B2B: volta para o claro. Três pilares em tipografia (sem caixas) e o processo em 4 etapas
// numa linha que se "desenha" com a rolagem (--through suavizado).
import { useRef } from "react";
import { useScrollVars } from "./scroll";

const PILARES = [
  { titulo: "Personalização", texto: "Soluções moldadas para a realidade do seu negócio — sem fórmula genérica." },
  { titulo: "Desenvolvimento", texto: "Do primeiro protótipo ao produto em produção, com foco em resultado." },
  { titulo: "Suporte", texto: "Acompanhamento de perto, do primeiro dia em diante, para a operação nunca parar." },
];

const ETAPAS = [
  { titulo: "Diagnóstico", texto: "Entendemos o seu processo, as pessoas envolvidas e onde está o gargalo." },
  { titulo: "Proposta", texto: "Escopo, prazo e investimento claros antes de qualquer linha de código." },
  { titulo: "Desenvolvimento", texto: "Construção em etapas, com entregas que você acompanha e valida." },
  { titulo: "Implantação e suporte", texto: "Treinamento do time e evolução contínua depois que o sistema entra no ar." },
];

export default function B2BSection() {
  const ref = useRef<HTMLOListElement>(null);
  useScrollVars(ref);

  return (
    <section id="b2b" data-theme-section="light" className="px-5 py-28 sm:py-40">
      <div className="mx-auto max-w-[1024px]">
        <p className="ap-eyebrow">B2B personalizado</p>
        <h2 className="ap-headline mt-2 max-w-[16ch]">Sob medida para a sua organização.</h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {PILARES.map((p) => (
            <div key={p.titulo}>
              <h3 className="text-[21px] font-semibold tracking-[-0.015em] text-[#1d1d1f]">{p.titulo}</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-[#6e6e73]">{p.texto}</p>
            </div>
          ))}
        </div>

        <ol ref={ref} className="relative mt-24 grid gap-10 sm:grid-cols-4 sm:gap-6">
          {/* linha do processo, desenhada pela rolagem */}
          <span aria-hidden className="absolute left-0 right-0 top-[15px] hidden h-[2px] bg-[#e5e5ea] sm:block" />
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[15px] hidden h-[2px] origin-left bg-[var(--ap-accent)] sm:block"
            style={{ transform: "scaleX(clamp(0, calc(var(--through, 1) * 2.2 - 0.45), 1))" }}
          />
          {ETAPAS.map((e, i) => (
            <li key={e.titulo} className="relative">
              <span className="relative flex h-[31px] w-[31px] items-center justify-center rounded-full bg-white text-[13px] font-semibold text-[#1d1d1f] ring-1 ring-[#d2d2d7]">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[19px] font-semibold text-[#1d1d1f]">{e.titulo}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#6e6e73]">{e.texto}</p>
            </li>
          ))}
        </ol>

        <a href="#fale-conosco-b2b" className="ap-link mt-14 inline-block">
          Solicitar um diagnóstico <span aria-hidden>›</span>
        </a>
      </div>
    </section>
  );
}
