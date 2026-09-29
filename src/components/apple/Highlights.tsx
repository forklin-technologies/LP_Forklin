"use client";

// "Get the highlights": o ÚNICO bento da página (skill: bento uma vez, onde se justifica).
// Cartões sólidos e quietos (sem vidro, sem brilho), tipo e espaço fazem a hierarquia.
// Cada cartão sobe suave ao entrar (--enter suavizado, escalonado pela posição).
import { useRef } from "react";
import { useScrollVars } from "./scroll";
import DiarioDevice from "./DiarioDevice";

type Card = { rotulo: string; titulo: string; texto: string; status: "Em produção" | "Disponível" | "Em breve"; href: string; area: string };

const CARDS: Card[] = [
  {
    rotulo: "For Education",
    titulo: "Diário Digital",
    texto: "Chamada, calendário, generalidades e menções. A rotina da sala de aula num só lugar.",
    status: "Em produção",
    href: "#educacao",
    area: "md:col-span-2 md:row-span-2",
  },
  { rotulo: "For Education", titulo: "Tutor IA", texto: "Estudo com inteligência artificial para apoiar alunos e professores.", status: "Em breve", href: "#educacao", area: "" },
  { rotulo: "For Education", titulo: "Patrimônio", texto: "Bens da instituição registrados, com responsáveis e localização.", status: "Em breve", href: "#educacao", area: "" },
  { rotulo: "For Sales", titulo: "Operação comercial", texto: "CRM, automações e IA de apoio à venda.", status: "Em breve", href: "#vendas", area: "" },
  { rotulo: "B2B personalizado", titulo: "Sob medida", texto: "Sistemas feitos para o processo da sua organização.", status: "Disponível", href: "#b2b", area: "md:col-span-2" },
];

function Status({ s }: { s: Card["status"] }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${s !== "Em breve" ? "text-[#1F8A4C]" : "text-[#6e6e73]"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s !== "Em breve" ? "bg-[#34C759]" : "bg-[#aeaeb2]"}`} />
      {s}
    </span>
  );
}

export default function Highlights() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollVars(ref);

  return (
    <section id="solucoes" data-theme-section="light" className="ap-section-alt px-5 py-28 sm:py-36">
      <div className="mx-auto max-w-[1024px]">
        <h2 className="ap-headline max-w-[16ch]">Um ecossistema. Várias soluções.</h2>
        <p className="ap-lead mt-4 max-w-[40ch]">Organizado por segmento, com soluções pensadas para a realidade de quem vai usar.</p>

        <div ref={ref} className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto]">
          {CARDS.map((c, i) => (
            <a
              key={c.titulo}
              href={c.href}
              className={`ap-card group flex flex-col ${c.area}`}
              style={{
                opacity: `clamp(0, calc(var(--enter, 1) * 3 - ${i * 0.25}), 1)`,
                transform: `translateY(calc((1 - clamp(0, calc(var(--enter, 1) * 3 - ${i * 0.25}), 1)) * 32px))`,
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-[#6e6e73]">{c.rotulo}</p>
                <Status s={c.status} />
              </div>
              {i === 0 && (
                <div className="pointer-events-none mt-8 -mr-[28px] self-end" style={{ width: "92%" }}>
                  <DiarioDevice tela="historico" />
                </div>
              )}
              <h3 className={`mt-auto pt-10 font-semibold tracking-[-0.02em] text-[#1d1d1f] ${i === 0 ? "text-[40px] leading-[1.05] sm:text-[48px]" : "text-[24px]"}`}>
                {c.titulo}
              </h3>
              <p className={`mt-2 text-[#6e6e73] ${i === 0 ? "max-w-[30ch] text-[19px]" : "text-[15px]"}`}>{c.texto}</p>
              <span className="ap-link mt-5 text-[15px]">
                Saiba mais <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">›</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
