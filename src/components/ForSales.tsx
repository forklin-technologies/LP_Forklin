"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import SectionHeader from "./SectionHeader";
import { ArrowRightIcon } from "./icons";

const FRONTS = [
  {
    title: "CRM",
    tagline: "Relacionamento com clientes",
    desc: "Clientes, oportunidades e histórico de contato organizados em um só lugar, para ninguém do time perder o fio da conversa.",
  },
  {
    title: "Gestão comercial",
    tagline: "Metas e equipes",
    desc: "Metas, equipes e processos de venda acompanhados em um painel, com clareza sobre quem faz o quê.",
  },
  {
    title: "Automações",
    tagline: "Menos tarefa manual",
    desc: "Tarefas repetitivas rodando sozinhas, liberando o time para o que realmente vende.",
  },
  {
    title: "Operação de vendas",
    tagline: "Visão do funil",
    desc: "Visão clara do funil, do primeiro contato ao fechamento, para decidir com mais segurança.",
  },
  {
    title: "IA comercial",
    tagline: "Apoio inteligente",
    desc: "Apoio inteligente para priorizar contatos e agir no momento certo.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="origin-center transition-transform duration-500"
        style={{ transform: open ? "scaleY(0)" : "scaleY(1)" }}
      />
    </svg>
  );
}

export default function ForSales() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>(0.2, true);
  const [listRef, visible] = useInView<HTMLUListElement>(0.15, true);
  const [open, setOpen] = useState(0);

  return (
    <section
      id="for-sales"
      className="relative scroll-mt-8 bg-[var(--surface)] px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24"
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={headerRef}
          className={`transition-all duration-700 ease-out ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <SectionHeader
            label="For Sales"
            title={[
              { text: "Operação comercial" },
              { text: "simples e organizada.", accent: true },
            ]}
            description="Estamos construindo soluções para deixar a rotina comercial mais eficiente. Conheça as frentes em que estamos trabalhando."
            action={
              <a
                href="#contato"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-primary)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--btn-primary-hover)]"
              >
                Quero ser avisado
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </a>
            }
          />
        </div>

        {/* Lista editorial: cada frente abre como sanfona (toque ou clique) */}
        <ul ref={listRef} className="mt-12 sm:mt-16">
          {FRONTS.map((front, i) => {
            const isOpen = i === open;
            const delay = i * 110;
            return (
              <li key={front.title} className="relative">
                {/* divisória que se desenha da esquerda para a direita */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left bg-[var(--line)] transition-transform duration-1000 ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                    transitionDelay: visible ? `${delay}ms` : "0ms",
                  }}
                />
                {/* destaque da linha aberta */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px origin-left bg-[var(--btn-primary)] transition-[width] duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                  style={{ width: isOpen && visible ? "100%" : "0%" }}
                />

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`for-sales-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-center gap-4 py-5 text-left transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:gap-8 sm:py-6"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(18px)",
                    transitionDelay: visible ? `${delay + 100}ms` : "0ms",
                  }}
                >
                  <span
                    className={`w-8 shrink-0 text-xs font-medium tabular-nums transition-colors duration-300 sm:w-12 ${
                      isOpen ? "text-[var(--btn-primary)]" : "text-[var(--ink-faint)]"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`flex-1 text-lg font-medium tracking-tight transition-all duration-500 sm:text-xl ${
                      isOpen
                        ? "text-[var(--btn-primary)]"
                        : "text-[var(--ink)] group-hover:translate-x-1"
                    }`}
                  >
                    {front.title}
                  </span>
                  <span className="hidden w-48 text-right text-sm text-[var(--ink-faint)] md:block">
                    {front.tagline}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen
                        ? "rotate-180 border-[var(--btn-primary)] text-[var(--btn-primary)]"
                        : "border-[var(--line)] text-[var(--ink)] group-hover:border-[var(--btn-primary)] group-hover:text-[var(--btn-primary)]"
                    }`}
                  >
                    <PlusIcon open={isOpen} />
                  </span>
                </button>

                <div
                  id={`for-sales-${i}`}
                  className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`flex flex-col gap-3 pb-6 pl-12 pr-12 transition-all duration-500 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:pl-20 ${
                        isOpen ? "translate-y-0 opacity-100 delay-150" : "-translate-y-2 opacity-0"
                      }`}
                    >
                      <p className="max-w-xl text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                        {front.desc}
                      </p>
                      <span className="inline-flex w-fit shrink-0 items-center gap-1.5 text-xs text-[var(--ink-faint)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
                        Em construção
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          <li
            aria-hidden
            className="h-px origin-left bg-[var(--line)] transition-transform duration-1000 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: visible ? `${FRONTS.length * 110}ms` : "0ms",
            }}
          />
        </ul>
      </div>
    </section>
  );
}
