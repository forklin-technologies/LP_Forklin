import type { ReactNode } from "react";
import RevealTitle, { type TitlePart } from "./RevealTitle";

type SectionHeaderProps = {
  label: string;
  title: TitlePart[];
  description?: string;
  action?: ReactNode;
  /** Lado do selo + título no desktop; as seções alternam para não ficar tudo à esquerda. */
  align?: "left" | "right";
};

/** Cabeçalho dividido: selo + título de um lado, texto de apoio + ação do outro. */
export default function SectionHeader({
  label,
  title,
  description,
  action,
  align = "left",
}: SectionHeaderProps) {
  const right = align === "right";

  return (
    <div
      className={`grid gap-8 lg:items-end lg:gap-16 ${
        right ? "lg:grid-cols-[1fr_1.25fr]" : "lg:grid-cols-[1.25fr_1fr]"
      }`}
    >
      <div className={right ? "lg:order-2 lg:text-right" : ""}>
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--btn-primary)] px-5 py-2 text-sm font-semibold text-white">
          {label}
        </span>
        <RevealTitle
          parts={title}
          className="mt-6 text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-[var(--ink)]"
        />
      </div>
      {(description || action) && (
        <div className={`lg:pb-2 ${right ? "lg:order-1" : ""}`}>
          {description && (
            <p className="max-w-md text-lg leading-relaxed text-[var(--ink-soft)]">
              {description}
            </p>
          )}
          {action && <div className="mt-6">{action}</div>}
        </div>
      )}
    </div>
  );
}
