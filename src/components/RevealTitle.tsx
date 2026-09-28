"use client";

import { Fragment } from "react";
import { useInView } from "@/hooks/useInView";

export type TitlePart = { text: string; accent?: boolean };

type RevealTitleProps = {
  parts: TitlePart[];
  className?: string;
  accentClassName?: string;
};

/** Título que sobe palavra por palavra de dentro de uma máscara ao entrar na tela. */
export default function RevealTitle({
  parts,
  className = "",
  accentClassName = "text-[var(--btn-primary)]",
}: RevealTitleProps) {
  const [ref, visible] = useInView<HTMLHeadingElement>(0.3);
  let index = 0;

  return (
    <h2 ref={ref} className={className}>
      <span className="sr-only">{parts.map((p) => p.text).join(" ")}</span>
      <span aria-hidden>
        {parts.map((part, partIndex) =>
          part.text.split(" ").map((word, wordIndex) => {
            const delay = index++ * 55;
            return (
              <Fragment key={`${partIndex}-${wordIndex}`}>
                <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <span
                    className={`inline-block transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${
                      part.accent ? accentClassName : ""
                    }`}
                    style={{
                      transform: visible ? "translateY(0)" : "translateY(105%)",
                      opacity: visible ? 1 : 0,
                      transitionDelay: visible ? `${delay}ms` : "0ms",
                    }}
                  >
                    {word}
                  </span>
                </span>{" "}
              </Fragment>
            );
          }),
        )}
      </span>
    </h2>
  );
}
