// Usado só pela Server Function de contato (roda no servidor).
// Corpo do e-mail de novo contato (Fale conosco / B2B). Layout em tabelas com estilos
// inline — é o que Gmail, Outlook e apps de celular renderizam de forma consistente.

const SITE_URL = (process.env.SITE_URL ?? "https://forklin.com.br").replace(/\/$/, "");

const C = {
  bg: "#F4F6FB",
  card: "#FFFFFF",
  line: "#E2E8F0",
  ink: "#0B1220",
  soft: "#475569",
  faint: "#94A3B8",
  brand: "#043077",
  brandLight: "#E8EEFF",
  whatsapp: "#25D366",
};

const FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export type LeadEmailData = {
  sourceLabel: string;
  segmentLabel: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  sections: { title: string; rows: [label: string, value: string][] }[];
  systems: { name: string; users: string }[];
  message: string;
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function whatsappLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}`;
}

function sectionTitle(title: string): string {
  return `<tr><td style="padding:28px 32px 10px;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:${C.brand}">${esc(title)}</td></tr>`;
}

function rowsTable(rows: [string, string][]): string {
  const body = rows
    .map(
      ([label, value], i) => `<tr>
  <td width="38%" valign="top" style="padding:12px 16px 12px 0;${i ? `border-top:1px solid ${C.line};` : ""}font-family:${FONT};font-size:13px;color:${C.soft}">${esc(label)}</td>
  <td valign="top" style="padding:12px 0;${i ? `border-top:1px solid ${C.line};` : ""}font-family:${FONT};font-size:14px;font-weight:600;color:${C.ink}">${esc(value)}</td>
</tr>`,
    )
    .join("");
  return `<tr><td style="padding:0 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${body}</table></td></tr>`;
}

function button(href: string, label: string, bg: string, color: string, border: string): string {
  return `<a href="${esc(href)}" style="display:inline-block;padding:11px 20px;border-radius:999px;background:${bg};border:1px solid ${border};font-family:${FONT};font-size:13px;font-weight:700;color:${color};text-decoration:none">${esc(label)}</a>`;
}

export function buildLeadEmail(data: LeadEmailData): { html: string; text: string } {
  const receivedAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());

  const sections = data.sections
    .map((s) => ({ ...s, rows: s.rows.filter(([, v]) => v) }))
    .filter((s) => s.rows.length > 0);

  const systemsBlock = data.systems.length
    ? `${sectionTitle("Sistemas de interesse")}
<tr><td style="padding:0 32px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 8px">
  ${data.systems
    .map(
      (s) => `<tr><td style="padding:14px 16px;background:${C.brandLight};border-radius:10px;font-family:${FONT}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="font-size:14px;font-weight:700;color:${C.ink}">${esc(s.name)}</td>
        <td align="right" style="font-size:13px;color:${C.brand};font-weight:600">${esc(s.users ? `${s.users} usuários` : "Usuários a definir")}</td>
      </tr></table>
    </td></tr>`,
    )
    .join("")}
  </table>
</td></tr>`
    : "";

  const messageBlock = data.message
    ? `${sectionTitle("Mensagem")}
<tr><td style="padding:0 32px">
  <div style="padding:16px 18px;border-left:3px solid ${C.brand};background:${C.bg};border-radius:0 10px 10px 0;font-family:${FONT};font-size:14px;line-height:1.6;color:${C.ink}">${esc(data.message).replace(/\n/g, "<br>")}</div>
</td></tr>`
    : "";

  const firstName = data.name.split(" ")[0];

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Novo contato pelo site</title></head>
<body style="margin:0;padding:0;background:${C.bg}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(`${data.name} · ${data.company} · ${data.segmentLabel}`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.bg}">
<tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px">

    <!-- topo -->
    <tr><td style="padding:0 4px 20px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td><img src="${SITE_URL}/images/logo-forklin-full.png" width="128" alt="Forklin" style="display:block;width:128px;height:auto;border:0"></td>
        <td align="right" style="font-family:${FONT};font-size:12px;color:${C.faint}">${esc(receivedAt)}</td>
      </tr></table>
    </td></tr>

    <!-- cartão -->
    <tr><td style="background:${C.card};border:1px solid ${C.line};border-radius:16px;overflow:hidden">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="height:4px;background:${C.brand};font-size:0;line-height:0">&nbsp;</td></tr>

        <tr><td style="padding:28px 32px 0">
          <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:${C.brandLight};font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:${C.brand}">${esc(data.segmentLabel)}</span>
          <h1 style="margin:16px 0 4px;font-family:${FONT};font-size:22px;line-height:1.3;color:${C.ink}">Novo contato pelo site</h1>
          <p style="margin:0;font-family:${FONT};font-size:14px;color:${C.soft}">${esc(data.sourceLabel)}</p>
        </td></tr>

        <!-- destaque do contato -->
        <tr><td style="padding:24px 32px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-radius:12px">
            <tr><td style="padding:20px">
              <p style="margin:0;font-family:${FONT};font-size:18px;font-weight:700;color:${C.ink}">${esc(data.name)}</p>
              <p style="margin:4px 0 0;font-family:${FONT};font-size:14px;color:${C.soft}">${esc(data.company)}</p>
              <p style="margin:12px 0 0;font-family:${FONT};font-size:13px;line-height:1.7;color:${C.soft}">
                ${esc(data.email)}<br>${esc(data.phone)}
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px"><tr>
                <td style="padding:0 8px 0 0">${button(`mailto:${data.email}`, "Responder por e-mail", C.brand, "#FFFFFF", C.brand)}</td>
                <td>${button(whatsappLink(data.phone), "Chamar no WhatsApp", "#FFFFFF", C.ink, C.line)}</td>
              </tr></table>
            </td></tr>
          </table>
        </td></tr>

        ${sections.map((s) => sectionTitle(s.title) + rowsTable(s.rows)).join("\n")}
        ${systemsBlock}
        ${messageBlock}

        <tr><td style="padding:32px 32px 28px">
          <p style="margin:0;padding-top:20px;border-top:1px solid ${C.line};font-family:${FONT};font-size:12px;line-height:1.6;color:${C.faint}">
            ${esc(firstName)} autorizou o uso destes dados para retorno de contato (LGPD).
            Responder este e-mail envia a mensagem direto para ${esc(data.email)}.
          </p>
        </td></tr>
      </table>
    </td></tr>

    <tr><td align="center" style="padding:20px 4px 0;font-family:${FONT};font-size:12px;color:${C.faint}">
      Enviado automaticamente pelo site <a href="${SITE_URL}" style="color:${C.faint}">forklin.com.br</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `NOVO CONTATO PELO SITE (${data.segmentLabel})`,
    data.sourceLabel,
    receivedAt,
    "",
    `${data.name} · ${data.company}`,
    `E-mail: ${data.email}`,
    `WhatsApp: ${data.phone}`,
    ...sections.flatMap((s) => ["", s.title.toUpperCase(), ...s.rows.map(([l, v]) => `${l}: ${v}`)]),
    ...(data.systems.length
      ? ["", "SISTEMAS DE INTERESSE", ...data.systems.map((s) => `${s.name}: ${s.users || "usuários a definir"}`)]
      : []),
    ...(data.message ? ["", "MENSAGEM", data.message] : []),
  ].join("\n");

  return { html, text };
}
