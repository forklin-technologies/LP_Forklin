"use client";

// Motor de movimento ligado à rolagem (skill apple-design-motion: "damped scroll-progress").
//
// Lê o scroll REAL (listener passivo) e segue um valor "sombra" suavizado (lerp 0.1) num
// único requestAnimationFrame. NÃO é scroll-jacking: a rolagem nativa, o momentum do trackpad,
// o teclado e o leitor de tela ficam intactos — só as transformações "atrasam" suavemente.
//
// Cada elemento registrado recebe 3 variáveis CSS (0 → 1), usadas direto no CSS com calc():
//   --enter   entrando na tela: 0 quando o topo encosta embaixo, 1 quando chega a 40% da altura
//   --through atravessando a tela inteira: 0 entrando por baixo, 1 saindo por cima
//   --pin     cena fixa (sticky): 0 no começo da seção, 1 no fim (seções mais altas que a tela)
// Sem JS (SSR) as variáveis não existem e o CSS usa o padrão (conteúdo sempre visível).
// Com "reduzir movimento" o valor não é suavizado e --enter vai direto para 1.
import { useEffect, type RefObject } from "react";

export type ScrollVars = { enter: number; through: number; pin: number };
type Sub = { el: HTMLElement; onUpdate?: (v: ScrollVars) => void };

const DAMPING = 0.1;
const subs = new Set<Sub>();
let smoothed = -1;
let raf = 0;
let listening = false;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function frame() {
  raf = 0;
  const target = window.scrollY;
  const reduce = reduced();
  if (smoothed < 0 || reduce) smoothed = target;
  else smoothed += (target - smoothed) * DAMPING;
  if (Math.abs(target - smoothed) < 0.1) smoothed = target;

  const vh = window.innerHeight;
  for (const s of subs) {
    const rect = s.el.getBoundingClientRect();
    // posição do elemento no "tempo" do scroll suavizado
    const top = rect.top + (target - smoothed);
    const h = rect.height;
    const v: ScrollVars = {
      enter: reduce ? 1 : clamp01((vh - top) / (vh * 0.6)),
      through: clamp01((vh - top) / (vh + h)),
      pin: h > vh ? clamp01(-top / (h - vh)) : 0,
    };
    s.el.style.setProperty("--enter", v.enter.toFixed(4));
    s.el.style.setProperty("--through", v.through.toFixed(4));
    s.el.style.setProperty("--pin", v.pin.toFixed(4));
    s.onUpdate?.(v);
  }

  // continua enquanto o valor suavizado ainda está alcançando o scroll real
  if (smoothed !== target) raf = requestAnimationFrame(frame);
}

function kick() {
  if (!raf) raf = requestAnimationFrame(frame);
}

export function useScrollVars<T extends HTMLElement>(ref: RefObject<T | null>, onUpdate?: (v: ScrollVars) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sub: Sub = { el, onUpdate };
    subs.add(sub);
    if (!listening) {
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("resize", kick, { passive: true });
      listening = true;
    }
    kick();
    return () => {
      subs.delete(sub);
    };
    // onUpdate de propósito fora: o componente passa uma função estável (setState/useCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

// Tema da página que muda com a rolagem (skill apple-design-web: "cross-section theme morph").
// Troca html[data-theme] quando uma seção [data-theme-section] cruza a LINHA DO MEIO da tela
// (faixa de altura zero no centro: funciona para seções de qualquer altura).
export function useThemeMorph() {
  useEffect(() => {
    const secoes = document.querySelectorAll<HTMLElement>("[data-theme-section]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) document.documentElement.dataset.theme = e.target.getAttribute("data-theme-section") ?? "light";
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    secoes.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
}
