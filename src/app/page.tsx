// LP no estilo apple.com (branch design/estilo-apple) — feita com a skill apple-design
// (.claude/skills/apple-design*): claro por padrão, uma cor de destaque, o produto real como
// protagonista, uma ideia por seção e movimento ligado à rolagem. O formulário de contato
// (ContactModal, aberto por #fale-conosco…) é o mesmo da LP atual, sem mudança no envio.
import ContactModal from "@/components/ContactModal";
import Nav from "@/components/apple/Nav";
import Hero from "@/components/apple/Hero";
import Highlights from "@/components/apple/Highlights";
import EducationScene from "@/components/apple/EducationScene";
import SalesDark from "@/components/apple/SalesDark";
import B2BSection from "@/components/apple/B2BSection";
import { FinalCTA, FooterApple } from "@/components/apple/FinalCTA";
import ThemeMorph from "@/components/apple/ThemeMorph";

export default function Home() {
  return (
    <div className="ap-page">
      <ThemeMorph />
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <EducationScene />
        <SalesDark />
        <B2BSection />
        <FinalCTA />
      </main>
      <FooterApple />
      <ContactModal />
    </div>
  );
}
