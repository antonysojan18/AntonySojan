import { useState, useEffect, useRef } from "react";
import { Download, Github } from "lucide-react";
import antonyProfile from "@/assets/antony-profile.PNG";
import TechText from "./TechText";
import HeroBackground from "./HeroBackground";

const greetings = [
  "Hello",
  "ഹലോ",
  "வணக்கம்",
  "नमस्ते",
  "Hola",
  "Bonjour",
  "Ciao",
  "Hallo",
  "こんにちは",
  "Olá",
];

interface HeroSectionProps {
  isIntroActive?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isIntroActive = false }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isIntroActive) {
      setGreetingIndex(0);
      return;
    }
    let intervalTimer: NodeJS.Timeout;
    const initialDelay = setTimeout(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
      intervalTimer = setInterval(() => {
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
      }, 2400);
    }, 2800);

    return () => {
      clearTimeout(initialDelay);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [isIntroActive]);

  // Smooth scroll listener for transition to second section
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          // Progress from 0 to 1 over first 420px of scroll
          const maxScroll = Math.max(window.innerHeight * 0.55, 360);
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Viewfinder HUD opacity curve: fades in quickly, peaks mid-transition, then dissolves as About docks in
  const hudOpacity =
    scrollProgress < 0.02
      ? 0
      : scrollProgress < 0.25
        ? (scrollProgress - 0.02) / 0.23
        : scrollProgress > 0.85
          ? Math.max(0, 1 - (scrollProgress - 0.85) / 0.15)
          : 1;

  // Viewfinder expansion factor as camera zooms in
  const viewfinderExpansion = scrollProgress * 32; // expands outwards by up to 32px
  const apertureRotation = scrollProgress * 95; // rotates 95 degrees

  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const curtainDistance = isSmallScreen ? 55 : 150;

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-center items-center pt-20 sm:pt-24 pb-10 sm:pb-16 px-2 sm:px-6 md:px-8 overflow-hidden transition-colors"
    >
      {/* Blended 4-in-1 Cinematic & Interactive Hero Background */}
      <HeroBackground tilt={tilt} />

      <div
        className={`relative max-w-7xl mx-auto w-full flex flex-col items-center transition-all duration-1000 ease-out ${
          isIntroActive ? "opacity-85 scale-[0.985]" : "opacity-100 scale-100"
        }`}
      >
        {/* Top of the photo: "Hello, Its" with rolling Hello in different languages */}
        <div
          className="flex items-center justify-center translate-y-1 sm:translate-y-3 md:translate-y-4 z-30 transition-transform duration-75 will-change-transform"
          style={{
            transform: `translateY(${10 - scrollProgress * 24}px)`,
            opacity: Math.max(0, 1 - scrollProgress * 1.5),
            filter: `blur(${scrollProgress * 6}px)`,
          }}
        >
          <div className="perspective-600 h-8 sm:h-10 md:h-12 flex items-center justify-center">
            <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-black font-display tracking-tighter text-[#226192] flex items-baseline">
              <span
                key={greetingIndex}
                className="animate-roll-3d inline-block"
              >
                {greetings[greetingIndex]}
              </span>
              <span>, Its</span>
            </h2>
          </div>
        </div>

        {/* Central 3D Showcase: ANTONY | Bigger Pop-out Photo & Viewfinder | SOJAN */}
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center my-0 px-0.5 sm:px-4">
          {/* ANTONY (Left Curtain) - Glides left and dissolves with blur on scroll */}
          <div
            className="flex-1 text-right select-none pr-0 sm:pr-1 md:pr-2 z-10 transition-transform duration-75 will-change-transform h-20 xs:h-24 sm:h-32 md:h-40 lg:h-52 xl:h-60 2xl:h-64 flex items-center justify-end"
            style={{
              transform: `translateX(-${scrollProgress * curtainDistance}px)`,
              opacity: Math.max(0, 1 - scrollProgress * 1.35),
              filter: `blur(${scrollProgress * 8}px)`,
            }}
          >
            <h1 className="sr-only">ANTONY</h1>
            <div className="w-full h-full relative drop-shadow-[0_8px_16px_rgba(34,97,146,0.12)]">
              <TechText
                text="ANTONY"
                fontFamily="'Playfair Display', serif"
                fontWeight={900}
                fontSize={220}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                color="#226192"
                accentColor="#EF8557"
                letterSpacing={-0.03}
                reach={180}
                softness={0.7}
                strokeWidth={1.8}
                speed={1}
                lineStyle="dashed"
                selection
                labels
                draggable
                sweep={false}
                align="right"
              />
            </div>
          </div>

          {/* Central Cutout Photo - Depth Zoom & Cinematography Viewfinder Frame */}
          <div
            className="relative shrink-0 -mx-7 xs:-mx-10 sm:-mx-10 md:-mx-14 lg:-mx-18 flex justify-center items-end group z-20 will-change-transform"
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${1 + scrollProgress * 0.16}) translateY(-${scrollProgress * 20}px)`,
              transition: "transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)",
            }}
          >
            {/* Ambient 3D Rings & Backing Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 rounded-full bg-gradient-to-tr from-[#226192]/25 via-[#2C3480]/15 to-[#EF8557]/20 blur-xl sm:blur-2xl pointer-events-none -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-white/60 pointer-events-none -z-10 animate-[spin_25s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] rounded-full border border-[#226192]/15 pointer-events-none -z-10 animate-[spin_35s_linear_infinite_reverse]" />

            {/* OPTION 2 CINEMATOGRAPHY VIEWFINDER & APERTURE HUD */}
            <div
              className="absolute pointer-events-none z-30 transition-opacity duration-150 flex flex-col justify-between"
              style={{
                top: `-${viewfinderExpansion + 6}px`,
                bottom: `-${viewfinderExpansion + 6}px`,
                left: `-${viewfinderExpansion + 6}px`,
                right: `-${viewfinderExpansion + 6}px`,
                opacity: hudOpacity,
              }}
            >
              {/* 4 Camera Framing Corner Brackets */}
              <div className="absolute top-0 left-0 w-3.5 sm:w-6 h-3.5 sm:h-6 border-t-2 border-l-2 border-[#226192] rounded-tl-sm shadow-sm" />
              <div className="absolute top-0 right-0 w-3.5 sm:w-6 h-3.5 sm:h-6 border-t-2 border-r-2 border-[#226192] rounded-tr-sm shadow-sm" />
              <div className="absolute bottom-0 left-0 w-3.5 sm:w-6 h-3.5 sm:h-6 border-b-2 border-l-2 border-[#226192] rounded-bl-sm shadow-sm" />
              <div className="absolute bottom-0 right-0 w-3.5 sm:w-6 h-3.5 sm:h-6 border-b-2 border-r-2 border-[#226192] rounded-br-sm shadow-sm" />

              {/* Viewfinder Top Telemetry */}
              <div className="w-full flex items-center justify-between px-1.5 sm:px-3 py-0.5 sm:py-1 text-[7.5px] xs:text-[8px] sm:text-[10px] md:text-xs font-mono font-bold tracking-wider sm:tracking-widest text-[#226192]">
                <div className="flex items-center gap-1 bg-[#226192]/10 backdrop-blur-md px-1.5 py-0.5 rounded border border-[#226192]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF8557] animate-pulse" />
                  <span>REC [●]</span>
                </div>
                <div className="bg-[#226192]/10 backdrop-blur-md px-1.5 py-0.5 rounded border border-[#226192]/20">
                  <span>RAW 4K</span>
                </div>
              </div>

              {/* Viewfinder Center Focal Crosshair & Rotating Lens Aperture Ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <svg
                  className="w-36 h-36 xs:w-44 xs:h-44 sm:w-48 sm:h-48 md:w-60 md:h-60 text-[#226192]/30 animate-none transition-transform duration-75"
                  viewBox="0 0 100 100"
                  style={{
                    transform: `rotate(${apertureRotation}deg) scale(${1 + scrollProgress * 0.25})`,
                  }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#EF8557"
                    strokeWidth="0.8"
                    strokeOpacity="0.45"
                    strokeDasharray="8 6"
                  />
                </svg>

                <div className="absolute flex items-center justify-center">
                  <div className="w-3.5 sm:w-6 h-0.5 bg-[#EF8557]/80" />
                  <div className="h-3.5 sm:h-6 w-0.5 bg-[#EF8557]/80 absolute" />
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full border border-[#226192] absolute" />
                </div>
              </div>

              {/* Viewfinder Bottom Telemetry */}
              <div className="w-full flex items-center justify-between px-1.5 sm:px-3 py-0.5 sm:py-1 text-[7.5px] xs:text-[8px] sm:text-[10px] md:text-xs font-mono font-bold tracking-wider sm:tracking-widest text-[#226192]">
                <div className="bg-[#226192]/10 backdrop-blur-md px-1.5 py-0.5 rounded border border-[#226192]/20">
                  <span>50mm f/1.2</span>
                </div>
                <div className="bg-[#226192]/10 backdrop-blur-md px-1.5 py-0.5 rounded border border-[#226192]/20 text-[#EF8557]">
                  <span>ISO 100</span>
                </div>
              </div>
            </div>

            {/* Antony Profile Photo Cutout - Enlarged on mobile, original size on desktop */}
            <div className="relative w-[195px] xs:w-[225px] sm:w-68 md:w-80 lg:w-[370px] xl:w-[430px] aspect-[4/5] max-h-[400px] sm:max-h-[460px] flex items-end justify-center">
              <img
                src={antonyProfile}
                alt="Antony Sojan"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(34,97,146,0.32)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* SOJAN (Right Curtain) - Glides right and dissolves with blur on scroll */}
          <div
            className="flex-1 text-left select-none pl-0 sm:pl-1 md:pl-2 z-10 transition-transform duration-75 will-change-transform h-20 xs:h-24 sm:h-32 md:h-40 lg:h-52 xl:h-60 2xl:h-64 flex items-center justify-start"
            style={{
              transform: `translateX(${scrollProgress * curtainDistance}px)`,
              opacity: Math.max(0, 1 - scrollProgress * 1.35),
              filter: `blur(${scrollProgress * 8}px)`,
            }}
          >
            <h1 className="sr-only">SOJAN</h1>
            <div className="w-full h-full relative drop-shadow-[0_8px_16px_rgba(34,97,146,0.12)]">
              <TechText
                text="SOJAN"
                fontFamily="'Playfair Display', serif"
                fontWeight={900}
                fontSize={220}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                color="#226192"
                accentColor="#EF8557"
                letterSpacing={-0.03}
                reach={180}
                softness={0.7}
                strokeWidth={1.8}
                speed={1}
                lineStyle="dashed"
                selection
                labels
                draggable
                sweep={false}
                align="left"
              />
            </div>
          </div>
        </div>

        {/* Bottom of the photo: Roles Tagline & Call-To-Action */}
        <div
          className="mt-4 sm:mt-6 flex flex-col items-center justify-center text-center z-20 transition-transform duration-75 will-change-transform px-3"
          style={{
            transform: `translateY(${scrollProgress * 35}px)`,
            opacity: Math.max(0, 1 - scrollProgress * 1.5),
            filter: `blur(${scrollProgress * 6}px)`,
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-1.5 xs:gap-2 sm:gap-4 md:gap-6 text-[11px] xs:text-xs sm:text-base md:text-lg font-extrabold uppercase tracking-wider sm:tracking-widest text-[#226192]">
            <span className="hover:text-[#722D37] transition-colors cursor-default">Software Developer</span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#722D37]" />
            <span className="hover:text-[#722D37] transition-colors cursor-default">Photographer</span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#722D37]" />
            <span className="hover:text-[#722D37] transition-colors cursor-default">Designer</span>
          </div>

          {/* Action CTAs - Responsive layout for mobile touch targets */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-5 w-full sm:w-auto max-w-xs sm:max-w-none">
            <a
              href="https://github.com/antonysojan18"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#226192] text-[#FAF8F5] rounded-full font-bold text-xs sm:text-sm shadow-[0_8px_24px_rgba(34,97,146,0.28)] hover:shadow-[0_12px_32px_rgba(34,97,146,0.42)] hover:bg-[#184A71] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Github size={16} />
              View GitHub
            </a>
            <a
              href="/Antony_Sojan.pdf"
              download="Antony_Sojan.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-white/70 backdrop-blur-xl border border-white/80 text-[#226192] rounded-full font-bold text-xs sm:text-sm shadow-sm hover:bg-white hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Download size={16} />
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
