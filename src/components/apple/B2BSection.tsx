"use client";

// B2B sob medida — uma cena presa à tela (skill apple-design-web: sticky-pinned scene) em que
// o improviso vira sistema: as peças soltas do dia a dia (planilha, papel, WhatsApp, sistemas
// que não se falam) se juntam no centro e dão lugar a UMA janela organizada. Sem cards, sem
// abas: o movimento é a explicação. Não repete o bloco do robô (Personalização/Desenvolvimento/
// Suporte). Dados da janela são fictícios. Com "reduzir movimento" a cena já abre no resultado.
import { useCallback, useRef } from "react";
import { useScrollVars, type ScrollVars } from "./scroll";

// Peças do improviso: onde começam (dx/dy a partir do centro) e a inclinação.
const PECAS = [
  { t: "planilha_final_v7.xlsx", dx: "-34vw", dy: "-26svh", r: -9 },
  { t: "Ficha de papel", dx: "30vw", dy: "-30svh", r: 7 },
  { t: "Grupo do WhatsApp", dx: "-38vw", dy: "6svh", r: 5 },
  { t: "Sistema A", dx: "34vw", dy: "-2svh", r: -6 },
  { t: "Sistema B", dx: "-26vw", dy: "32svh", r: -4 },
  { t: "Quem aprovou?", dx: "28vw", dy: "30svh", r: 8 },
  { t: "e-mail perdido", dx: "4vw", dy: "-19svh", r: 3 },
];

const LINHAS = [
  ["Compra de materiais", "Em análise", "AL"],
  ["Reserva da sala 2", "Aprovado", "MR"],
  ["Manutenção do projetor", "Em andamento", "JS"],
  ["Contrato de fornecedor", "Aguardando", "CP"],
];

export default function B2BSection() {
  const ref = useRef<HTMLElement>(null);

  const onUpdate = useCallback((v: ScrollVars) => {
    const el = ref.current;
    if (!el) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = (n: number) => Math.min(1, Math.max(0, n));
    const e = reduzir ? 1 : c(v.pin / 0.5); // 0 → 1: as peças se juntam
    const w = reduzir ? 1 : c((v.pin - 0.32) / 0.3); // 0 → 1: a janela aparece
    const f = reduzir ? 1 : c((v.pin - 0.72) / 0.18); // 0 → 1: texto final e botão
    el.style.setProperty("--e", e.toFixed(4));
    el.style.setProperty("--w", w.toFixed(4));
    el.style.setProperty("--f", f.toFixed(4));
  }, []);
  useScrollVars(ref, onUpdate);

  return (
    <section id="b2b" ref={ref} data-theme-section="light" className="relative h-[280svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center overflow-hidden px-5">
        {/* título e frase que muda (Hoje → Depois) */}
        <div className="relative z-20 w-full max-w-[860px] pt-[max(11svh,88px)] text-center">
          <h2 className="ap-headline text-balance">Do improviso ao sistema.</h2>
          <div className="relative mx-auto mt-4 h-[5em] max-w-[34ch] text-[clamp(18px,2vw,23px)] leading-snug sm:h-[3.4em]">
            <p className="ap-lead absolute inset-0 text-balance" style={{ opacity: "calc(1 - var(--w, 0) * 2.2)" }}>
              Planilhas, papel e conversas espalhadas. Cada uma conta uma parte da história.
            </p>
            <p className="ap-lead absolute inset-0 text-balance" style={{ opacity: "clamp(0, calc(var(--w, 0) * 2.2 - 1.2), 1)", color: "#1d1d1f" }}>
              Um só lugar, feito para o processo da sua organização.
            </p>
          </div>
        </div>

        {/* as peças soltas caminham até o centro e somem */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
          {PECAS.map((p) => (
            <span
              key={p.t}
              className="absolute left-1/2 top-[60%] whitespace-nowrap rounded-full bg-white px-4 py-2 text-[14px] font-medium text-[#6e6e73] shadow-[0_10px_24px_-12px_rgba(16,24,40,0.35)] ring-1 ring-black/5 sm:text-[15px]"
              style={{
                transform: `translate(-50%, -50%) translate(calc(${p.dx} * (1 - var(--e, 0))), calc(${p.dy} * (1 - var(--e, 0)))) rotate(calc(${p.r}deg * (1 - var(--e, 0)))) scale(calc(1 - var(--e, 0) * 0.35))`,
                opacity: "clamp(0, calc(1 - (var(--e, 0) - 0.62) * 2.6), 1)",
              }}
            >
              {p.t}
            </span>
          ))}
        </div>

        {/* a janela do sistema: chega inteira, organizada */}
        <div
          role="img"
          aria-label="Janela de um sistema com pedidos organizados, cada um com status e responsável"
          className="absolute left-1/2 top-[60%] z-10 w-[min(720px,90vw)] overflow-hidden rounded-[20px] bg-white shadow-[0_40px_80px_-40px_rgba(16,24,40,0.45)] ring-1 ring-black/10"
          style={{
            transform: "translate(-50%, -50%) translateY(calc((1 - var(--w, 0)) * 28px)) scale(calc(0.9 + var(--w, 0) * 0.1))",
            opacity: "var(--w, 0)",
          }}
        >
          <div className="flex items-center gap-3 border-b border-[#eeeef1] bg-[#f7f7f9] px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="text-[13px] font-semibold text-[#1d1d1f]">Pedidos</span>
            <span className="ml-auto rounded-full bg-[var(--ap-accent)] px-3 py-1 text-[12px] font-semibold text-white">Novo pedido</span>
          </div>
          <ul>
            {LINHAS.map(([nome, status, quem], i) => (
              <li
                key={nome}
                className="flex items-center gap-3 border-b border-[#f0f0f3] px-4 py-3.5 last:border-b-0 sm:py-4"
                style={{ opacity: `clamp(0, calc(var(--w, 0) * 4 - ${i * 0.5}), 1)` }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf0ff] text-[12px] font-bold text-[var(--ap-accent)]">{quem}</span>
                <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-[#1d1d1f] sm:text-[16px]">{nome}</span>
                <span className="shrink-0 rounded-full bg-[#f2f2f5] px-3 py-1 text-[12px] font-semibold text-[#515154]">{status}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* fecho: só aparece quando a cena termina */}
        <div
          className="absolute inset-x-0 bottom-[6svh] z-20 flex flex-col items-center gap-3 px-5 text-center"
          style={{ opacity: "var(--f, 0)", transform: "translateY(calc((1 - var(--f, 0)) * 16px))" }}
        >
          <a href="#fale-conosco-b2b" className="ap-btn">
            Contar como é hoje
          </a>
          <p className="text-[14px] text-[#6e6e73]">Sem compromisso. Você conta, a gente indica o caminho.</p>
        </div>
      </div>
    </section>
  );
}
