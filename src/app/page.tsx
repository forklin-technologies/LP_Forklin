import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EcosystemCards from "@/components/EcosystemCards";
import Solutions from "@/components/Solutions";
import HowItWorks from "@/components/HowItWorks";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <EcosystemCards />
      <Solutions />
      <HowItWorks />
      <ContactCTA />
      <Footer />
    </div>
  );
}
