import { useEffect, useRef, useState } from "react";

interface HeroBackgroundProps {
  tilt?: { x: number; y: number };
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  highlight: number;
}

const HeroBackground = ({ tilt = { x: 0, y: 0 } }: HeroBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000, active: false });
  const [timecode, setTimecode] = useState("01:24:08:14");

  // Rolling cinematic timecode simulation
  useEffect(() => {
    let frame = 14;
    let sec = 8;
    const interval = setInterval(() => {
      frame = (frame + 1) % 24;
      if (frame === 0) sec = (sec + 1) % 60;
      setTimecode(`01:24:${sec.toString().padStart(2, "0")}:${frame.toString().padStart(2, "0")}`);
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  // Track mouse coordinates for constellation attraction
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      mousePos.current.active = false;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  // Option 2: Interactive Constellation Nodes on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const isSmall = window.innerWidth < 768;
    const particleCount = isSmall ? 24 : 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.2,
        baseRadius: Math.random() * 1.5 + 1.2,
        highlight: 0,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mousePos.current;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse proximity interaction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            // Gentle magnetic attraction
            const force = (130 - dist) / 130;
            p.x += (dx / dist) * force * 0.8;
            p.y += (dy / dist) * force * 0.8;
            p.highlight = Math.min(1, p.highlight + 0.1);
          } else {
            p.highlight = Math.max(0, p.highlight - 0.03);
          }
        } else {
          p.highlight = Math.max(0, p.highlight - 0.03);
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius + p.highlight * 1.2, 0, Math.PI * 2);

        if (p.highlight > 0.1) {
          ctx.fillStyle = `rgba(239, 133, 87, ${0.4 + p.highlight * 0.45})`; // Coral pulse
          ctx.shadowColor = "#EF8557";
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = "rgba(34, 97, 146, 0.28)"; // Deep editorial blue node
          ctx.shadowBlur = 0;
        }
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxConnectDist = isSmall ? 85 : 115;

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            if (p.highlight > 0.2 || p2.highlight > 0.2) {
              const hotAlpha = Math.max(p.highlight, p2.highlight) * 0.35;
              ctx.strokeStyle = `rgba(239, 133, 87, ${hotAlpha})`;
              ctx.lineWidth = 1;
            } else {
              ctx.strokeStyle = `rgba(34, 97, 146, ${alpha})`;
              ctx.lineWidth = 0.75;
            }
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none -z-10"
      style={{
        transform: `translate3d(${tilt.x * 0.35}px, ${tilt.y * 0.35}px, 0)`,
        transition: "transform 0.15s cubic-bezier(0.2, 0, 0.2, 1)",
      }}
    >
      {/* =========================================================================
          LAYER 1 (OPTION 3): EDITORIAL AURORA LIQUID MESH
          Warm organic floating gradient orbs with deep blur
          ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orb 1: Deep Editorial Blue Center-Left */}
        <div className="absolute top-[15%] left-[10%] w-[380px] sm:w-[540px] md:w-[680px] h-[380px] sm:h-[540px] md:h-[680px] rounded-full bg-gradient-to-tr from-[#226192]/18 via-[#2C3480]/12 to-transparent blur-[90px] sm:blur-[130px] animate-[pulse_9s_ease-in-out_infinite]" />

        {/* Orb 2: Warm Coral Glow Center-Right */}
        <div className="absolute top-[35%] right-[8%] w-[320px] sm:w-[480px] md:w-[580px] h-[320px] sm:h-[480px] md:h-[580px] rounded-full bg-gradient-to-bl from-[#EF8557]/14 via-[#226192]/10 to-transparent blur-[80px] sm:blur-[120px] animate-[pulse_11s_ease-in-out_infinite_2s]" />

        {/* Orb 3: Deep Cobalt Anchor Bottom */}
        <div className="absolute bottom-[5%] left-[30%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-t from-[#2C3480]/15 via-[#226192]/10 to-transparent blur-[100px] sm:blur-[140px]" />
      </div>

      {/* =========================================================================
          LAYER 2 (OPTION 4): 35MM FILMSTRIP SPROCKETS & ANAMORPHIC LIGHT LEAK
          Analog cinema perforations on outer margins & drifting horizontal flare
          ========================================================================= */}
      {/* Anamorphic Horizontal Lens Flare Streak */}
      <div className="absolute top-[42%] -left-[10%] -right-[10%] h-20 sm:h-28 bg-gradient-to-r from-transparent via-[#EF8557]/12 to-transparent blur-3xl opacity-75 animate-[pulse_7s_ease-in-out_infinite]" />

      {/* Left 35mm Film Sprocket Column (Hidden on tiny phones, visible from tablet up) */}
      <div className="hidden sm:flex absolute left-2 md:left-4 top-0 bottom-0 flex-col justify-between py-6 opacity-35">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={`sprocket-l-${i}`} className="flex items-center gap-1.5">
            <div className="w-2 md:w-2.5 h-3 md:h-3.5 rounded-[2px] border border-[#226192]/40 bg-[#226192]/10 shadow-[inset_0_1px_1px_rgba(34,97,146,0.2)]" />
            {i % 4 === 0 && (
              <span className="text-[7.5px] font-mono font-bold tracking-widest text-[#226192]/50 rotate-90 origin-left">
                35MM KODAK
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Right 35mm Film Sprocket Column */}
      <div className="hidden sm:flex absolute right-2 md:right-4 top-0 bottom-0 flex-col justify-between py-6 opacity-35">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={`sprocket-r-${i}`} className="flex items-center gap-1.5 flex-row-reverse">
            <div className="w-2 md:w-2.5 h-3 md:h-3.5 rounded-[2px] border border-[#226192]/40 bg-[#226192]/10 shadow-[inset_0_1px_1px_rgba(34,97,146,0.2)]" />
            {i % 4 === 2 && (
              <span className="text-[7.5px] font-mono font-bold tracking-widest text-[#226192]/50 -rotate-90 origin-right">
                FRAME #{24 + i}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* =========================================================================
          LAYER 3 (OPTION 1): CINEMATOGRAPHY BLUEPRINT GRID & HUD TELEMETRY
          Technical framing markings, crosshairs, aspect ratios, and director metadata
          ========================================================================= */}
      {/* 48px Fine Blueprint Grid Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.065] text-[#226192]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-blueprint-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-blueprint-grid)" />
      </svg>

      {/* Technical HUD Framing Crosshairs & Director Metadata */}
      {/* Top Left: Framing & Timecode */}
      <div className="absolute top-20 sm:top-24 left-6 sm:left-14 font-mono text-[8px] sm:text-[9.5px] font-bold text-[#226192]/55 tracking-wider space-y-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#722D37] animate-pulse" />
          <span>PRORES 4444 XQ • 24.000 FPS</span>
        </div>
        <div className="text-[7.5px] sm:text-[8.5px] text-[#226192]/40">
          TC: {timecode} • 2.39:1 SCOPE
        </div>
      </div>

      {/* Top Right: Sensor & Shutter Spec */}
      <div className="absolute top-20 sm:top-24 right-6 sm:right-14 font-mono text-[8px] sm:text-[9.5px] font-bold text-[#226192]/55 tracking-wider text-right space-y-1">
        <div>ARRI LF • EI 800 • 3200K</div>
        <div className="text-[7.5px] sm:text-[8.5px] text-[#722D37]/75">
          SHUTTER: 180.0° • LOG-C
        </div>
      </div>

      {/* Bottom Left: Lens & Optics Focus */}
      <div className="hidden sm:block absolute bottom-12 left-6 sm:left-14 font-mono text-[8px] sm:text-[9px] font-bold text-[#226192]/50 tracking-wider">
        <div>OPTICS: COOKE ANAMORPHIC /i 50MM</div>
        <div className="text-[7.5px] text-[#226192]/35">T/1.4 • FOCUS: 1.8M • FLARE: GOLDEN</div>
      </div>

      {/* Bottom Right: Coordinates & Geolocation */}
      <div className="hidden sm:block absolute bottom-12 right-6 sm:right-14 font-mono text-[8px] sm:text-[9px] font-bold text-[#226192]/50 tracking-wider text-right">
        <div>GEO: 10.7867° N • 76.6548° E</div>
        <div className="text-[7.5px] text-[#226192]/35">SYS ARCH: NEXT • REACT • VITE</div>
      </div>

      {/* 4 Peripheral Framing Corner Ticks */}
      <div className="absolute top-16 left-4 sm:left-10 w-4 h-4 border-t border-l border-[#226192]/40" />
      <div className="absolute top-16 right-4 sm:right-10 w-4 h-4 border-t border-r border-[#226192]/40" />
      <div className="absolute bottom-8 left-4 sm:left-10 w-4 h-4 border-b border-l border-[#226192]/40" />
      <div className="absolute bottom-8 right-4 sm:right-10 w-4 h-4 border-b border-r border-[#226192]/40" />

      {/* =========================================================================
          LAYER 4 (OPTION 2): INTERACTIVE CONSTELLATION CANVAS
          Nodes connected by thin lines with interactive mouse attraction
          ========================================================================= */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
    </div>
  );
};

export default HeroBackground;
