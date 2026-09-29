"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import SectionHeader from "./SectionHeader";
import { ArrowRightIcon, CapIcon, TrendIcon } from "./icons";

const SEGMENTS = [
  {
    id: "for-education",
    number: "01",
    label: "For Education",
    title: "Educação",
    body: "Soluções para simplificar a gestão e a rotina de escolas e redes de ensino.",
    icon: CapIcon,
    items: [
      { name: "Diário Digital", status: "Disponível" },
      { name: "Tutor IA", status: "Em breve" },
      { name: "Patrimônio", status: "Em breve" },
    ],
  },
  {
    id: "for-sales",
    number: "02",
    label: "For Sales",
    title: "Vendas",
    body: "Ferramentas para organizar a operação comercial, do primeiro contato ao fechamento.",
    icon: TrendIcon,
    items: [
      { name: "CRM e gestão comercial", status: "Em breve" },
      { name: "Automações", status: "Em breve" },
      { name: "IA de apoio à venda", status: "Em breve" },
    ],
  },
];

export default function Segments() {
  const [ref, visible] = useInView<HTMLDivElement>();
  const scrollRef = useScrollProgress<HTMLDivElement>();

  return (
    <section
      id="segmentos"
      className="relative px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24"
    >
      <div ref={ref} className="mx-auto max-w-7xl">
        <div
          className={`transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <SectionHeader
            label="Segmentos"
            title={[
              { text: "Uma Forklin, dois jeitos de" },
              { text: "crescer.", accent: true },
            ]}
            description="Um único ecossistema, organizado por segmento, com soluções pensadas para a realidade de quem vai usar."
          />
        </div>

        <div
          ref={scrollRef}
          className="mt-14 grid gap-6 lg:grid-cols-[1fr_minmax(0,15rem)_1fr] lg:items-center lg:gap-4"
        >
          {/* A marca no centro, "dividindo-se" nos dois segmentos */}
          <div className="relative mx-auto -my-2 w-28 sm:w-40 lg:order-2 lg:my-0 lg:w-full">
            <Image
              src="/images/forklin-mark-3d.png"
              alt="Símbolo da Forklin"
              width={1100}
              height={1100}
              sizes="(min-width: 1024px) 240px, 208px"
              className="relative will-change-transform"
              style={{
                transform:
                  "translateY(calc((0.5 - var(--pass, 0.5)) * 60px)) rotate(calc((var(--pass, 0.5) - 0.5) * 24deg)) scale(calc(0.85 + var(--enter, 1) * 0.15))",
              }}
            />
          </div>

          {SEGMENTS.map((segment, i) => {
            const Icon = segment.icon;
            return (
              <a
                key={segment.id}
                href={`#${segment.id}`}
                className={`group flex flex-col rounded-2xl ${i === 0 ? "lg:order-1" : "lg:order-3"} border border-[var(--line)] bg-[var(--surface)] p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[var(--brand)]/35 hover:shadow-[0_24px_48px_-24px_rgba(4,48,119,0.25)] sm:p-9 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: visible ? `${150 + i * 120}ms` : "0ms" }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-light)] text-[var(--btn-primary)] transition-colors duration-300 group-hover:bg-[var(--btn-primary)] group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--ink-faint)]">
                    {segment.number}
                  </span>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--btn-primary)]">
                  {segment.label}
                </p>
                <h3 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)]">
                  {segment.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
                  {segment.body}
                </p>

                <ul className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {segment.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between py-3.5 text-sm"
                    >
                      <span className="font-medium text-[var(--ink)]">{item.name}</span>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                          item.status === "Disponível"
                            ? "text-emerald-700"
                            : "text-[var(--ink-faint)]"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.status === "Disponível"
                              ? "bg-emerald-500"
                              : "bg-[var(--ink-faint)]/60"
                          }`}
                        />
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>

                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--btn-primary)]">
                  Conhecer o segmento
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
