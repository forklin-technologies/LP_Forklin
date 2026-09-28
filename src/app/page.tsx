import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EcosystemCards from "@/components/EcosystemCards";
import Segments from "@/components/Segments";
import ForEducation from "@/components/ForEducation";
import ForSales from "@/components/ForSales";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Header />
      <Hero />
      <EcosystemCards />
      <Segments />
      <ForEducation />
      <ForSales />
      <ContactCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
