// Opções dos formulários de contato. Compartilhado entre o formulário (cliente) e a Server
// Function que valida e envia o e-mail — o servidor só aceita valores desta lista.

export type Segment = "education" | "sales" | "b2b";

export const SEGMENTS: { value: Segment; label: string; desc: string }[] = [
  { value: "education", label: "For Education", desc: "Soluções para escolas e redes de ensino" },
  { value: "sales", label: "For Sales", desc: "Soluções para a sua operação comercial" },
  { value: "b2b", label: "B2B personalizado", desc: "Um sistema sob medida para a sua empresa" },
];

export const SYSTEMS: Record<Exclude<Segment, "b2b">, string[]> = {
  education: ["Diário Digital", "Tutor IA", "Patrimônio"],
  sales: ["CRM", "Gestão comercial", "Automações", "Operação de vendas", "IA comercial"],
};

export const USER_RANGES = ["1–10", "11–50", "51–200", "200+"];

export const INSTITUTION_TYPES = [
  "Escola particular",
  "Escola pública",
  "Rede de ensino",
  "Outro",
];
export const STUDENT_RANGES = ["Até 200", "201–500", "501–1.000", "1.000+"];
export const UNIT_RANGES = ["1", "2–5", "6–20", "20+"];

export const SALES_TEAM_RANGES = ["1–5", "6–20", "21–50", "50+"];

export const EMPLOYEE_RANGES = ["1–10", "11–50", "51–200", "201–500", "500+"];

export const CURRENT_SYSTEM = ["Não uso nenhum", "Planilhas", "Outro sistema"];

export const TIMELINES = ["Imediato", "1 a 3 meses", "3 a 6 meses", "Só pesquisando"];

export const CONTACT_PREFS = ["WhatsApp", "E-mail", "Ligação"];

export const BEST_TIMES = ["Manhã", "Tarde", "Qualquer horário"];

export type LeadPayload = {
  source: "fale-conosco" | "b2b";
  segment: Segment;
  name: string;
  email: string;
  phone: string;
  role?: string;
  company: string;
  city?: string;
  institutionType?: string;
  students?: string;
  units?: string;
  industry?: string;
  salesTeam?: string;
  employees?: string;
  systems?: { name: string; users: string }[];
  currentSystem?: string;
  currentSystemName?: string;
  timeline?: string;
  contactPref?: string;
  bestTime?: string;
  message?: string;
  consent: boolean;
  /** Campo-isca invisível: humanos deixam vazio, robôs preenchem. */
  website?: string;
};

export type LeadResult = { ok: true } | { ok: false; error: string };
