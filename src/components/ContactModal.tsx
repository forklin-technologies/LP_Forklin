"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { sendLead } from "@/app/actions/lead";
import { WHATSAPP_URL } from "@/lib/contact";
import {
  BEST_TIMES,
  CONTACT_PREFS,
  CURRENT_SYSTEM,
  EMPLOYEE_RANGES,
  INSTITUTION_TYPES,
  SALES_TEAM_RANGES,
  SEGMENTS,
  STUDENT_RANGES,
  SYSTEMS,
  TIMELINES,
  UNIT_RANGES,
  USER_RANGES,
  type Segment,
} from "@/lib/leads";
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
import { ArrowRightIcon, BoxIcon, CapIcon, CheckIcon, TrendIcon } from "./icons";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * "Fale conosco" em 3 etapas. Abre por âncora, assim qualquer link da página funciona sem JS
 * extra: `#fale-conosco`, `#fale-conosco-education`, `#fale-conosco-sales`, `#fale-conosco-b2b`.
 */
const HASH_PREFIX = "#fale-conosco";
const SEGMENT_ICONS = { education: CapIcon, sales: TrendIcon, b2b: BoxIcon };
const STEPS = ["O que você procura?", "Sobre você", "Sua organização", "O que você precisa"];

type Form = {
  segment: Segment | "";
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  city: string;
  institutionType: string;
  students: string;
  units: string;
  industry: string;
  salesTeam: string;
  employees: string;
  systems: Record<string, string>; // sistema -> faixa de usuários ("" = sem faixa)
  currentSystem: string;
  currentSystemName: string;
  timeline: string;
  contactPref: string;
  bestTime: string;
  message: string;
  consent: boolean;
  website: string;
};

const EMPTY: Form = {
  segment: "",
  name: "",
  email: "",
  phone: "",
  role: "",
  company: "",
  city: "",
  institutionType: "",
  students: "",
  units: "",
  industry: "",
  salesTeam: "",
  employees: "",
  systems: {},
  currentSystem: "",
  currentSystemName: "",
  timeline: "",
  contactPref: "",
  bestTime: "",
  message: "",
  consent: false,
  website: "",
};

function segmentFromHash(hash: string): Segment | "" | null {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const rest = hash.slice(HASH_PREFIX.length).replace(/^-/, "");
  return SEGMENTS.some((s) => s.value === rest) ? (rest as Segment) : "";
}

// "Plin" de confirmação: dois tons curtos sintetizados na hora (sem arquivo de áudio). O navegador
// só libera som depois de um clique, então o contexto é criado/retomado no clique de "Enviar"
// (prepararSom) e tocado quando o servidor confirma (tocarPlin).
function criarAudio(): AudioContext | null {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    return AC ? new AC() : null;
  } catch {
    return null;
  }
}

// Check de sucesso desenhado em JavaScript (Web Animations API): o anel se desenha, o visto se
// traça, o círculo dá um "pop" e uma onda se espalha. Com "reduzir movimento" aparece pronto.
// "Quer agilizar?": o verde do WhatsApp aparece só ONDE O CURSOR ESTÁ (um "farol" que segue o
// mouse com suavidade, feito em JavaScript). O texto branco fica dentro da camada verde, então as
// letras só ficam brancas onde o verde chegou. Teclado (foco): o botão inteiro fica verde.
function WhatsAppCta() {
  const root = useRef<HTMLAnchorElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const st = useRef({ x: 0, y: 0, cx: 0, cy: 0, r: 0, cr: 0, on: false, raf: 0 });

  const paintRef = useRef<() => void>(() => {});
  const paint = useCallback(() => {
    const s = st.current;
    const f = fill.current;
    if (!f) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const kPos = reduzir ? 1 : 0.2;
    const kRaio = reduzir ? 1 : 0.13;
    s.cx += (s.x - s.cx) * kPos;
    s.cy += (s.y - s.cy) * kPos;
    s.cr += (s.r - s.cr) * kRaio;
    const mask = `radial-gradient(circle ${Math.max(s.cr, 0.01).toFixed(1)}px at ${s.cx.toFixed(1)}px ${s.cy.toFixed(1)}px, #000 55%, transparent 100%)`;
    f.style.maskImage = mask;
    f.style.webkitMaskImage = mask;
    const parado = Math.abs(s.x - s.cx) < 0.3 && Math.abs(s.y - s.cy) < 0.3 && Math.abs(s.r - s.cr) < 0.3;
    s.raf = parado ? 0 : requestAnimationFrame(() => paintRef.current());
  }, []);

  useEffect(() => {
    paintRef.current = paint;
  }, [paint]);

  const kick = useCallback(() => {
    if (!st.current.raf) st.current.raf = requestAnimationFrame(paint);
  }, [paint]);

  useEffect(() => () => cancelAnimationFrame(st.current.raf), []);

  const move = (e: React.PointerEvent) => {
    const b = root.current?.getBoundingClientRect();
    if (!b) return;
    const s = st.current;
    s.x = e.clientX - b.left;
    s.y = e.clientY - b.top;
    if (!s.on) {
      s.on = true;
      s.cx = s.x; // o verde nasce onde o cursor entrou
      s.cy = s.y;
    }
    s.r = 115;
    kick();
  };
  const sair = () => {
    const s = st.current;
    s.on = false;
    s.r = 0;
    kick();
  };
  const foco = () => {
    const s = st.current;
    s.x = s.cx = 32;
    s.y = s.cy = (root.current?.offsetHeight ?? 48) / 2;
    s.r = 480;
    kick();
  };

  const semMascara = "radial-gradient(circle 0.01px at 0px 0px, #000 55%, transparent 100%)";
  return (
    <a
      ref={root}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={move}
      onPointerMove={move}
      onPointerLeave={sair}
      onFocus={foco}
      onBlur={sair}
      className="relative mt-6 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[var(--line)] py-2 pl-2 pr-5 text-sm font-semibold text-[var(--navy)]"
    >
      <span
        ref={fill}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] flex items-center gap-3 rounded-full bg-[#25D366] py-2 pl-2 pr-5 text-sm font-semibold text-white"
        style={{ maskImage: semMascara, WebkitMaskImage: semMascara }}
      >
        <span className="h-8 w-8 shrink-0" />
        <span>Quer agilizar? Chame no WhatsApp</span>
      </span>
      <span className="relative z-[2] flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
        <WhatsAppIcon size={16} />
      </span>
      <span className="relative z-0">Quer agilizar? Chame no WhatsApp</span>
    </a>
  );
}

function SuccessCheck() {
  const ring = useRef<SVGCircleElement>(null);
  const tick = useRef<SVGPathElement>(null);
  const pop = useRef<HTMLSpanElement>(null);
  const wave = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ease = "cubic-bezier(.16,1,.3,1)";
    const draw = (el: SVGGeometryElement | null, delay: number, duration: number) => {
      if (!el) return;
      el.style.strokeDasharray = "1";
      el.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration, delay, easing: ease, fill: "backwards" });
    };
    // entra com um pulo e um giro completo; o visto se traça quando ele pousa
    pop.current?.animate(
      [
        { transform: "translateY(26px) rotate(-360deg) scale(.4)", opacity: 0, offset: 0 },
        { transform: "translateY(-30px) rotate(-180deg) scale(1.08)", opacity: 1, offset: 0.45 },
        { transform: "translateY(0) rotate(0deg) scale(1)", opacity: 1, offset: 0.75 },
        { transform: "translateY(-7px) rotate(0deg) scale(1)", opacity: 1, offset: 0.88 },
        { transform: "translateY(0) rotate(0deg) scale(1)", opacity: 1, offset: 1 },
      ],
      { duration: 950, easing: "cubic-bezier(.3,.7,.3,1)", fill: "backwards" },
    );
    draw(ring.current, 500, 500);
    draw(tick.current, 760, 420);
    wave.current?.animate([{ transform: "scale(1)", opacity: 0.5 }, { transform: "scale(2.3)", opacity: 0 }], { duration: 900, delay: 720, easing: "ease-out", fill: "backwards" });
  }, []);

  return (
    <span className="relative mx-auto flex h-16 w-16 items-center justify-center">
      <span ref={wave} aria-hidden className="absolute inset-0 rounded-full border-2 border-[#25D366]" />
      {/* botão claro (branco/cinza) com a VOLTA verde; o resto da cena não fica verde */}
      <span ref={pop} className="relative flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-[#25D366] bg-[#f3f4f6] text-[#25D366]">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle ref={ring} cx="17" cy="17" r="14.5" pathLength={1} opacity="0" />
          <path ref={tick} d="M10.5 17.5l4.8 4.8 8.4-9.6" pathLength={1} />
        </svg>
      </span>
    </span>
  );
}

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const panelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);

  function prepararSom() {
    audioRef.current ??= criarAudio();
    void audioRef.current?.resume();
  }

  function tocarPlin() {
    const ctx = audioRef.current;
    if (!ctx) return;
    const t = ctx.currentTime;
    for (const [freq, atraso] of [[1318.5, 0], [1975.5, 0.09]] as const) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t + atraso);
      gain.gain.exponentialRampToValueAtTime(0.07, t + atraso + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + atraso + 0.7);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t + atraso);
      osc.stop(t + atraso + 0.75);
    }
  }

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // Abre pela âncora da URL (e ao carregar já com a âncora).
  useEffect(() => {
    const sync = () => {
      const segment = segmentFromHash(window.location.hash);
      if (segment === null) return;
      // Âncora com segmento (ex.: #fale-conosco-sales) já pula a escolha.
      setForm((f) => ({
        ...f,
        segment: segment || f.segment,
        systems: segment && segment !== f.segment ? {} : f.systems,
      }));
      setStep(segment ? 1 : 0);
      setError("");
      setSent(false);
      setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    history.replaceState(null, "", window.location.pathname + window.location.search);
    if (sent) {
      setForm(EMPTY);
      setSent(false);
    }
  }, [sent]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  function validate(current: number): string {
    if (current === 0 && !form.segment) return "Escolha o que você procura.";
    if (current === 1) {
      if (!form.name.trim()) return "Informe seu nome.";
      if (!isEmail(form.email)) return "Informe um e-mail válido.";
      if (!isPhone(form.phone)) return "Informe um WhatsApp com DDD.";
    }
    if (current === 2 && !form.company.trim()) return "Informe o nome da empresa ou instituição.";
    if (current === 3) {
      if (form.segment === "b2b" && !form.message.trim()) return "Conte em poucas linhas o que você precisa.";
      if (form.segment !== "b2b" && Object.keys(form.systems).length === 0)
        return "Marque pelo menos um sistema de interesse.";
      if (!form.consent) return "É preciso autorizar o uso dos dados para contato.";
    }
    return "";
  }

  function next() {
    const message = validate(step);
    setError(message);
    if (!message) setStep((s) => s + 1);
  }

  function submit() {
    prepararSom(); // dentro do clique: libera o som para o "plin" quando o envio confirmar
    const message = validate(3);
    setError(message);
    if (message || !form.segment) return;
    const segment = form.segment;
    startTransition(async () => {
      const result = await sendLead({
        source: "fale-conosco",
        segment,
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        company: form.company,
        city: form.city,
        institutionType: form.institutionType,
        students: form.students,
        units: form.units,
        industry: form.industry,
        salesTeam: form.salesTeam,
        employees: form.employees,
        systems: Object.entries(form.systems).map(([name, users]) => ({ name, users })),
        currentSystem: form.currentSystem,
        currentSystemName: form.currentSystemName,
        timeline: form.timeline,
        contactPref: form.contactPref,
        bestTime: form.bestTime,
        message: form.message,
        consent: form.consent,
        website: form.website,
      });
      if (result.ok) {
        setSent(true);
        tocarPlin();
      }
      else setError(result.error);
    });
  }

  function toggleSystem(name: string) {
    setForm((f) => {
      const systems = { ...f.systems };
      if (name in systems) delete systems[name];
      else systems[name] = "";
      return { ...f, systems };
    });
  }

  if (!open) return null;

  const systems = form.segment === "education" || form.segment === "sales" ? SYSTEMS[form.segment] : [];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Fechar"
        onClick={close}
        className="absolute inset-0 bg-[var(--navy)]/40 backdrop-blur-sm animate-[fade-in_300ms_ease-out]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fale-conosco-title"
        tabIndex={-1}
        className="relative flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-[var(--surface)] shadow-2xl outline-none animate-[modal-in_450ms_cubic-bezier(.16,1,.3,1)] sm:rounded-3xl"
      >
        {/* Cabeçalho + progresso */}
        <div className="border-b border-[var(--line)] px-6 pb-5 pt-6 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--btn-primary)]">
                {sent ? "Tudo certo" : `Etapa ${step + 1} de ${STEPS.length}`}
              </p>
              <h2 id="fale-conosco-title" className="mt-1 text-xl font-bold tracking-tight text-[var(--ink)]">
                {sent ? "Recebemos seu contato" : STEPS[step]}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-soft)] transition hover:border-[var(--ink)] hover:text-[var(--ink)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          {!sent && (
            <div className="mt-5 grid grid-cols-4 gap-1.5">
              {STEPS.map((label, i) => (
                <span key={label} className="h-1 overflow-hidden rounded-full bg-[var(--line)]">
                  <span
                    className="block h-full origin-left rounded-full bg-[var(--btn-primary)] transition-transform duration-500 ease-out"
                    style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
                  />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="relative flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <Honeypot value={form.website} onChange={(v) => set("website", v)} />

          {sent ? (
            <div className="py-6 text-center animate-[panel-in_500ms_cubic-bezier(.16,1,.3,1)_both]">
              <SuccessCheck />
              <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-[var(--ink-soft)]">
                Obrigado, {form.name.split(" ")[0]}! Nossa equipe vai analisar as
                informações e retornar em breve.
              </p>
              <WhatsAppCta />
            </div>
          ) : (
            <div key={step} className="space-y-5 animate-[panel-in_400ms_cubic-bezier(.16,1,.3,1)_both]">
              {step === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-[var(--ink-soft)]">
                    Escolha a área para direcionarmos seu contato ao time certo.
                  </p>
                  {SEGMENTS.map((segment, i) => {
                    const Icon = SEGMENT_ICONS[segment.value];
                    const selected = form.segment === segment.value;
                    return (
                      <button
                        key={segment.value}
                        type="button"
                        onClick={() => {
                          setForm((f) => ({
                            ...f,
                            segment: segment.value,
                            systems: segment.value === f.segment ? f.systems : {},
                          }));
                          setError("");
                          setStep(1);
                        }}
                        className={`group flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 animate-[panel-in_500ms_cubic-bezier(.16,1,.3,1)_both] ${
                          selected
                            ? "border-[var(--btn-primary)] bg-[var(--brand-light)]/60"
                            : "border-[var(--line)] hover:border-[var(--brand)]/40 hover:shadow-[0_16px_32px_-20px_rgba(4,48,119,0.3)]"
                        }`}
                        style={{ animationDelay: `${i * 80}ms` }}
                      >
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                            selected
                              ? "bg-[var(--btn-primary)] text-white"
                              : "bg-[var(--brand-light)] text-[var(--btn-primary)] group-hover:bg-[var(--btn-primary)] group-hover:text-white"
                          }`}
                        >
                          <Icon size={22} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold text-[var(--ink)]">{segment.label}</span>
                          <span className="block text-sm text-[var(--ink-soft)]">{segment.desc}</span>
                        </span>
                        <span className="text-[var(--ink-faint)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--btn-primary)]">
                          <ArrowRightIcon />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === 1 && (
                <>
                  <Field label="Nome completo" required>
                    <TextInput value={form.name} onValue={(v) => set("name", v)} autoComplete="name" placeholder="Como podemos te chamar?" />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="E-mail" required>
                      <TextInput type="email" value={form.email} onValue={(v) => set("email", v)} autoComplete="email" placeholder="voce@empresa.com" />
                    </Field>
                    <Field label="WhatsApp" required>
                      <TextInput type="tel" inputMode="tel" value={form.phone} onValue={(v) => set("phone", formatPhone(v))} autoComplete="tel" placeholder="(11) 90000-0000" />
                    </Field>
                  </div>
                  <Field label="Cargo">
                    <TextInput value={form.role} onValue={(v) => set("role", v)} placeholder="Ex.: diretor, coordenador, gerente comercial" />
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <Field label={form.segment === "education" ? "Nome da instituição" : "Nome da empresa"} required>
                    <TextInput value={form.company} onValue={(v) => set("company", v)} autoComplete="organization" />
                  </Field>
                  <Field label="Cidade / UF">
                    <TextInput value={form.city} onValue={(v) => set("city", v)} placeholder="Ex.: São Paulo / SP" />
                  </Field>
                  {form.segment === "education" && (
                    <>
                      <PillGroup label="Tipo de instituição" options={INSTITUTION_TYPES} value={form.institutionType} onChange={(v) => set("institutionType", v)} />
                      <PillGroup label="Quantidade de alunos" options={STUDENT_RANGES} value={form.students} onChange={(v) => set("students", v)} />
                      <PillGroup label="Quantidade de unidades" options={UNIT_RANGES} value={form.units} onChange={(v) => set("units", v)} />
                    </>
                  )}
                  {form.segment === "sales" && (
                    <>
                      <Field label="Ramo de atuação">
                        <TextInput value={form.industry} onValue={(v) => set("industry", v)} placeholder="Ex.: varejo, serviços, indústria" />
                      </Field>
                      <PillGroup label="Tamanho do time comercial" options={SALES_TEAM_RANGES} value={form.salesTeam} onChange={(v) => set("salesTeam", v)} />
                    </>
                  )}
                  {form.segment === "b2b" && (
                    <>
                      <Field label="Ramo de atuação">
                        <TextInput value={form.industry} onValue={(v) => set("industry", v)} placeholder="Ex.: logística, saúde, indústria" />
                      </Field>
                      <PillGroup label="Número de funcionários" options={EMPLOYEE_RANGES} value={form.employees} onChange={(v) => set("employees", v)} />
                    </>
                  )}
                </>
              )}

              {step === 3 && (
                <>
                  {systems.length > 0 && (
                    <fieldset>
                      <legend className="mb-2 text-sm font-medium text-[var(--ink)]">
                        Quais sistemas te interessam? <span className="text-[var(--brand)]">*</span>
                      </legend>
                      <div className="space-y-2">
                        {systems.map((name) => {
                          const checked = name in form.systems;
                          return (
                            <div
                              key={name}
                              className={`rounded-2xl border p-4 transition ${
                                checked ? "border-[var(--brand)]/40 bg-[var(--brand-light)]/50" : "border-[var(--line)]"
                              }`}
                            >
                              <button type="button" onClick={() => toggleSystem(name)} className="flex w-full items-center gap-3 text-left">
                                <span
                                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                                    checked ? "border-[var(--btn-primary)] bg-[var(--btn-primary)] text-white" : "border-[var(--line)]"
                                  }`}
                                >
                                  {checked && <CheckIcon size={11} />}
                                </span>
                                <span className="text-sm font-semibold text-[var(--ink)]">{name}</span>
                              </button>
                              {checked && (
                                <div className="mt-3 pl-8 animate-[panel-in_300ms_ease-out_both]">
                                  <PillGroup
                                    label="Quantos usuários devem usar?"
                                    size="sm"
                                    options={USER_RANGES}
                                    value={form.systems[name]}
                                    onChange={(v) => setForm((f) => ({ ...f, systems: { ...f.systems, [name]: v } }))}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  {form.segment === "b2b" ? (
                    <Field label="O que você precisa?" required>
                      <TextArea value={form.message} onValue={(v) => set("message", v)} placeholder="Conte o processo que quer melhorar ou o sistema que imagina." />
                    </Field>
                  ) : (
                    <>
                      <PillGroup label="Hoje vocês usam algum sistema para isso?" options={CURRENT_SYSTEM} value={form.currentSystem} onChange={(v) => set("currentSystem", v)} />
                      {form.currentSystem === "Outro sistema" && (
                        <Field label="Qual?">
                          <TextInput value={form.currentSystemName} onValue={(v) => set("currentSystemName", v)} />
                        </Field>
                      )}
                    </>
                  )}

                  <PillGroup label="Quando pretende começar?" options={TIMELINES} value={form.timeline} onChange={(v) => set("timeline", v)} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <PillGroup label="Prefere contato por" options={CONTACT_PREFS} value={form.contactPref} onChange={(v) => set("contactPref", v)} />
                    <PillGroup label="Melhor horário" options={BEST_TIMES} value={form.bestTime} onChange={(v) => set("bestTime", v)} />
                  </div>
                  {form.segment !== "b2b" && (
                    <Field label="Mensagem">
                      <TextArea rows={3} value={form.message} onValue={(v) => set("message", v)} placeholder="Algo mais que devemos saber? (opcional)" />
                    </Field>
                  )}
                  <Consent checked={form.consent} onChange={(v) => set("consent", v)} />
                </>
              )}
            </div>
          )}
        </div>

        {/* Rodapé: erro + navegação */}
        {!sent && (step > 0 || error) && (
          <div className="border-t border-[var(--line)] px-6 py-4 sm:px-8">
            {error && (
              <p role="alert" className="mb-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}
            <div className={`flex items-center justify-between gap-3 ${step === 0 ? "hidden" : ""}`}>
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setStep((s) => s - 1);
                }}
                className={`text-sm font-semibold text-[var(--ink-soft)] transition hover:text-[var(--ink)] ${step === 0 ? "invisible" : ""}`}
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={isLast ? submit : next}
                disabled={pending}
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--btn-primary-hover)] disabled:opacity-60"
              >
                {pending ? "Enviando…" : isLast ? "Enviar" : "Continuar"}
                {!pending && (
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
