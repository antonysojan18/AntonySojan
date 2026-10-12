import { useState, useEffect, useRef, useCallback } from "react";
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

const FULL_HELLO = "Hello, Its";
const FULL_ANTONY = "ANTONY";
const FULL_SOJAN = "SOJAN";

type IntroState =
  | "typing-hello"
  | "typing-antony"
  | "typing-sojan"
  | "hold"
  | "splitting"
  | "complete";

interface HeroSectionProps {
  onIntroStateChange?: (isActive: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onIntroStateChange }) => {
  // Intro animation states
  const [introState, setIntroState] = useState<IntroState>("typing-hello");
  const [typedHello, setTypedHello] = useState("");
  const [typedAntony, setTypedAntony] = useState("");
  const [typedSojan, setTypedSojan] = useState("");
  const [cursor, setCursor] = useState<"hello" | "antony" | "sojan" | "none">("hello");
  const [isSplit, setIsSplit] = useState(false);
  const [overlayRemoved, setOverlayRemoved] = useState(false);

  const isSplitRef = useRef(false);
  const onIntroStateChangeRef = useRef(onIntroStateChange);
  onIntroStateChangeRef.current = onIntroStateChange;

  // Language greeting cycle index for Hero
  const [greetingIndex, setGreetingIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const antonyColRef = useRef<HTMLDivElement>(null);
  const sojanColRef = useRef<HTMLDivElement>(null);
  const [syncFontSize, setSyncFontSize] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Split offset: distance ANTONY and SOJAN shift inward so they sit together in the center during intro
  // Calculated from column boundaries to ensure 'Y' and 'S' NEVER overlap or intersect
  const [splitShift, setSplitShift] = useState(isSmallScreen ? 60 : 120);

  useEffect(() => {
    const calcShift = () => {
      const colA = antonyColRef.current;
      const colS = sojanColRef.current;
      if (colA && colS) {
        const rectA = colA.getBoundingClientRect();
        const rectS = colS.getBoundingClientRect();
        const gap = rectS.left - rectA.right;
        // Desired clean, natural word space between ANTONY and SOJAN (36px desktop, 20px mobile)
        const desiredSpace = isSmallScreen ? 20 : 36;
        const shift = Math.max((gap - desiredSpace) / 2, 0);
        setSplitShift(shift);
      } else {
        setSplitShift(isSmallScreen ? 60 : 120);
      }
    };
    calcShift();
    window.addEventListener("resize", calcShift);
    return () => window.removeEventListener("resize", calcShift);
  }, [isSmallScreen]);

  // Skip / Fast-forward intro
  const skipIntro = useCallback(() => {
    if (isSplitRef.current) return;
    isSplitRef.current = true;
    setIsSplit(true);
    setTypedHello(FULL_HELLO);
    setTypedAntony(FULL_ANTONY);
    setTypedSojan(FULL_SOJAN);
    setCursor("none");
    setIntroState("splitting");
    onIntroStateChangeRef.current?.(false);

    setTimeout(() => {
      setIntroState("complete");
      setOverlayRemoved(true);
    }, 1200);
  }, []);

  // Intro Typing & Split sequence
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Step 1: Initial breathing pause before typing Line 1 (Hello, Its)
    timers.push(
      setTimeout(() => {
        if (isSplitRef.current) return;
        setCursor("hello");
        let i = 0;

        const helloTimer = setInterval(() => {
          if (isSplitRef.current) {
            clearInterval(helloTimer);
            return;
          }
          i++;
          setTypedHello(FULL_HELLO.slice(0, i));

          if (i >= FULL_HELLO.length) {
            clearInterval(helloTimer);

            // Step 2: Pause before typing Line 2 (ANTONY)
            timers.push(
              setTimeout(() => {
                if (isSplitRef.current) return;
                setIntroState("typing-antony");
                setCursor("antony");
                let a = 0;

                const antonyTimer = setInterval(() => {
                  if (isSplitRef.current) {
                    clearInterval(antonyTimer);
                    return;
                  }
                  a++;
                  setTypedAntony(FULL_ANTONY.slice(0, a));

                  if (a >= FULL_ANTONY.length) {
                    clearInterval(antonyTimer);

                    // Step 3: Brief gap before typing SOJAN
                    timers.push(
                      setTimeout(() => {
                        if (isSplitRef.current) return;
                        setIntroState("typing-sojan");
                        setCursor("sojan");
                        let s = 0;

                        const sojanTimer = setInterval(() => {
                          if (isSplitRef.current) {
                            clearInterval(sojanTimer);
                            return;
                          }
                          s++;
                          setTypedSojan(FULL_SOJAN.slice(0, s));

                          if (s >= FULL_SOJAN.length) {
                            clearInterval(sojanTimer);

                            // Step 4: Admire hold moment - "ANTONY SOJAN" is together in the center
                            timers.push(
                              setTimeout(() => {
                                if (isSplitRef.current) return;
                                setIntroState("hold");
                                setCursor("none");

                                // Step 5: THE SPLIT! They split apart and join the hero section!
                                timers.push(
                                  setTimeout(() => {
                                    if (isSplitRef.current) return;
                                    isSplitRef.current = true;
                                    setIsSplit(true);
                                    setIntroState("splitting");
                                    onIntroStateChangeRef.current?.(false);

                                    // Step 6: Split transition finishes, hand-off to full hero interaction
                                    timers.push(
                                      setTimeout(() => {
                                        setIntroState("complete");
                                        setOverlayRemoved(true);
                                      }, 1200)
                                    );
                                  }, 400)
                                );
                              }, 350)
                            );
                          }
                        }, 55);
                      }, 160)
                    );
                  }
                }, 55);
              }, 220)
            );
          }
        }, 45);
      }, 200)
    );

    // Keyboard listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        skipIntro();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [skipIntro]);

  // Language greeting rotation (starts 2.8s AFTER intro finishes)
  useEffect(() => {
    if (introState !== "complete") {
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
  }, [introState]);

  // Smooth scroll listener for transition to second section
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
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
    if (!containerRef.current || introState !== "complete") return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Viewfinder HUD opacity curve
  const hudOpacity =
    scrollProgress < 0.02
      ? 0
      : scrollProgress < 0.25
        ? (scrollProgress - 0.02) / 0.23
        : scrollProgress > 0.85
          ? Math.max(0, 1 - (scrollProgress - 0.85) / 0.15)
          : 1;

  const viewfinderExpansion = scrollProgress * 32;
  const apertureRotation = scrollProgress * 95;
  const curtainDistance = isSmallScreen ? 55 : 150;

  // Split-to-Hero Transform Computations:
  // When !isSplit: ANTONY shifted right by +splitShift, SOJAN shifted left by -splitShift (joined in center)
  // When isSplit: smoothly transitions to 0, then follows scroll curtain distance
  const antonyX = !isSplit ? splitShift : -scrollProgress * curtainDistance;
  const sojanX = !isSplit ? -splitShift : scrollProgress * curtainDistance;

  const nameTransition =
    introState === "splitting"
      ? "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)"
      : introState === "complete"
        ? "transform 75ms linear"
        : "none";

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-center items-center pt-20 sm:pt-24 pb-10 sm:pb-16 px-2 sm:px-6 md:px-8 overflow-hidden transition-colors"
    >
      {/* 1. Warm Ivory Architectural Drafting Intro Overlay */}
      {!overlayRemoved && (
        <aside
          onClick={skipIntro}
          role="region"
          aria-label="Welcome Introduction"
          className={`fixed inset-0 z-20 select-none overflow-hidden transition-all duration-1000 ease-out ${
            isSplit
              ? "opacity-0 pointer-events-none filter blur-[2px]"
              : "opacity-100 pointer-events-auto cursor-pointer"
          }`}
          style={{
            backgroundColor: "#EAE6DE",
            transitionDuration: "1000ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Tactile Architectural Cold-Press Paper Fiber Texture */}
          <div
            className="absolute inset-0 opacity-[0.065] mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />

          {/* Soft Ambient Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 90% 60% at 50% 50%, rgba(255, 255, 255, 0.7) 0%, transparent 75%),
                radial-gradient(ellipse 60% 45% at 85% 85%, rgba(114, 45, 55, 0.045) 0%, transparent 60%),
                radial-gradient(ellipse 60% 45% at 15% 15%, rgba(34, 97, 146, 0.05) 0%, transparent 60%)
              `,
            }}
          />

          {/* Architectural Drafting Border & Precision Corner Crosshairs */}
          <div className="absolute inset-4 xs:inset-6 sm:inset-10 border border-[#226192]/15 pointer-events-none rounded-2xl flex flex-col justify-between p-3 xs:p-4 sm:p-8">
            <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono tracking-widest text-[#226192]/65 uppercase">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#722D37] animate-pulse" />
                <span>PORTFOLIO // 2026</span>
              </div>
              <span className="hidden xs:inline text-[#226192]/45">SCALE 1:100</span>
              <span>DATUM: WARM_IVORY</span>
            </div>

            {/* Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#226192]/40 -translate-x-0.5 -translate-y-0.5" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#226192]/40 translate-x-0.5 -translate-y-0.5" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#226192]/40 -translate-x-0.5 translate-y-0.5" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#226192]/40 translate-x-0.5 translate-y-0.5" />

            <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono tracking-widest text-[#226192]/55 uppercase">
              <span>LAT 10.7867° N</span>
              <span className="text-[#226192]/40 text-[9px] lowercase tracking-normal">tap or press any key to skip</span>
              <span>LONG 76.6548° E</span>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Blended 4-in-1 Cinematic & Interactive Hero Background */}
      <HeroBackground tilt={tilt} />

      {/* 3. Main Hero Interactive Layout (Elevated to z-30 above overlay) */}
      <div className="relative z-30 max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Top greeting: "Hello, Its" (Starts lowered in intro, smoothly glides up into Hero position) */}
        <div
          className="flex items-center justify-center translate-y-1 sm:translate-y-3 md:translate-y-4 z-30 will-change-transform"
          style={{
            transform: !isSplit
              ? `translateY(${isSmallScreen ? 44 : 68}px)`
              : `translateY(${10 - scrollProgress * 24}px)`,
            opacity: Math.max(0, 1 - scrollProgress * 1.5),
            filter: `blur(${scrollProgress * 6}px)`,
            transition:
              introState === "splitting"
                ? "transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)"
                : "transform 75ms linear",
          }}
        >
          <div className="perspective-600 h-8 sm:h-10 md:h-12 flex items-center justify-center">
            <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-black font-display tracking-tighter text-[#226192] flex items-baseline">
              {introState === "complete" ? (
                <>
                  <span
                    key={greetingIndex}
                    className="animate-roll-3d inline-block"
                  >
                    {greetings[greetingIndex]}
                  </span>
                  <span>, Its</span>
                </>
              ) : (
                <>
                  <span>{typedHello}</span>
                  {cursor === "hello" && (
                    <span className="inline-block w-1.5 sm:w-2.5 h-4 sm:h-6 ml-1 bg-[#226192] animate-pulse align-middle" />
                  )}
                </>
              )}
            </h2>
          </div>
        </div>

        {/* Central 3D Showcase: ANTONY | Center Photo | SOJAN (Splits apart smoothly!) */}
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center my-0 px-0.5 sm:px-4">
          {/* ANTONY (Left Curtain) */}
          <div
            ref={antonyColRef}
            className="flex-1 text-right select-none pr-0 sm:pr-1 md:pr-2 z-10 will-change-transform h-20 xs:h-24 sm:h-32 md:h-40 lg:h-52 xl:h-60 2xl:h-64 flex items-center justify-end"
            style={{
              transform: `translateX(${antonyX}px)`,
              opacity: Math.max(0, 1 - scrollProgress * 1.35),
              filter: `blur(${scrollProgress * 8}px)`,
              transition: nameTransition,
            }}
          >
            <h1 className="sr-only">ANTONY</h1>
            <div className="w-full h-full relative drop-shadow-[0_8px_16px_rgba(34,97,146,0.12)] flex items-center justify-end">
              {/* Live typing & fluid sliding HTML text layer */}
              <div
                className={`absolute inset-0 flex items-center justify-end select-none transition-opacity duration-500 ${
                  introState === "complete" ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span
                  className="font-black text-[#226192] tracking-[-0.03em] flex items-baseline justify-end"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: syncFontSize ? `${syncFontSize}px` : (isSmallScreen ? "3.2rem" : "7rem"),
                    lineHeight: 1,
                  }}
                >
                  <span>{typedAntony}</span>
                  {cursor === "antony" && (
                    <span className="inline-block w-2 sm:w-3.5 h-[0.7em] ml-1 bg-[#226192] animate-pulse align-baseline" />
                  )}
                </span>
              </div>

              {/* Interactive TechText canvas layer (activates once split finishes) */}
              <div
                className={`w-full h-full transition-opacity duration-500 ${
                  introState === "complete" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <TechText
                  text="ANTONY"
                  referenceText="ANTONY"
                  onSizeCalculated={(sz) => setSyncFontSize(sz)}
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
          </div>

          {/* Central Cutout Photo - Scales up and emerges as ANTONY & SOJAN split apart */}
          <div
            ref={photoContainerRef}
            className="relative shrink-0 -mx-7 xs:-mx-10 sm:-mx-10 md:-mx-14 lg:-mx-18 flex justify-center items-end group z-20 will-change-transform"
            style={{
              transform: !isSplit
                ? "scale(0) translateY(50px)"
                : `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${1 + scrollProgress * 0.16}) translateY(-${scrollProgress * 20}px)`,
              opacity: !isSplit ? 0 : 1,
              transition:
                introState === "splitting"
                  ? "all 1200ms cubic-bezier(0.16, 1, 0.3, 1)"
                  : "transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)",
            }}
          >
            {/* Ambient 3D Rings & Backing Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 rounded-full bg-gradient-to-tr from-[#226192]/25 via-[#2C3480]/15 to-[#EF8557]/20 blur-xl sm:blur-2xl pointer-events-none -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-white/60 pointer-events-none -z-10 animate-[spin_25s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[125%] rounded-full border border-[#226192]/15 pointer-events-none -z-10 animate-[spin_35s_linear_infinite_reverse]" />

            {/* Viewfinder HUD */}
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

              {/* Viewfinder Center Focal Crosshair */}
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

            {/* Antony Profile Photo Cutout */}
            <div className="relative w-[195px] xs:w-[225px] sm:w-68 md:w-80 lg:w-[370px] xl:w-[430px] aspect-[4/5] max-h-[400px] sm:max-h-[460px] flex items-end justify-center">
              <img
                src={antonyProfile}
                alt="Antony Sojan"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(34,97,146,0.32)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* SOJAN (Right Curtain) */}
          <div
            ref={sojanColRef}
            className="flex-1 text-left select-none pl-0 sm:pl-1 md:pl-2 z-10 will-change-transform h-20 xs:h-24 sm:h-32 md:h-40 lg:h-52 xl:h-60 2xl:h-64 flex items-center justify-start"
            style={{
              transform: `translateX(${sojanX}px)`,
              opacity: Math.max(0, 1 - scrollProgress * 1.35),
              filter: `blur(${scrollProgress * 8}px)`,
              transition: nameTransition,
            }}
          >
            <h1 className="sr-only">SOJAN</h1>
            <div className="w-full h-full relative drop-shadow-[0_8px_16px_rgba(34,97,146,0.12)] flex items-center justify-start">
              {/* Live typing & fluid sliding HTML text layer */}
              <div
                className={`absolute inset-0 flex items-center justify-start select-none transition-opacity duration-500 ${
                  introState === "complete" ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <span
                  className="font-black text-[#226192] tracking-[-0.03em] flex items-baseline justify-start"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: syncFontSize ? `${syncFontSize}px` : (isSmallScreen ? "3.2rem" : "7rem"),
                    lineHeight: 1,
                  }}
                >
                  <span>{typedSojan}</span>
                  {cursor === "sojan" && (
                    <span className="inline-block w-2 sm:w-3.5 h-[0.7em] ml-1 bg-[#722D37] animate-pulse align-baseline" />
                  )}
                </span>
              </div>

              {/* Interactive TechText canvas layer (activates once split finishes) */}
              <div
                className={`w-full h-full transition-opacity duration-500 ${
                  introState === "complete" ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <TechText
                  text="SOJAN"
                  referenceText="ANTONY"
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
        </div>

        {/* Roles Tagline & Call-To-Action (Glides up into place as split occurs) */}
        <div
          className="mt-4 sm:mt-6 flex flex-col items-center justify-center text-center z-20 will-change-transform px-3"
          style={{
            transform: !isSplit
              ? "translateY(36px)"
              : `translateY(${scrollProgress * 35}px)`,
            opacity: !isSplit ? 0 : Math.max(0, 1 - scrollProgress * 1.5),
            filter: `blur(${scrollProgress * 6}px)`,
            transition:
              introState === "splitting"
                ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1) 250ms, opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1) 250ms"
                : "transform 75ms linear",
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-1.5 xs:gap-2 sm:gap-4 md:gap-6 text-[11px] xs:text-xs sm:text-base md:text-lg font-extrabold uppercase tracking-wider sm:tracking-widest text-[#226192]">
            <span className="hover:text-[#722D37] transition-colors cursor-default">Software Developer</span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#722D37]" />
            <span className="hover:text-[#722D37] transition-colors cursor-default">Photographer</span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#722D37]" />
            <span className="hover:text-[#722D37] transition-colors cursor-default">Designer</span>
          </div>

          {/* Action CTAs */}
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
