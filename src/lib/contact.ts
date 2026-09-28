// Canais oficiais de contato da Forklin — único lugar para trocar número/links.
export const WHATSAPP_NUMBER = "5511971177254";
export const WHATSAPP_DISPLAY = "+55 (11) 97117-7254";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Forklin e gostaria de saber mais sobre as soluções.",
)}`;

export const APP_URL = "https://app.forklin.com.br";
export const DIARIO_DIGITAL_URL =
  process.env.NEXT_PUBLIC_DIARIO_DIGITAL_URL ?? "https://drclass.forklin.com.br";

// TODO: preencher com as URLs oficiais quando existirem — ícones só aparecem se houver link.
export const SOCIAL_LINKS: { label: "Instagram" | "LinkedIn"; href: string }[] = [];
