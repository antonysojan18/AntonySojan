import React, { useState, useEffect, useRef, useCallback } from "react";

interface IntroScreenProps {
  onTransitionStart?: () => void;
  onComplete?: () => void;
}

const LINE_1 = "Hello, Its";
const LINE_2 = "Antony Sojan";

const IntroScreen: React.FC<IntroScreenProps> = ({
  onTransitionStart,
  onComplete,
}) => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [activeCursor, setActiveCursor] = useState<"line1" | "line2" | "none">("line1");
  const [isFading, setIsFading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Keep callback references stable to prevent re-triggering timers
  const onTransitionStartRef = useRef(onTransitionStart);
  onTransitionStartRef.current = onTransitionStart;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const isFadingRef = useRef(false);
  const isFinishedRef = useRef(false);

  // Fast forward / finish callback
  const triggerFinish = useCallback(() => {
    if (isFadingRef.current || isFinishedRef.current) return;
    isFadingRef.current = true;
    setIsFading(true);
    setLine1(LINE_1);
    setLine2(LINE_2);
    setActiveCursor("none");

    onTransitionStartRef.current?.();

    setTimeout(() => {
      isFinishedRef.current = true;
      setIsFinished(true);
      onCompleteRef.current?.();
    }, 850);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Breathing delay before starting typing (250ms)
    timers.push(
      setTimeout(() => {
        let i = 0;
        setActiveCursor("line1");

        // Type Line 1 ("Hello, Its")
        const timer1 = setInterval(() => {
          if (isFadingRef.current) {
            clearInterval(timer1);
            return;
          }
          i++;
          setLine1(LINE_1.slice(0, i));

          if (i >= LINE_1.length) {
            clearInterval(timer1);

            // Pause between Line 1 and Line 2 (280ms)
            timers.push(
              setTimeout(() => {
                if (isFadingRef.current) return;
                setActiveCursor("line2");
                let j = 0;

                // Type Line 2 ("Antony Sojan")
                const timer2 = setInterval(() => {
                  if (isFadingRef.current) {
                    clearInterval(timer2);
                    return;
                  }
                  j++;
                  setLine2(LINE_2.slice(0, j));

                  if (j >= LINE_2.length) {
                    clearInterval(timer2);

                    // Admire moment (550ms hold) then seamlessly fade into Hero section
                    timers.push(
                      setTimeout(() => {
                        triggerFinish();
                      }, 550)
                    );
                  }
                }, 60);
              }, 280)
            );
          }
        }, 55);
      }, 250)
    );

    // Keyboard listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        triggerFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [triggerFinish]);

  return (
    <aside
      id="intro-screen"
      onClick={triggerFinish}
      role="region"
      aria-label="Portfolio Introduction"
      data-finished={isFinished}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden transition-all ease-out ${
        isFinished
          ? "hidden pointer-events-none opacity-0"
          : isFading
          ? "opacity-0 scale-[1.025] pointer-events-none filter blur-[2px]"
          : "opacity-100 scale-100"
      }`}
      style={{
        backgroundColor: "#EAE6DE",
        transitionDuration: "850ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* 1. Tactile Architectural Cold-Press Paper Fiber Texture */}
      <div
        className="absolute inset-0 opacity-[0.065] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* 2. Soft Ambient Vignette & Warm Ivory Luminance */}
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

      {/* 3. Architectural Drafting Border & Precision Corner Crosshairs */}
      <div className="absolute inset-4 xs:inset-6 sm:inset-10 border border-[#226192]/15 pointer-events-none rounded-2xl flex flex-col justify-between p-3 xs:p-4 sm:p-8">
        {/* Top Telemetry */}
        <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono tracking-widest text-[#226192]/65 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#722D37] animate-pulse" />
            <span>PORTFOLIO // 2026</span>
          </div>
          <span className="hidden xs:inline text-[#226192]/45">SCALE 1:100</span>
          <span>DATUM: WARM_IVORY</span>
        </div>

        {/* 4 Framing Corner Crosshairs */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#226192]/40 -translate-x-0.5 -translate-y-0.5" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#226192]/40 translate-x-0.5 -translate-y-0.5" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#226192]/40 -translate-x-0.5 translate-y-0.5" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#226192]/40 translate-x-0.5 translate-y-0.5" />

        {/* Bottom Telemetry */}
        <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono tracking-widest text-[#226192]/55 uppercase">
          <span>LAT 10.7867° N</span>
          <span className="text-[#226192]/40 text-[9px] lowercase tracking-normal">tap or press any key to skip</span>
          <span>LONG 76.6548° E</span>
        </div>
      </div>

      {/* 4. Central Typing Content Showcase */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        {/* Line 1: "Hello, Its" */}
        <div className="min-h-[2.5rem] sm:min-h-[3.25rem] md:min-h-[3.75rem] flex items-center justify-center mb-1 sm:mb-3">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#226192] flex items-baseline">
            <span>{line1}</span>
            {activeCursor === "line1" && (
              <span className="inline-block w-2 sm:w-2.5 h-5 sm:h-7 md:h-8 ml-1 bg-[#226192] animate-pulse align-middle rounded-[1px]" />
            )}
          </h2>
        </div>

        {/* Line 2: "Antony Sojan" */}
        <div className="min-h-[4.5rem] xs:min-h-[5.5rem] sm:min-h-[7.5rem] md:min-h-[9rem] lg:min-h-[11rem] flex items-center justify-center">
          <h1
            className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#226192] tracking-tight drop-shadow-[0_4px_16px_rgba(34,97,146,0.12)] flex items-baseline"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "-0.03em",
            }}
          >
            <span>{line2}</span>
            {activeCursor === "line2" && (
              <span className="inline-block w-2 sm:w-3 md:w-3.5 h-8 xs:h-10 sm:h-14 md:h-18 lg:h-22 ml-1.5 sm:ml-2 bg-[#722D37] animate-pulse align-middle rounded-[1px]" />
            )}
          </h1>
        </div>

        {/* Subtle Architectural Underline Hairline */}
        <div
          className={`h-0.5 bg-gradient-to-r from-transparent via-[#226192]/40 to-transparent transition-all duration-700 mt-2 sm:mt-4 ${
            line2.length > 0 ? "w-32 xs:w-48 sm:w-72 md:w-96 opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>
    </aside>
  );
};

export default IntroScreen;
