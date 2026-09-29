"use client";

import { useState, useTransition, type FormEvent } from "react";
import { sendLead } from "@/app/actions/lead";
import { useInView } from "@/hooks/useInView";
import { EMPLOYEE_RANGES } from "@/lib/leads";
import {
  Consent,
  Field,
  Honeypot,
  PillGroup,
  TextArea,
  TextInput,
  formatPhone,
  isEmail,
  isPhone,
} from "./form/Fields";
import RevealTitle from "./RevealTitle";
import { ArrowRightIcon, CheckIcon } from "./icons";

const STEPS = [
  {
    title: "Diagnóstico",
    desc: "Entendemos o seu processo, as pessoas envolvidas e onde está o gargalo.",
  },
  {
    title: "Proposta",
    desc: "Escopo, prazo e investimento claros antes de qualquer linha de código.",
  },
  {
    title: "Desenvolvimento",
    desc: "Construção em etapas, com entregas que você acompanha e valida.",
  },
  {
    title: "Implantação e suporte",
    desc: "Treinamento do time e evolução contínua depois que o sistema entra no ar.",
  },
];

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  company: "",
  employees: "",
  industry: "",
  message: "",
  consent: false,
  website: "",
};

export default function B2B() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>(0.2, true);
  const [stepsRef, stepsVisible] = useInView<HTMLOListElement>(0.2, true);
  const [formRef, formVisible] = useInView<HTMLDivElement>(0.15, true);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof typeof EMPTY>(key: K, value: (typeof EMPTY)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function submit(event: FormEvent) {
    event.preventDefault();
    const message = !form.name.trim()
      ? "Informe seu nome."
      : !isEmail(form.email)
        ? "Informe um e-mail válido."
        : !isPhone(form.phone)
          ? "Informe um WhatsApp com DDD."
          : !form.company.trim()
            ? "Informe o nome da empresa."
            : !form.message.trim()
              ? "Conte em poucas linhas o que você precisa."
              : !form.consent
                ? "É preciso autorizar o uso dos dados para contato."
                : "";
    setError(message);
    if (message) return;
    startTransition(async () => {
      const result = await sendLead({ source: "b2b", segment: "b2b", ...form });
      if (result.ok) setSent(true);
      else setError(result.error);
    });
  }

  return (
    <section
      id="b2b"
      className="relative scroll-mt-8 px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24"
    >
      {/* As duas colunas têm a mesma altura: topo e base alinhados no desktop */}
      <div className="mx-auto grid max-w-7xl items-stretch gap-12 lg:grid-cols-2 lg:gap-14">
        {/* Formulário (esquerda no desktop, depois do texto no celular) */}
        <div
          ref={formRef}
          className={`order-2 flex transition-all duration-700 ease-out lg:order-1 ${
            formVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative flex w-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_32px_64px_-40px_rgba(4,48,119,0.35)] sm:p-8">
            {sent ? (
              <div className="flex min-h-[28rem] flex-1 flex-col items-center justify-center text-center animate-[panel-in_500ms_cubic-bezier(.16,1,.3,1)_both]">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-light)] text-[var(--btn-primary)]">
                  <CheckIcon size={26} />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-[var(--ink)]">
                  Recebemos seu contato
                </h3>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-[var(--ink-soft)]">
                  Obrigado, {form.name.split(" ")[0]}! Vamos analisar o que você precisa
                  e retornar para agendar o diagnóstico.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="relative flex flex-1 flex-col gap-5">
                <Honeypot value={form.website} onChange={(v) => set("website", v)} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--btn-primary)]">
                    Comece por aqui
                  </p>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-[var(--ink)]">
                    Conte sobre a sua empresa
                  </h3>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Seu nome" required>
                    <TextInput value={form.name} onValue={(v) => set("name", v)} autoComplete="name" />
                  </Field>
                  <Field label="Empresa" required>
                    <TextInput value={form.company} onValue={(v) => set("company", v)} autoComplete="organization" />
                  </Field>
                  <Field label="E-mail" required>
                    <TextInput type="email" value={form.email} onValue={(v) => set("email", v)} autoComplete="email" placeholder="voce@empresa.com" />
                  </Field>
                  <Field label="WhatsApp" required>
                    <TextInput type="tel" inputMode="tel" value={form.phone} onValue={(v) => set("phone", formatPhone(v))} autoComplete="tel" placeholder="(11) 90000-0000" />
                  </Field>
                </div>
                <PillGroup label="Número de funcionários" options={EMPLOYEE_RANGES} value={form.employees} onChange={(v) => set("employees", v)} />
                <Field label="Ramo de atuação">
                  <TextInput value={form.industry} onValue={(v) => set("industry", v)} placeholder="Ex.: logística, saúde, indústria" />
                </Field>
                <Field label="O que você precisa?" required>
                  <TextArea rows={3} value={form.message} onValue={(v) => set("message", v)} placeholder="Conte o processo que quer melhorar ou o sistema que imagina." />
                </Field>
                <Consent checked={form.consent} onChange={(v) => set("consent", v)} />
                {error && (
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={pending}
                  className="group mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--btn-primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--btn-primary-hover)] disabled:opacity-60"
                >
                  {pending ? "Enviando…" : "Quero uma solução sob medida"}
                  {!pending && (
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRightIcon />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Texto + como funciona (direita no desktop) */}
        <div className="order-1 flex flex-col lg:order-2">
          <div
            ref={headerRef}
            className={`transition-all duration-700 ease-out ${
              headerVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="inline-flex rounded-full bg-[var(--btn-primary)] px-5 py-2 text-sm font-semibold text-white">
              B2B personalizado
            </span>
            <RevealTitle
              parts={[
                { text: "Soluções sob medida para" },
                { text: "a sua empresa.", accent: true },
              ]}
              className="mt-6 text-[clamp(1.875rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-[var(--ink)]"
            />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--ink-soft)]">
              Quando o produto pronto não resolve, construímos o sistema em torno do
              seu processo, com a mesma base, segurança e suporte do ecossistema
              Forklin.
            </p>
          </div>

          {/* cards de passos com a mesma altura e ocupando até a base da coluna */}
          <ol ref={stepsRef} className="mt-10 grid flex-1 auto-rows-fr gap-4 sm:grid-cols-2">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-[opacity,transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:border-[var(--brand)]/35 hover:shadow-[0_24px_48px_-24px_rgba(4,48,119,0.25)]"
                style={{
                  opacity: stepsVisible ? 1 : 0,
                  transform: stepsVisible ? "none" : "translateY(16px)",
                  transitionDelay: stepsVisible ? `${i * 120}ms` : "0ms",
                }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-light)] text-sm font-bold tabular-nums text-[var(--btn-primary)] transition-colors duration-300 group-hover:bg-[var(--btn-primary)] group-hover:text-white">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-[var(--ink)]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
