"use client";

// Hero + cena do notebook (skill apple-design-web: sticky-pinned scene + damped scroll-progress).
//
// A seção é alta e o conteúdo fica preso na tela. Rolando:
//   1) z: 0 → 1  (primeiros ZOOM da cena) — o título some e o notebook sobe e CRESCE até quase
//      cobrir a tela;
//   2) depois o notebook fica cheio na tela enquanto o vídeo (tela do aparelho) roda em loop;
// Tamanhos calculados no resize (quanto o notebook pode crescer sem passar da tela) e passados
// como variáveis CSS; o movimento em si é só transform/opacity (barato, sem layout).
import { useCallback, useEffect, useRef } from "react";
import { DeviceFrame } from "./DiarioDevice";
import TelaVideo from "./TelaVideo";
import { useScrollVars, type ScrollVars } from "./scroll";
import { Logo3D, RevealText } from "./effects";

const ZOOM = 0.28; // fração da cena usada pelo "crescer"
const VH_VIDEO = 90; // rolagem (em % da altura da tela) com o notebook cheio, enquanto o vídeo roda
const VH_SAIDA = 55; // rolagem extra no fim: o notebook encolhe, sobe e sai de cena
const alturaVh = 100 + 70 + VH_VIDEO + VH_SAIDA; // altura total da cena, em svh

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);

  // Quanto o notebook pode crescer e de onde ele parte (abaixo do título).
  useEffect(() => {
    const medir = () => {
      const el = sectionRef.current;
      const dev = deviceRef.current;
      if (!el || !dev) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w0 = dev.offsetWidth;
      const h0 = dev.offsetHeight;
      // sem legenda embaixo: o notebook fica centralizado, com folga fixa em cima e embaixo, e nunca
      // passa da tela nem encosta nos cantos. A base do notebook é 8% mais larga que a moldura, por
      // isso no celular a moldura ocupa 84% da largura (a base fica em ~91%, com margem dos lados).
      const limiteLargura = ((vw < 768 ? 0.84 : 0.92) * vw) / w0;
      const k = Math.max(0.5, Math.min(limiteLargura, (vh - 260) / h0));
      el.style.setProperty("--dy", "0px");
      const topoInicial = vh * (vw < 768 ? 0.7 : 0.74); // o notebook começa espiando embaixo do título
      el.style.setProperty("--k", k.toFixed(4));
      el.style.setProperty("--y0", `${(topoInicial + h0 / 2 - vh / 2).toFixed(1)}px`);
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  const onUpdate = useCallback((v: ScrollVars) => {
    const el = sectionRef.current;
    if (!el) return;
    const z = Math.min(1, v.pin / ZOOM);
    el.style.setProperty("--z", z.toFixed(4));
    const saida = VH_SAIDA / (alturaVh - 100); // fração do fim da cena usada pela saída
    const x = Math.max(0, (v.pin - (1 - saida)) / saida);
    el.style.setProperty("--x", x.toFixed(4));
  }, []);
  useScrollVars(sectionRef, onUpdate);

  return (
    <section id="top" ref={sectionRef} data-theme-section="light" className="relative" style={{ height: `${alturaVh}svh` }}>
      {/* âncora do menu "Educação": onde o notebook termina de crescer */}
      <span id="for-education" className="absolute left-0" style={{ top: `${(alturaVh - 100) * (ZOOM + 0.05)}svh` }} />

      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* logos 3D em volta do título — se afastam enquanto o notebook cresce */}
        <div className="pointer-events-none absolute inset-0" style={{ opacity: "calc(1 - var(--z, 0) * 1.6)" }}>
          <Logo3D tamanho="clamp(70px, 9vw, 140px)" className="absolute left-[6%] top-[16%]" giro={-40} atraso={0}
            style={{ translate: "calc(var(--z, 0) * -120px) calc(var(--z, 0) * -80px)" }} />
          <Logo3D tamanho="clamp(90px, 12vw, 200px)" className="absolute right-[5%] top-[38%] hidden sm:block" giro={50} atraso={1.2}
            style={{ translate: "calc(var(--z, 0) * 140px) calc(var(--z, 0) * -60px)" }} />
          <Logo3D tamanho="clamp(40px, 5vw, 80px)" className="absolute left-[16%] top-[52%] hidden md:block opacity-70" giro={70} atraso={2.1}
            style={{ translate: "calc(var(--z, 0) * -160px) 0" }} />
        </div>

        {/* título */}
        <div
          className="absolute inset-x-0 top-[max(26svh,208px)] px-5 text-center"
          style={{
            opacity: "calc(1 - var(--z, 0) * 2.2)",
            transform: "translateY(calc(var(--z, 0) * -60px)) scale(calc(1 - var(--z, 0) * 0.06))",
          }}
        >
          <RevealText
            as="h1"
            aoCarregar
            brilho
            texto="Seu ecossistema. Cresça com a Forklin."
            destaque={["Forklin."]}
            className="ap-display mx-auto max-w-[18ch]"
          />
          <p className="ap-lead ap-fade-in mx-auto mt-5 max-w-[34ch]" style={{ animationDelay: "0.7s" }}>
            Sistemas e produtos digitais que transformam ideias em resultados reais.
          </p>
          <div className="ap-fade-in mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4" style={{ animationDelay: "0.85s" }}>
            <a href="#fale-conosco" className="ap-btn">Solicitar orçamento</a>
            <a href="#segmentos" className="ap-link">Conhecer os produtos <span aria-hidden>›</span></a>
          </div>
        </div>

        {/* o notebook: parte embaixo do título e cresce até quase cobrir a tela */}
        <div
          ref={deviceRef}
          className="absolute left-1/2 top-1/2 w-[min(900px,88vw)]"
          style={{
            transform:
              "translate(-50%, -50%) translateY(calc(var(--y0, 60vh) * (1 - var(--z, 0)))) translateY(calc(var(--z, 0) * var(--dy, -90px) - var(--x, 0) * 14svh)) scale(calc((1 + (var(--k, 1) - 1) * var(--z, 0)) * (1 - var(--x, 0) * 0.2)))",
            opacity: "calc(1 - var(--x, 0))",
          }}
        >
          <div className="ap-float">
            <DeviceFrame semSombra aspecto="aspect-video" label="Demonstração dos sistemas da Forklin em vídeo">
              <TelaVideo />
            </DeviceFrame>
          </div>
        </div>

      </div>
    </section>
  );
}
