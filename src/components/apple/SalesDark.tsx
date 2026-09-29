"use client";

// O ÚNICO momento escuro da página (skill: claro por padrão, escuro ≤ 1 vez, com propósito).
// A página inteira escurece quando esta seção cruza o meio da tela (useThemeMorph na page) e
// as frentes "acendem" uma a uma conforme a rolagem (--enter suavizado, sem fade genérico).
import { useRef } from "react";
import { useScrollVars } from "./scroll";
import { Logo3D, RevealText } from "./effects";

const FRENTES = ["CRM", "Gestão comercial", "Automações", "Operação de vendas", "IA comercial"];

export default function SalesDark() {
  const ref = useRef<HTMLUListElement>(null);
  useScrollVars(ref);

  return (
    <section id="for-sales" data-theme-section="dark" className="relative overflow-hidden px-5 py-32 sm:py-44">
      {/* a logo 3D gigante, brilhando atrás da lista — gira e sobe com a rolagem */}
      <Logo3D tamanho="clamp(280px, 48vw, 680px)" giro={90} sobe={260} brilho className="absolute -right-[12%] top-[18%] opacity-90" />
      <div className="relative mx-auto max-w-[1024px]">
        <p className="ap-eyebrow">For Sales</p>
        <RevealText texto="Operação comercial. Simples e organizada." destaque={["Simples", "organizada."]} className="ap-headline mt-2 max-w-[16ch]" />
        <p className="ap-lead mt-5 max-w-[42ch]">
          Estamos construindo as soluções que deixam a rotina comercial mais eficiente, do primeiro contato ao fechamento.
        </p>

        <ul ref={ref} className="mt-16 border-t border-[color:var(--ap-line)]">
          {FRENTES.map((f, i) => (
            <li
              key={f}
              className="flex items-baseline justify-between gap-6 border-b border-[color:var(--ap-line)] py-6"
              style={{ opacity: `clamp(0.18, calc(var(--enter, 1) * ${FRENTES.length + 1} - ${i}), 1)` }}
            >
              <span className="text-[32px] font-semibold tracking-[-0.025em] sm:text-[48px]">{f}</span>
              <span className="shrink-0 text-[14px] text-[color:var(--ap-muted)]">Em breve</span>
            </li>
          ))}
        </ul>

        <a href="#fale-conosco-sales" className="ap-link mt-10 inline-block">
          Quero ser avisado do lançamento <span aria-hidden>›</span>
        </a>
      </div>
    </section>
  );
}
