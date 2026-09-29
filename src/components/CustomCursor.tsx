"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], label, summary, select";
const TEXT_FIELD = "input:not([type='checkbox']):not([type='radio']), textarea";

/**
 * Cursor da marca: bolinha no gradiente do logo Forklin. Cresce sobre links e botões e some
 * sobre campos de texto (lá volta o cursor de digitação). Só em dispositivos com mouse.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    if (!enabled || !dot) return;
    document.documentElement.classList.add("has-custom-cursor");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let frame = 0;

    const render = () => {
      // leve atraso (lerp) para um movimento suave; direto se o usuário reduziu animações
      cx += (x - cx) * (reduced ? 1 : 0.35);
      cy += (y - cy) * (reduced ? 1 : 0.35);
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(render) : 0;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as Element | null;
      dot.dataset.state = target?.closest(TEXT_FIELD)
        ? "text"
        : target?.closest(INTERACTIVE)
          ? "hover"
          : "idle";
      dot.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onDown = () => dot.classList.add("scale-75");
    const onUp = () => dot.classList.remove("scale-75");
    const onLeave = () => (dot.style.opacity = "0");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      data-state="idle"
      className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 transition-opacity duration-200"
    >
      <span className="custom-cursor-dot block rounded-full" />
    </div>
  );
}
