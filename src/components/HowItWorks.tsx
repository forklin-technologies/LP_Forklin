"use client";

import { useEffect, useRef, useState } from "react";

const CARD_GRADIENT = "linear-gradient(135deg, #2451FF 0%, #043077 100%)";

function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" />
      <circle cx="12" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 13h6M9 17h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <span aria-hidden className="text-xl font-bold leading-none">
      {"</>"}
    </span>
  );
}

function RobotIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 7V4M9 4h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="7"
        width="16"
        height="12"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="9" cy="13" r="1.3" fill="currentColor" />
      <circle cx="15" cy="13" r="1.3" fill="currentColor" />
    </svg>
  );
}

const STEPS = [
  {
    number: "01",
    title: "Descoberta",
    body: "Entendemos o seu negócio, desafios e objetivos.",
    icon: ChatIcon,
    card: false,
    shift: "",
  },
  {
    number: "04",
    title: "Evolução",
    body: "Acompanhamos, ajustamos e escalamos juntos.",
    icon: RobotIcon,
    card: true,
    shift: "sm:-mt-6",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    body: "Transformamos a ideia em um produto real.",
    icon: CodeIcon,
    card: true,
    shift: "",
  },
  {
    number: "02",
    title: "Planejamento",
    body: "Definimos escopo, tecnologias e cronogramas.",
    icon: DocIcon,
    card: false,
    shift: "sm:mt-6",
  },
] as const;

export default function HowItWorks() {
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
      id="como-funciona"
      className="relative bg-[var(--surface)] px-6 pb-16 pt-10 sm:px-10 sm:pb-20 sm:pt-14"
    >
      <div
        ref={sectionRef}
        className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-14"
      >
        {/* Cards do processo */}
        <div
          className={`grid grid-cols-2 gap-5 transition-all duration-700 ease-out sm:gap-6 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`rounded-2xl transition-transform duration-300 hover:-translate-y-1 ${step.shift} ${
                  step.card
                    ? "p-6 text-white shadow-xl"
                    : "p-1 text-[var(--ink)]"
                }`}
                style={step.card ? { background: CARD_GRADIENT } : undefined}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      step.card
                        ? "flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"
                        : "flex h-10 w-10 items-center justify-center text-[var(--btn-primary)]"
                    }
                  >
                    <Icon />
                  </span>
                  <span className="text-xl font-bold">{step.number}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p
                  className={`mt-1.5 text-sm leading-relaxed ${
                    step.card ? "text-white/85" : "text-[var(--ink-soft)]"
                  }`}
                >
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Texto */}
        <div
          className={`transition-all delay-150 duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="inline-flex rounded-full bg-[var(--btn-primary)] px-5 py-2 text-sm font-semibold text-white">
            Como funciona
          </span>

          <h2 className="mt-6 text-balance text-4xl font-bold italic leading-tight sm:text-5xl">
            <span className="text-[var(--ink)]">Um processo claro,</span>
            <br />
            <span className="text-[var(--ink)]">Do início ao </span>
            <span className="text-[var(--btn-primary)]">resultado.</span>
          </h2>

          <p className="mt-6 max-w-md text-lg text-[var(--ink-soft)]">
            Acreditamos em um processo transparente e colaborativo, com foco
            em entender o seu contexto, construir a melhor solução e evoluir
            junto com o seu negócio.
          </p>
        </div>
      </div>
    </section>
  );
}
