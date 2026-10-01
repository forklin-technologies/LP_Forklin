"use client";

// O vídeo que roda na tela dos notebooks da LP: mudo, em loop e sem controles (é a "tela" do
// aparelho). Só toca enquanto está visível — fora da tela pausa (poupa bateria/CPU) — e com
// "reduzir movimento" fica parado no primeiro quadro.
// Cada notebook escolhe o seu vídeo: o hero usa o padrão (VIDEO_TELA, videosession1.mp4) e o
// card do Diário Digital em For Education usa VIDEO_DIARIO.
import { useEffect, useRef } from "react";

export const VIDEO_TELA = "/videos/videosession1.mp4";
export const VIDEO_DIARIO = "/videos/forklin-landing-loop.mp4";

export default function TelaVideo({
  src = VIDEO_TELA,
  preload = "auto",
}: {
  src?: string;
  preload?: "auto" | "metadata";
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // garante o autoplay (navegadores só deixam tocar sozinho se estiver mudo)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      aria-hidden
    />
  );
}
