"use client";

// Efeitos reutilizáveis: texto que se revela palavra por palavra, a logo 3D da Forklin em
// movimento e o brilho que segue o mouse nos cards. Tudo respeita "reduzir movimento"
// (sem JS ou com movimento reduzido, o conteúdo aparece pronto, sem animação).
import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useScrollVars } from "./scroll";

// ---------------------------------------------------------------------------------------
// Texto: cada palavra sobe, ganha opacidade e perde o desfoque, uma depois da outra,
// ligada à rolagem (--enter suavizado). `destaque` = palavras na cor de destaque; `brilho`
// = o reflexo de luz que passa uma vez (usar em UM lugar só, como pede a skill).
// ---------------------------------------------------------------------------------------
export function RevealText({
  as: Tag = "h2",
  texto,
  destaque = [],
  brilho = false,
  aoCarregar = false,
  className = "",
}: {
  as?: ElementType;
  texto: string;
  /** true = anima ao abrir a página (título do topo, que já nasce visível), não pela rolagem */
  aoCarregar?: boolean;
  destaque?: string[];
  brilho?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollVars(ref);
  const palavras = texto.split(" ");
  const passo = 1 / Math.max(palavras.length, 1);

  return (
    <Tag ref={ref} className={className} aria-label={texto}>
      {palavras.map((p, i) => {
        // cada palavra anda num trecho próprio de --enter (0→1), escalonado
        const t = `clamp(0, calc((var(--enter, 1) * 1.6 - ${(i * passo * 0.8).toFixed(3)}) * 3), 1)`;
        const ehDestaque = destaque.some((d) => p.replace(/[.,!?]/g, "") === d.replace(/[.,!?]/g, ""));
        return (
          <span key={i} aria-hidden className="inline-block whitespace-pre">
            <span
              className={`ap-word inline-block ${ehDestaque ? "ap-accent" : ""} ${ehDestaque && brilho ? "ap-shine" : ""}`}
              style={
                (aoCarregar
                  ? {
                      animation:
                        `ap-word-in 0.9s cubic-bezier(.2,.8,.2,1) ${(0.15 + i * 0.09).toFixed(2)}s both` +
                        (ehDestaque && brilho ? `, ap-shine 2.4s ease-in-out ${(1.1 + i * 0.09).toFixed(2)}s 1 both` : ""),
                    }
                  : {
                      opacity: t,
                      transform: `translateY(calc((1 - ${t}) * 0.45em))`,
                      filter: `blur(calc((1 - ${t}) * 8px))`,
                    }) as CSSProperties
              }
            >
              {p}
            </span>
            {i < palavras.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}

// ---------------------------------------------------------------------------------------
// Logo 3D da Forklin (forklin-mark-3d.png): flutua sozinha, gira/sobe com a rolagem
// (--through) e inclina na direção do mouse (só desktop com mouse de verdade).
// `giro` = quantos graus gira atravessando a tela; `sobe` = parallax em px.
// ---------------------------------------------------------------------------------------
export function Logo3D({
  tamanho,
  giro = 30,
  sobe = 80,
  brilho = false,
  mouse = true,
  className = "",
  style,
  atraso = 0,
}: {
  tamanho: string;
  giro?: number;
  sobe?: number;
  brilho?: boolean;
  mouse?: boolean;
  className?: string;
  style?: CSSProperties;
  atraso?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollVars(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el || !mouse) return;
    const pode = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!pode.matches) return;
    let raf = 0;
    let alvoX = 0, alvoY = 0, x = 0, y = 0;
    const onMove = (e: PointerEvent) => {
      alvoX = (e.clientX / window.innerWidth - 0.5) * 2;
      alvoY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      raf = 0;
      x += (alvoX - x) * 0.08;
      y += (alvoY - y) * 0.08;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
      if (Math.abs(alvoX - x) > 0.001 || Math.abs(alvoY - y) > 0.001) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mouse]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        width: tamanho,
        transform: `translateY(calc((0.5 - var(--through, 0.5)) * ${sobe}px)) rotate(calc((var(--through, 0.5) - 0.5) * ${giro}deg))`,
        ...style,
      }}
    >
      <div
        className="ap-logo-float"
        style={{ animationDelay: `${atraso}s`, perspective: "800px" } as CSSProperties}
      >
        <Image
          src="/images/forklin-mark-3d.png"
          alt=""
          width={1100}
          height={1100}
          sizes={tamanho}
          className={`h-auto w-full ${brilho ? "ap-logo-glow" : ""}`}
          style={{
            transform: "rotateY(calc(var(--mx, 0) * 16deg)) rotateX(calc(var(--my, 0) * -12deg))",
            transition: "transform 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------
// Card com brilho que segue o mouse (spotlight) — desktop; no toque fica o card normal.
// ---------------------------------------------------------------------------------------
export function SpotCard({
  as: Tag = "div",
  className = "",
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  [k: string]: unknown;
}) {
  return (
    <Tag
      {...rest}
      className={`ap-spot ${className}`}
      style={style}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </Tag>
  );
}
