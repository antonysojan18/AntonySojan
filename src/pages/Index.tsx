import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import HeroSection from "@/components/HeroSection";
import ArchitecturalBackground from "@/components/ArchitecturalBackground";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import PortfolioSection from "@/components/PortfolioSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BlobCursor from "@/components/BlobCursor";

import CursorGrid from "@/components/CursorGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* 3D Liquid Chrome Blob Cursor in Deep Editorial Blue */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
        <BlobCursor
          material="chrome"
          color="#357fb8"
          blend="normal"
          size={45}
          morph={0}
          morphSpeed={1}
          depth={1}
          trail={16}
          lag={0}
          goo={1}
          stretch={0.75}
          wobble={1}
          drip={0}
          shine={1}
          splash={true}
          splashCount={10}
          splashSpeed={0.55}
          splashSize={1}
          splashGravity={0}
          regrow={0.5}
          shadow={false}
          hideCursor={false}
        />
      </div>

      <ScrollProgressBar />
      <Navbar />

      <main>
        <HeroSection />
        {/* Architectural Canvas Docking Layer for Lower Sections */}
        <div id="lower-sections" className="relative z-30 -mt-6 sm:-mt-10 rounded-t-[32px] sm:rounded-t-[48px] bg-[#EAE6DE] shadow-[0_-20px_45px_rgba(34,97,146,0.06)] border-t border-white/60">
          <ArchitecturalBackground />

          {/* Interactive Cursor Grid (20% Opacity Deep Editorial Blue BEHIND all cards, text and tabs) */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            <CursorGrid
              cellSize={70}
              color="#226192"
              radius={140}
              falloff="smooth"
              holdTime={600}
              fadeDuration={800}
              lineWidth={1.2}
              maxOpacity={0.2}
              fillOpacity={0}
              gridOpacity={0}
              cellRadius={0}
              clickPulse={true}
              pulseSpeed={600}
            />
          </div>

          <div className="relative z-10">
            <AboutSection />
            <ProjectsSection />
            <PortfolioSection />
            <CertificatesSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
