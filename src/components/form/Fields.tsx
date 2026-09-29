"use client";

import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

// Peças visuais dos formulários de contato (Fale conosco e B2B), no padrão da LP:
// fundo branco, borda fina, azul da marca no foco/seleção.

export function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--ink)]">
        {label}
        {required && <span className="text-[var(--brand)]"> *</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[var(--ink-faint)]">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--ink-faint)] focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand)]/10";

export function TextInput(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "onChange"> & {
    onValue: (value: string) => void;
  },
) {
  const { onValue, ...rest } = props;
  return <input {...rest} onChange={(e) => onValue(e.target.value)} className={inputClass} />;
}

export function TextArea(
  props: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "onChange"> & {
    onValue: (value: string) => void;
  },
) {
  const { onValue, ...rest } = props;
  return (
    <textarea
      rows={4}
      {...rest}
      onChange={(e) => onValue(e.target.value)}
      className={`${inputClass} resize-none`}
    />
  );
}

/** Opções como pílulas clicáveis: mais rápido que um select, funciona bem no toque. */
export function PillGroup({
  label,
  required,
  options,
  value,
  onChange,
  size = "md",
}: {
  label?: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
}) {
  return (
    <fieldset>
      {label && (
        <legend className="mb-2 text-sm font-medium text-[var(--ink)]">
          {label}
          {required && <span className="text-[var(--brand)]"> *</span>}
        </legend>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(selected ? "" : option)}
              className={`rounded-full border font-medium transition ${
                size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
              } ${
                selected
                  ? "border-[var(--btn-primary)] bg-[var(--btn-primary)] text-white"
                  : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-[var(--brand)]/40 hover:text-[var(--ink)]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Consent({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[var(--ink-soft)]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--btn-primary)]"
      />
      <span>
        Autorizo a Forklin a usar estes dados para entrar em contato comigo sobre as
        soluções. <span className="text-[var(--brand)]">*</span>
      </span>
    </label>
  );
}

/** Campo-isca invisível para robôs (fora da tela e fora da navegação por teclado). */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="absolute -left-[9999px] h-0 w-0 opacity-0"
    />
  );
}

/** Máscara simples de telefone BR: (11) 97117-7254. */
export function formatPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isPhone = (v: string) => v.replace(/\D/g, "").length >= 10;
