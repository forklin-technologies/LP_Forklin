// LP no estilo apple.com (branch design/estilo-apple) — feita com a skill apple-design
// (.claude/skills/apple-design*), com os pedidos do usuário por cima: header e seção do robô
// da LP anterior, fonte Poppins, cards mais vivos e a logo 3D em destaque.
// O formulário de contato (ContactModal, aberto por #fale-conosco…) é o mesmo da LP atual.
import Header from "@/components/Header";
import EcosystemCards from "@/components/EcosystemCards";
import ContactModal from "@/components/ContactModal";
import Hero from "@/components/apple/Hero";
import Highlights from "@/components/apple/Highlights";
import SalesDark from "@/components/apple/SalesDark";
import B2BSection from "@/components/apple/B2BSection";
import { FinalCTA, FooterApple } from "@/components/apple/FinalCTA";
import ThemeMorph from "@/components/apple/ThemeMorph";

export default function Home() {
  return (
    <div className="ap-page">
      <ThemeMorph />
      <Header />
      <main>
        <Hero />
        <div data-theme-section="light">
          <EcosystemCards />
        </div>
        <Highlights />
        <SalesDark />
        <B2BSection />
        <FinalCTA />
      </main>
      <FooterApple />
      <ContactModal />
    </div>
  );
}
