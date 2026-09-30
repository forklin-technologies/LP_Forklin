"use client";

// Hero + cena do notebook (skill apple-design-web: sticky-pinned scene + damped scroll-progress).
//
// A seção é alta e o conteúdo fica preso na tela. Rolando:
//   1) z: 0 → 1  (primeiros ZOOM da cena) — o título some e o notebook sobe e CRESCE até quase
//      cobrir a tela;
//   2) depois o notebook fica cheio na tela enquanto o vídeo (tela do aparelho) roda em loop;
// Tamanhos calculados no resize (quanto o notebook pode crescer sem passar da tela) e passados
// como variáveis CSS; o movimento em si é só transform/opacity (barato, sem layout).
import { useCallback, useEffect, useRef, useState } from "react";
import { DeviceFrame } from "./DiarioDevice";
import TelaVideo from "./TelaVideo";
import { useScrollVars, type ScrollVars } from "./scroll";
import { Logo3D, RevealText } from "./effects";

const ZOOM = 0.28; // fração da cena usada pelo "crescer"
const VH_POR_PASSO = 85; // rolagem (em % da altura da tela) para cada troca de legenda (o vídeo segue rodando)
const VH_SAIDA = 55; // rolagem extra no fim: o notebook encolhe, sobe e sai de cena

// Legendas embaixo do notebook: trocam com a rolagem enquanto o vídeo roda em loop na tela.
const SEGMENTO = "For Education · Diário Digital";
const LEGENDAS = [
  { titulo: "O dia a dia da escola num só lugar.", texto: "Painel, turmas, professores e relatórios reunidos numa única plataforma." },
  { titulo: "No celular e no computador.", texto: "O mesmo sistema, do jeito que cada pessoa da escola usa: na sala de aula ou na secretaria." },
  { titulo: "Menções, histórico e calendário.", texto: "Relatório de menções, emissão de histórico escolar e calendário letivo sempre à mão." },
];
const alturaVh = 100 + 70 + LEGENDAS.length * VH_POR_PASSO + VH_SAIDA; // altura total da cena, em svh

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const [passo, setPasso] = useState(0);

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
      // espaço fixo embaixo para a legenda (segmento + título + texto + pontinhos) e folga em cima: o
      // notebook nunca passa da tela nem encosta na legenda. A base do notebook é 8% mais larga que a
      // moldura, por isso no celular a moldura ocupa 84% da largura (a base fica com margem dos lados).
      const reserva = vw < 768 ? 210 : 180;
      const limiteLargura = ((vw < 768 ? 0.84 : 0.92) * vw) / w0;
      const k = Math.max(0.5, Math.min(limiteLargura, (vh - reserva - 130) / h0));
      el.style.setProperty("--dy", `${(-reserva / 2 + 16).toFixed(1)}px`);
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
    const resto = Math.max(0, Math.min(1, (v.pin - ZOOM) / (1 - saida - ZOOM)));
    setPasso(Math.min(LEGENDAS.length - 1, Math.floor(resto * LEGENDAS.length)));
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


        {/* legenda do passo atual: texto solto embaixo do notebook (desktop e celular), sem card */}
        <div
          className="absolute inset-x-0 bottom-[4svh] flex justify-center px-5 text-center"
          style={{
            opacity: "clamp(0, calc((var(--z, 0) - 0.8) * 5 - var(--x, 0) * 4), 1)",
            transform: "translateY(calc((1 - var(--z, 0)) * 30px))",
          }}
        >
          <div className="w-full max-w-[560px]">
            <div className="relative min-h-[8.2em] sm:min-h-[6.8em]">
              {LEGENDAS.map((p, i) => (
                <div
                  key={p.titulo}
                  aria-hidden={i !== passo}
                  className="absolute inset-0 transition-[opacity,transform] duration-500 ease-out"
                  style={{ opacity: i === passo ? 1 : 0, transform: i === passo ? "none" : "translateY(8px)" }}
                >
                  <p className="text-[13px] font-semibold text-[var(--ap-accent)]">{SEGMENTO}</p>
                  <p className="mt-0.5 text-[19px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">{p.titulo}</p>
                  <p className="mt-1 text-[15px] leading-snug text-[#6e6e73]">{p.texto}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
              {LEGENDAS.map((p, i) => (
                <span key={p.titulo} className={`h-1.5 rounded-full transition-all duration-500 ${i === passo ? "w-5 bg-[var(--ap-accent)]" : "w-1.5 bg-[#c7c7cc]"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
