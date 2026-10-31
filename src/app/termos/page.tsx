import type { Metadata } from "next";
import LegalPage from "@/landing/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso · Forklin",
  description: "Termos de Uso da Forklin Technologies.",
};

export default function Termos() {
  return (
    <LegalPage
      file="termos.html"
      title="Termos de Uso"
      updated="Atualizados em 26/10/2026."
      other={{ href: "/privacidade", label: "Política de Privacidade" }}
    />
  );
}
