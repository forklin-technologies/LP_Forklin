"use client";

import { useInView } from "@/hooks/useInView";
import SectionHeader from "./SectionHeader";
import { BookIcon, BoxIcon, SparkleIcon } from "./icons";

const FEATURES = [
  "Chamada e frequência em poucos cliques",
  "Calendário escolar sempre atualizado",
  "Histórico dos alunos em um só lugar",
];

const UPCOMING = [
  {
    number: "02",
    icon: SparkleIcon,
    title: "Tutor IA",
    body: "Nossa plataforma de estudo com inteligência artificial, para apoiar alunos e professores.",
  },
  {
    number: "03",
    icon: BoxIcon,
    title: "Patrimônio",
    body: "Bens da instituição registrados, com responsáveis e localização.",
  },
];

/** Card que se revela de baixo para cima (cortina via clip-path) ao entrar na tela. */
function revealStyle(visible: boolean, delay: number) {
  return {
    // recorte final negativo: não corta a sombra do hover
    clipPath: visible ? "inset(-3rem -3rem -3rem -3rem)" : "inset(100% -3rem -3rem -3rem)",
    transition: "clip-path 1s cubic-bezier(.16,1,.3,1)",
    transitionDelay: visible ? `${delay}ms` : "0ms",
  };
}

function DrawnCheck({ visible, delay }: { visible: boolean; delay: number }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-light)] text-[var(--btn-primary)]">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="m5 12.5 4.5 4.5L19 7.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="24"
          style={{
            strokeDashoffset: visible ? 0 : 24,
            transition: "stroke-dashoffset 0.5s ease-out",
            transitionDelay: visible ? `${delay}ms` : "0ms",
          }}
        />
      </svg>
    </span>
  );
}

export default function ForEducation() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>(0.2, true);
  const [gridRef, visible] = useInView<HTMLDivElement>(0.2, true);

  return (
    <section
      id="for-education"
      className="relative scroll-mt-8 px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24"
    >
      <div className="mx-auto max-w-7xl">
        <div
          ref={headerRef}
          className={`transition-all duration-700 ease-out ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <SectionHeader
            label="For Education"
            align="right"
            title={[
              { text: "Simplificando a gestão da" },
              { text: "instituição de ensino.", accent: true },
            ]}
            description="Soluções digitais para escolas e redes de ensino, do diário de classe ao controle de patrimônio."
          />
        </div>

        <div ref={gridRef} className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-3 lg:gap-6">
          {/* Produto em produção: card principal */}
          <article
            className="group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-[border-color,box-shadow] duration-500 hover:border-[var(--brand)]/35 hover:shadow-[0_24px_48px_-24px_rgba(4,48,119,0.25)] sm:p-9 lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1"
            style={revealStyle(visible, 0)}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--btn-primary)] text-white">
                <BookIcon size={22} />
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Em produção
              </span>
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--btn-primary)]">
              01 · Disponível
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
              Diário Digital
            </h3>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--ink-soft)]">
              Nasceu de um problema real de gestão escolar e hoje roda em produção,
              centralizando a rotina da sala de aula.
            </p>

            <ul className="mt-8 grid gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-3 lg:mt-auto">
              {FEATURES.map((feature, i) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 rounded-xl bg-[var(--surface-alt)] p-4 text-sm font-medium leading-snug text-[var(--ink)] transition-all duration-700 ease-out sm:flex-col sm:items-start"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(12px)",
                    transitionDelay: visible ? `${500 + i * 150}ms` : "0ms",
                  }}
                >
                  <DrawnCheck visible={visible} delay={700 + i * 150} />
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          {/* Próximas soluções */}
          {UPCOMING.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className={`group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-[border-color,box-shadow] duration-500 hover:border-[var(--brand)]/35 hover:shadow-[0_24px_48px_-24px_rgba(4,48,119,0.25)] sm:p-8 lg:col-start-1 ${
                  i === 0 ? "lg:row-start-1" : "lg:row-start-2"
                }`}
                style={revealStyle(visible, 180 + i * 160)}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-light)] text-[var(--btn-primary)] transition-colors duration-300 group-hover:bg-[var(--btn-primary)] group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--ink-faint)]">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
