import type { Metadata } from "next";
import LegalPage from "@/landing/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade · Forklin",
  description: "Política de Privacidade da Forklin Technologies, conforme a LGPD.",
};

export default function Privacidade() {
  return (
    <LegalPage
      file="privacidade.html"
      title="Política de Privacidade"
      updated="Atualizada em 26/10/2026."
      other={{ href: "/termos", label: "Termos de Uso" }}
    />
  );
}
