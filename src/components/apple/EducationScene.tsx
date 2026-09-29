"use client";

// Cena fixa ("sticky-pinned scene", skill apple-design-web): a seção tem 3 telas de altura e o
// conteúdo fica preso na tela enquanto a rolagem avança. --pin (0→1) escolhe qual dos 3 recursos
// está em foco, e o notebook troca de tela junto. Uma ideia por vez. Sem JS / movimento
// reduzido: tudo continua legível (os 3 textos ficam visíveis empilhados no celular).
import { useCallback, useRef, useState } from "react";
import DiarioDevice, { type TelaDiario } from "./DiarioDevice";
import { useScrollVars, type ScrollVars } from "./scroll";

const PASSOS: { tela: TelaDiario; titulo: string; texto: string }[] = [
  {
    tela: "chamada",
    titulo: "Chamada em poucos cliques.",
    texto: "Todos começam presentes; o professor marca só quem faltou. A frequência de cada estudante se calcula sozinha.",
  },
  {
    tela: "calendario",
    titulo: "Calendário sempre atualizado.",
    texto: "Feriados, férias e dias letivos definidos pela Secretaria valem para a escola inteira, no mesmo instante.",
  },
  {
    tela: "historico",
    titulo: "O histórico em um só lugar.",
    texto: "Frequência, generalidades e menções de cada estudante, mês a mês — mesmo depois de uma transferência.",
  },
];

export default function EducationScene() {
  const ref = useRef<HTMLElement>(null);
  const [passo, setPasso] = useState(0);
  const onUpdate = useCallback((v: ScrollVars) => setPasso(Math.min(PASSOS.length - 1, Math.floor(v.pin * PASSOS.length))), []);
  useScrollVars(ref, onUpdate);

  return (
    <section id="educacao" ref={ref} data-theme-section="light" className="relative md:h-[320vh]">
      <div className="md:sticky md:top-0 md:flex md:h-[100svh] md:items-center">
        <div className="mx-auto w-full max-w-[1100px] px-5 py-24 md:py-0">
          <p className="ap-eyebrow">For Education · Diário Digital</p>
          <h2 className="ap-headline mt-2 max-w-[18ch]">A rotina da sala de aula, simples.</h2>

          <div className="mt-12 grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <ol className="flex flex-col gap-8">
              {PASSOS.map((p, i) => (
                <li
                  key={p.tela}
                  className="ap-step transition-[opacity,transform] duration-500 ease-out"
                  data-ativo={i === passo}
                >
                  <div className="flex items-start gap-4">
                    <span className="ap-step-bar" aria-hidden>
                      <span
                        className="ap-step-fill"
                        style={{
                          transform: `scaleY(${i < passo ? 1 : i > passo ? 0 : `calc(var(--pin, 0) * ${PASSOS.length} - ${i})`})`,
                        }}
                      />
                    </span>
                    <div>
                      <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] sm:text-[28px]">{p.titulo}</h3>
                      <p className="mt-2 max-w-[38ch] text-[17px] leading-relaxed text-[#6e6e73]">{p.texto}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="ap-float">
              <DiarioDevice tela={PASSOS[passo].tela} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
