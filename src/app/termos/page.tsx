import type { Metadata } from "next";
import LegalPage from "@/landing/LegalPage";

export const metadata: Metadata = {
  title: "Termos de uso · Forklin",
  description: "Termos de uso da Forklin.",
};

export default function Termos() {
  return (
    <LegalPage
      file="termos.html"
      title="Termos de uso"
      updated="Atualizados em 30/10/2026."
      other={{ href: "/privacidade", label: "Política de Privacidade" }}
    />
  );
}
