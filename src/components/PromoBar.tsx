"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { Caveat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// 42dot Sans (Google Fonts, OFL) só com os caracteres latinos, usada nos textos da faixa.
const promoFont = localFont({
  src: [
    { path: "../fonts/42dotSans-500.woff", weight: "500" },
    { path: "../fonts/42dotSans-600.woff", weight: "600" },
    { path: "../fonts/42dotSans-700.woff", weight: "700" },
  ],
  display: "swap",
});

// Manuscrita só para o recado do cartão "ansioso?", pra ele soar mais pessoal que o resto da LP.
const handFont = Caveat({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

// Pré-lançamento: 28/10/2026 à meia-noite (Brasília). Para mudar a data/vagas, é só aqui.
const LAUNCH_AT = new Date("2026-10-28T00:00:00-03:00").getTime();
const SPOTS = 10;
// Destino do botão "Faça parte do ecossistema Forklin". Vazio = abre o "Fale conosco" da própria LP.
const PRELAUNCH_FORM_URL: string = "https://foreducation.forklin.com.br";

const pad = (n: number) => String(n).padStart(2, "0");

function countdown(now: number) {
  const diff = LAUNCH_AT - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  return [
    { n: pad(days), u: "d" },
    { n: pad(hours), u: "h" },
    { n: pad(minutes), u: "min" },
    { n: pad(Math.floor((diff % 60_000) / 1000)), u: "s" },
  ];
}

/**
 * Faixa no topo da LP chamando as primeiras vagas do pré-lançamento. Fica no fluxo da página
 * (rola junto) e expõe `--promo-offset` para o Header fixo descer enquanto ela está visível.
 */
export default function PromoBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [closed, setClosed] = useState(false);
  // cartão "ansioso?" que abre ao clicar no botão ainda travado
  const [hint, setHint] = useState(false);
  // undefined = ainda não montou (evita diferença servidor/cliente); null = pré-lançamento já começou
  const [time, setTime] = useState<ReturnType<typeof countdown> | undefined>(undefined);

  useEffect(() => {
    const tick = () => setTime(countdown(Date.now()));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (!hint) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setHint(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hint]);

  // Header fixo desce a altura da faixa que ainda aparece na tela (some ao rolar ou ao fechar).
  useEffect(() => {
    const root = document.documentElement;
    if (closed || !ref.current) {
      root.style.setProperty("--promo-offset", "0px");
      return;
    }
    const bar = ref.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      const visible = Math.max(0, bar.offsetHeight - window.scrollY);
      root.style.setProperty("--promo-offset", `${visible}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.setProperty("--promo-offset", "0px");
    };
  }, [closed]);

  if (closed) return null;

  const started = time === null;
  const external = PRELAUNCH_FORM_URL !== "";

  return (
    <div
      ref={ref}
      className={`${promoFont.className} relative z-[49] h-[6.75rem] text-white sm:h-[7rem] lg:h-24`}
    >
      {/* fundo em degradê (recorta o brilho que corre pela faixa) */}
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, #031a52 0%, #1230B0 28%, #2451FF 50%, #1230B0 72%, #031a52 100%)",
        }}
      >
        <span className="promo-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* 3 colunas: o contador fica sempre no centro da faixa, independente do que há nas laterais */}
      <div className="relative mx-auto flex h-full max-w-[96rem] flex-col items-center justify-center gap-2 px-11 sm:px-14 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:justify-items-start">
        {/* esquerda: logo + slogan soltos, sem cartão em volta */}
        <div className="hidden shrink-0 items-center gap-3 lg:-ml-8 lg:flex xl:-ml-10">
          <Image src="/images/logo-forklin-mark.png" alt="Forklin" width={402} height={446} className="h-14 w-auto" />
          <span className="text-[13px] font-semibold uppercase leading-snug tracking-[0.16em] text-white/90">
            Soluções que
            <br />
            simplificam
          </span>
        </div>

        {/* centro: contador */}
        <div className="relative">
          <div className="text-center leading-none">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 sm:text-[13px]">
              {started ? "O pré-lançamento começou" : "Pré-lançamento em"}
            </span>
            <span className="mt-1.5 flex items-baseline justify-center gap-2 tabular-nums sm:gap-2.5">
              {started ? (
                <span className="whitespace-nowrap text-[15px] font-bold sm:text-2xl xl:text-3xl">
                  Uma nova forma de simplificar
                </span>
              ) : (
                (time ?? [{ n: "--", u: "d" }, { n: "--", u: "h" }, { n: "--", u: "min" }, { n: "--", u: "s" }]).map((seg) => (
                  <span key={seg.u} className="whitespace-nowrap text-xl font-bold sm:text-3xl xl:text-4xl">
                    {/* cada dígito remonta (e anima) quando troca: o relógio "rola" em tempo real */}
                    {seg.n.split("").map((ch, i) => (
                      <span key={`${i}-${ch}`} className="promo-tick inline-block">
                        {ch}
                      </span>
                    ))}
                    <span className="ml-0.5 text-[11px] font-medium text-[var(--sky-soft)] sm:text-sm">{seg.u}</span>
                  </span>
                ))
              )}
            </span>
          </div>
        </div>

        {/* direita: o botão do pré-lançamento. Tem a mesma cara antes e depois do contador zerar; antes,
            o clique abre o cartão "ansioso?" em vez de ir para o For Education. */}
        {(() => {
          const pill =
            "group flex cursor-pointer items-center gap-2 justify-self-end rounded-full border border-white/25 bg-[#031a52]/45 py-0.5 pl-0.5 pr-3.5 transition-colors hover:border-white/50 hover:bg-[#031a52]/70 lg:gap-2.5 lg:py-1 lg:pl-1 lg:pr-4";
          const content = (
            <>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#0b2a8f] lg:h-7 lg:w-7">
                {SPOTS}
              </span>
              <span className="whitespace-nowrap text-xs font-semibold text-white/95">
                vagas ·{" "}
                <span className="xl:hidden">Participe</span>
                <span className="hidden xl:inline">Faça parte do ecossistema Forklin</span>
              </span>
              <span aria-hidden className="text-sm text-white/80 transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </>
          );
          return started ? (
            <a
              href={external ? PRELAUNCH_FORM_URL : "#fale-conosco"}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={pill}
            >
              {content}
            </a>
          ) : (
            <button type="button" aria-haspopup="dialog" onClick={() => setHint(true)} className={pill}>
              {content}
            </button>
          );
        })()}
      </div>

      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label="Fechar aviso"
        className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white sm:right-4"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>

      {hint &&
        !started &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#031a52]/60 p-5 backdrop-blur-sm"
            onClick={() => setHint(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="promo-hint-title"
              onClick={(e) => e.stopPropagation()}
              className={`${promoFont.className} relative w-full max-w-md rounded-3xl bg-white px-7 pb-7 pt-9 text-center text-[#0b1b4d] shadow-[0_30px_80px_-20px_rgba(3,26,82,0.55)]`}
            >
              <button
                type="button"
                autoFocus
                onClick={() => setHint(false)}
                aria-label="Fechar"
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#0b1b4d]/50 transition hover:bg-[#0b1b4d]/10 hover:text-[#0b1b4d]"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
              <Image src="/images/logo-for-education.png" alt="For Education" width={1200} height={245} className="mx-auto h-11 w-auto" />
              <p id="promo-hint-title" className={`${handFont.className} mt-6 text-5xl font-bold leading-none text-[#2451FF]`}>
                Ansioso? A gente também!
              </p>
              <p className="mt-4 text-[15px] font-medium leading-relaxed text-[#0b1b4d]/80">
                O For Education abre na <strong className="font-bold text-[#0b1b4d]">quarta-feira, 28/10, à meia-noite</strong>.
                Até lá o acesso fica fechado. Quando o contador chegar a zero, é só clicar no botão da barra e entrar.
              </p>
              {time && (
                <p className="mt-5 inline-flex items-baseline gap-1.5 rounded-full bg-[#2451FF]/10 px-4 py-1.5 text-sm font-semibold tabular-nums text-[#1230B0]">
                  Faltam {time.map((seg) => `${seg.n}${seg.u}`).join(" ")}
                </p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
