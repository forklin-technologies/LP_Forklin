import AuroraBackground from "@/components/AuroraBackground";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EcosystemCards from "@/components/EcosystemCards";
import Segments from "@/components/Segments";
import ForEducation from "@/components/ForEducation";
import ForSales from "@/components/ForSales";
import B2B from "@/components/B2B";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <div className="relative isolate flex min-h-screen flex-col">
      <AuroraBackground />
      <ScrollProgress />
      <Header />
      <Hero />
      <EcosystemCards />
      <Segments />
      <ForEducation />
      <ForSales />
      <B2B />
      <ContactCTA />
      <Footer />
      <BackToTop />
      <ContactModal />
      <CustomCursor />
    </div>
  );
}
