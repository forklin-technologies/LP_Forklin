import type { Metadata } from "next";
import { Caveat, Montserrat } from "next/font/google";
// A LP nova traz o próprio CSS (src/app/lp.css) e não usa o Tailwind/globals.css da LP anterior.
import "./lp.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

// Só nas anotações à mão do hero e da seção "Do improviso ao sistema".
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forklin — Ecossistema de sistemas para educação e vendas",
  description:
    "A Forklin reúne sistemas para escolas e para equipes de vendas em um ecossistema: uma conta, e cada pessoa acessa só o que precisa. Peça um orçamento sob medida.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
