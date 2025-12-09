import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useStackedScroll } from "@/hooks/use-stacked-scroll";

const Index = () => {
  useStackedScroll();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="stack-container">
        <div className="stack-section">
          <HeroSection />
        </div>
        <div className="stack-section">
          <AboutSection />
        </div>
        <div className="stack-section">
          <ServicesSection />
        </div>
        <div className="stack-section">
          <PortfolioSection />
        </div>
        <div className="stack-section">
          <CertificatesSection />
        </div>
        <div className="stack-section">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
