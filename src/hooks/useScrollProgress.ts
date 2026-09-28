"use client";

import { useEffect, useRef } from "react";

/**
 * Escreve o progresso de rolagem do elemento como CSS vars (sem re-render):
 * - `--enter`: 0 quando o topo encosta no fim da tela → 1 quando chega a 25% do topo.
 * - `--pass`:  0 ao entrar pela base → 1 ao sair pelo topo.
 * Os transforms ficam no CSS/inline style via calc(var(--enter)).
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const enter = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.75)));
      const pass = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      el.style.setProperty("--enter", enter.toFixed(4));
      el.style.setProperty("--pass", pass.toFixed(4));
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
    };
  }, []);

  return ref;
}
