"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mesmo padrão de IntersectionObserver das outras seções: começa `true` (conteúdo visível no
 * SSR / sem JS) e passa a refletir a visibilidade, reanimando ao voltar para a tela.
 * Com `once`, anima só na primeira vez que o elemento entra.
 */
export function useInView<T extends Element>(threshold = 0.15, once = false) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, visible] as const;
}
