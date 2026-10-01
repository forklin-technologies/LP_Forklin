"use client";

// "Get the highlights": o bento de soluções. Cards no espírito da LP anterior (borda, ícone,
// marca d'água da logo, elevação no hover) + brilho que segue o mouse — mais vivos que o
// "card quieto" da Apple, mas sem vidro nem gradiente em tudo. A logo 3D gira ao lado do título.
import Image from "next/image";
import { useRef } from "react";
import { useScrollVars } from "./scroll";
import { DeviceFrame } from "./DiarioDevice";
import TelaVideo, { VIDEO_DIARIO } from "./TelaVideo";
import { RevealText, SpotCard } from "./effects";
import { BookIcon, BoxIcon, SparkleIcon, TrendIcon } from "@/components/icons";

type Status = "Em produção" | "Disponível" | "Em breve";
type Card = { rotulo: string; titulo: string; texto: string; status: Status; href: string; area: string; icone: () => React.ReactNode };

const CARDS: Card[] = [
  {
    rotulo: "For Education",
    titulo: "Diário Digital",
    texto: "Chamada, calendário, generalidades e menções. A rotina da sala de aula num só lugar.",
    status: "Em produção",
    href: "#for-education",
    area: "md:col-span-2 md:row-span-2",
    icone: () => <BookIcon size={20} />,
  },
  { rotulo: "For Education", titulo: "Tutor IA", texto: "Estudo com inteligência artificial para apoiar alunos e professores.", status: "Em breve", href: "#fale-conosco-education", area: "", icone: () => <SparkleIcon size={20} /> },
  { rotulo: "For Education", titulo: "Patrimônio", texto: "Bens da instituição registrados, com responsáveis e localização.", status: "Em breve", href: "#fale-conosco-education", area: "", icone: () => <BoxIcon size={20} /> },
  { rotulo: "For Sales", titulo: "Operação comercial", texto: "CRM, automações e IA de apoio à venda.", status: "Em breve", href: "#for-sales", area: "", icone: () => <TrendIcon size={20} /> },
  {
    rotulo: "B2B personalizado",
    titulo: "Sob medida",
    texto: "Sistemas feitos para o processo da sua organização.",
    status: "Disponível",
    href: "#b2b",
    area: "md:col-span-2",
    icone: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M4 7h16M4 12h10M4 17h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

function StatusTag({ s }: { s: Status }) {
  const vivo = s !== "Em breve";
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${vivo ? "text-[#1F8A4C]" : "text-[#6e6e73]"}`}>
      <span className="relative flex h-1.5 w-1.5">
        {vivo && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34C759] opacity-60" />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${vivo ? "bg-[#34C759]" : "bg-[#aeaeb2]"}`} />
      </span>
      {s}
    </span>
  );
}

export default function Highlights() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollVars(ref);

  return (
    <section id="segmentos" data-theme-section="light" className="relative overflow-hidden px-5 py-28 sm:py-36">
      <div className="mx-auto max-w-[1024px]">
        <div className="relative">
          <RevealText texto="Um ecossistema. Várias soluções." destaque={["Várias", "soluções."]} className="ap-headline max-w-[16ch]" />
          <p className="ap-lead mt-4 max-w-[40ch]">Organizado por segmento, com soluções pensadas para a realidade de quem vai usar.</p>
        </div>

        <div ref={ref} className="mt-14 grid gap-4 md:grid-cols-3">
          {CARDS.map((c, i) => {
            const Icone = c.icone;
            const t = `clamp(0, calc(var(--enter, 1) * 3 - ${i * 0.25}), 1)`;
            return (
              <SpotCard
                as="a"
                key={c.titulo}
                href={c.href}
                className={`ap-card group relative flex flex-col overflow-hidden ${c.area}`}
                style={{ opacity: t, transform: `translateY(calc((1 - ${t}) * 40px))` }}
              >
                {i === 0 && (
                <Image
                  src="/images/logo-forklin-mark.png"
                  alt=""
                  aria-hidden
                  width={402}
                  height={446}
                  className="pointer-events-none absolute -right-5 -top-5 h-24 w-auto opacity-[0.06] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110"
                />
                )}
                <div className="relative flex items-center justify-between">
                  <span className="ap-icon-chip">
                    <Icone />
                  </span>
                  <StatusTag s={c.status} />
                </div>
                <p className="relative mt-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--ap-accent)]">{c.rotulo}</p>

                {i === 0 && (
                  <div className="pointer-events-none relative mt-6 w-full self-center transition-transform duration-700 group-hover:-translate-y-1">
                    <DeviceFrame aspecto="aspect-video" label="Demonstração do Diário Digital em vídeo">
                      <TelaVideo src={VIDEO_DIARIO} preload="metadata" />
                    </DeviceFrame>
                  </div>
                )}

                <h3 className={`relative mt-auto pt-6 font-semibold tracking-[-0.02em] text-[#1d1d1f] ${i === 0 ? "text-[36px] leading-[1.05] sm:text-[44px]" : "text-[22px]"}`}>
                  {c.titulo}
                </h3>
                <p className={`relative mt-2 text-[#6e6e73] ${i === 0 ? "max-w-[30ch] text-[18px]" : "text-[15px]"}`}>{c.texto}</p>
                <span className="ap-link relative mt-5 text-[15px]">
                  Saiba mais <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">›</span>
                </span>
              </SpotCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
