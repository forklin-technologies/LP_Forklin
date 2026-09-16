import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Forklin — Plataforma de sistemas para o seu negócio",
  description:
    "Forklin reúne, em um só lugar, os sistemas que o seu negócio precisa. Conheça o Diário Digital e os próximos módulos da plataforma.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${instrumentSans.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
