"use server";

import { headers } from "next/headers";
import { buildLeadEmail } from "@/lib/leadEmail";
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
  type LeadPayload,
  type LeadResult,
  type Segment,
} from "@/lib/leads";

// Envio via Resend (https://resend.com/docs/api-reference/emails/send-email).
// RESEND_API_KEY fica só no ambiente do servidor (Dokploy), nunca no código.
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO = process.env.LEAD_TO_EMAIL ?? "contato@forklin.com.br";
const FROM = process.env.LEAD_FROM_EMAIL ?? "Site Forklin <site@forklin.com.br>";

// Server Functions são endpoints públicos (POST direto): tudo é revalidado aqui.
// Só conta ENVIO DE VERDADE (depois de validar) e devolve a "vaga" se o envio falhar: erro de
// digitação ou falha do Resend não pode gastar o limite de quem está tentando de boa-fé.
// Se o servidor não repassar o IP do visitante, NÃO dá para agrupar todo mundo num balde só
// ("desconhecido" com limite de 5 barrava visitantes diferentes): usa um teto global maior.
const RATE_LIMIT = { max: 5, maxSemIp: 40, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function takeSlot(key: string, max: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

function giveSlotBack(key: string) {
  const list = hits.get(key);
  if (list?.length) list.pop();
}

async function clientKey(): Promise<{ key: string; max: number }> {
  const h = await headers();
  const ip =
    h.get("cf-connecting-ip")?.trim() ||
    h.get("x-real-ip")?.trim() ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "";
  return ip ? { key: ip, max: RATE_LIMIT.max } : { key: "sem-ip", max: RATE_LIMIT.maxSemIp };
}

function text(value: unknown, max = 200): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function oneOf(value: unknown, allowed: string[]): string {
  const v = text(value);
  return allowed.includes(v) ? v : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendLead(input: LeadPayload): Promise<LeadResult> {
  // Robô preencheu o campo-isca: finge sucesso e não envia nada.
  if (text(input?.website)) return { ok: true };

  const source = input?.source === "b2b" ? "b2b" : "fale-conosco";
  const segment = oneOf(input?.segment, SEGMENTS.map((s) => s.value)) as Segment | "";
  const lead = {
    name: text(input?.name, 120),
    email: text(input?.email, 160),
    phone: text(input?.phone, 40),
    role: text(input?.role, 80),
    company: text(input?.company, 160),
    city: text(input?.city, 120),
    institutionType: oneOf(input?.institutionType, INSTITUTION_TYPES),
    students: oneOf(input?.students, STUDENT_RANGES),
    units: oneOf(input?.units, UNIT_RANGES),
    industry: text(input?.industry, 120),
    salesTeam: oneOf(input?.salesTeam, SALES_TEAM_RANGES),
    employees: oneOf(input?.employees, EMPLOYEE_RANGES),
    currentSystem: oneOf(input?.currentSystem, CURRENT_SYSTEM),
    currentSystemName: text(input?.currentSystemName, 120),
    timeline: oneOf(input?.timeline, TIMELINES),
    contactPref: oneOf(input?.contactPref, CONTACT_PREFS),
    bestTime: oneOf(input?.bestTime, BEST_TIMES),
    message: text(input?.message, 2000),
  };

  const allowedSystems =
    segment === "education" || segment === "sales" ? SYSTEMS[segment] : [];
  const systems = (Array.isArray(input?.systems) ? input.systems : [])
    .slice(0, 10)
    .map((s) => ({ name: oneOf(s?.name, allowedSystems), users: oneOf(s?.users, USER_RANGES) }))
    .filter((s) => s.name);

  if (!segment || !lead.name || !lead.company || !lead.phone || !EMAIL_RE.test(lead.email)) {
    return { ok: false, error: "Confira os campos obrigatórios e tente novamente." };
  }
  if (input?.consent !== true) {
    return { ok: false, error: "É preciso autorizar o uso dos dados para contato." };
  }
  if (source === "b2b" && !lead.message) {
    return { ok: false, error: "Conte em poucas linhas o que você precisa." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[lead] RESEND_API_KEY não configurada");
    return { ok: false, error: "Não foi possível enviar agora. Fale com a gente pelo WhatsApp." };
  }

  // Tudo validado: agora sim reserva uma vaga do limite (devolvida se o envio falhar).
  const { key, max } = await clientKey();
  if (!takeSlot(key, max)) {
    return { ok: false, error: "Muitos envios em pouco tempo. Tente novamente em alguns minutos." };
  }

  const segmentLabel = SEGMENTS.find((s) => s.value === segment)?.label ?? segment;
  const subject = `[${segmentLabel}] Novo contato pelo site: ${lead.company}`;

  const { html, text: plain } = buildLeadEmail({
    sourceLabel: source === "b2b" ? "Pela seção B2B personalizado" : "Pelo formulário Fale conosco",
    segmentLabel,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    sections: [
      {
        title: "Contato",
        rows: [
          ["Cargo", lead.role],
          ["Prefere contato por", lead.contactPref],
          ["Melhor horário", lead.bestTime],
        ],
      },
      {
        title: "Organização",
        rows: [
          ["Cidade / UF", lead.city],
          ["Tipo de instituição", lead.institutionType],
          ["Nº de alunos", lead.students],
          ["Nº de unidades", lead.units],
          ["Ramo de atuação", lead.industry],
          ["Time comercial", lead.salesTeam],
          ["Nº de funcionários", lead.employees],
        ],
      },
      {
        title: "Contexto",
        rows: [
          ["Sistema atual", [lead.currentSystem, lead.currentSystemName].filter(Boolean).join(": ")],
          ["Quando pretende começar", lead.timeline],
        ],
      },
    ],
    systems,
    message: lead.message,
  });

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: lead.email, subject, html, text: plain }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("[lead] Resend respondeu", response.status, await response.text());
      giveSlotBack(key);
      return { ok: false, error: "Não foi possível enviar agora. Fale com a gente pelo WhatsApp." };
    }
  } catch (err) {
    console.error("[lead] falha ao chamar o Resend:", err);
    giveSlotBack(key);
    return { ok: false, error: "Não foi possível enviar agora. Fale com a gente pelo WhatsApp." };
  }

  return { ok: true };
}
