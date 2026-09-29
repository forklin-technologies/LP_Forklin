"use client";

// Hero no padrão apple.com: claro, título enorme e apertado, UMA frase de apoio, um botão +
// um link "›", e o produto real logo abaixo. O notebook cresce e sobe conforme a rolagem
// (--enter suavizado) e "respira" parado (ambient float).
import { useRef } from "react";
import DiarioDevice from "./DiarioDevice";
import { useScrollVars } from "./scroll";

export default function Hero() {
  const deviceRef = useRef<HTMLDivElement>(null);
  useScrollVars(deviceRef);

  return (
    <section id="top" data-theme-section="light" className="overflow-hidden px-5 pb-24 pt-32 text-center sm:pt-40">
      <p className="ap-eyebrow">Um ecossistema, várias soluções</p>
      <h1 className="ap-display mx-auto mt-3 max-w-[14ch]">
        Seu ecossistema. Cresça com a <span className="ap-accent">Forklin.</span>
      </h1>
      <p className="ap-lead mx-auto mt-6 max-w-[34ch]">Sistemas e produtos digitais que transformam ideias em resultados reais.</p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
        <a href="#fale-conosco" className="ap-btn">
          Realizar orçamento
        </a>
        <a href="#solucoes" className="ap-link">
          Conhecer os produtos <span aria-hidden>›</span>
        </a>
      </div>

      <div
        ref={deviceRef}
        className="mx-auto mt-16 max-w-[960px] sm:mt-20"
        style={{
          transform:
            "translateY(calc((1 - var(--enter, 1)) * 90px)) scale(calc(0.9 + var(--enter, 1) * 0.1))",
          opacity: "calc(0.35 + var(--enter, 1) * 0.65)",
        }}
      >
        <div className="ap-float">
          <DiarioDevice tela="chamada" />
        </div>
      </div>
      <p className="ap-caption mt-8">Diário Digital — em produção em escolas da rede municipal.</p>
    </section>
  );
}
