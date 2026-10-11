import React from "react";

const ArchitecturalBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none rounded-t-[32px] sm:rounded-t-[48px] overflow-hidden select-none"
    >
      {/* 1. Base Paper Gradient & Warm Ivory Ambient Depth with Deep Burgundy (#722D37) undertones */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 40% at 50% 0%, rgba(255, 255, 255, 0.65) 0%, transparent 70%),
            radial-gradient(ellipse 60% 45% at 90% 30%, rgba(34, 97, 146, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 45% at 10% 65%, rgba(114, 45, 55, 0.038) 0%, transparent 60%),
            radial-gradient(ellipse 70% 45% at 85% 85%, rgba(114, 45, 55, 0.03) 0%, transparent 65%),
            radial-gradient(ellipse 80% 50% at 50% 95%, rgba(34, 97, 146, 0.035) 0%, transparent 70%)
          `,
        }}
      />

      {/* 2. Tactile Cold-Press Architectural Paper Fiber Noise */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* 3. SVG Architectural Drafting Grid (48px Module + 144px Structural Crosshairs + 45° Section Hatch) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-90"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Subtle 45-degree Architectural Section Hatch */}
          <pattern
            id="archHatch"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M -6 30 L 30 -6"
              stroke="rgba(34, 97, 146, 0.022)"
              strokeWidth="0.75"
            />
          </pattern>

          {/* 48px Fine Orthographic Drafting Grid */}
          <pattern
            id="archGrid48"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            {/* Grid Line: Top & Left */}
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="rgba(34, 97, 146, 0.045)"
              strokeWidth="0.75"
            />
            {/* Center Micro Drafting Dot */}
            <circle
              cx="24"
              cy="24"
              r="0.8"
              fill="rgba(34, 97, 146, 0.09)"
            />
          </pattern>

          {/* 144px Major Structural Module with Precision Crosshairs */}
          <pattern
            id="archStructural144"
            width="144"
            height="144"
            patternUnits="userSpaceOnUse"
          >
            {/* Major guideline */}
            <path
              d="M 144 0 L 0 0 0 144"
              fill="none"
              stroke="rgba(34, 97, 146, 0.08)"
              strokeWidth="1"
            />
            {/* Precision Crosshair at (0,0) */}
            <path
              d="M -7 0 L 7 0 M 0 -7 L 0 7"
              stroke="rgba(34, 97, 146, 0.22)"
              strokeWidth="1.2"
            />
            {/* Corner registration tick mark at (144, 144) in Deep Burgundy (#722D37) */}
            <path
              d="M 137 144 L 144 144 144 137"
              fill="none"
              stroke="rgba(114, 45, 55, 0.28)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Layer 1: Hatching wash */}
        <rect width="100%" height="100%" fill="url(#archHatch)" />

        {/* Layer 2: 48px Fine Grid */}
        <rect width="100%" height="100%" fill="url(#archGrid48)" />

        {/* Layer 3: 144px Structural Crosshairs */}
        <rect width="100%" height="100%" fill="url(#archStructural144)" />
      </svg>

      {/* 4. Left Architectural Scale Ruler & Datum Line (Desktop / Tablet) */}
      <div className="hidden lg:block absolute left-3 xl:left-6 top-8 bottom-8 w-12 pointer-events-none opacity-45">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leftRulerTicks" width="48" height="96" patternUnits="userSpaceOnUse">
              {/* Vertical guideline */}
              <line x1="8" y1="0" x2="8" y2="96" stroke="rgba(34, 97, 146, 0.25)" strokeWidth="1" />
              {/* Major tick */}
              <line x1="8" y1="0" x2="18" y2="0" stroke="rgba(34, 97, 146, 0.45)" strokeWidth="1.2" />
              {/* Minor ticks */}
              <line x1="8" y1="24" x2="13" y2="24" stroke="rgba(34, 97, 146, 0.25)" strokeWidth="0.8" />
              <line x1="8" y1="48" x2="15" y2="48" stroke="rgba(114, 45, 55, 0.45)" strokeWidth="1.2" />
              <line x1="8" y1="72" x2="13" y2="72" stroke="rgba(34, 97, 146, 0.25)" strokeWidth="0.8" />
              {/* Small metric indicator */}
              <text x="21" y="5" fill="rgba(34, 97, 146, 0.35)" fontSize="7" fontFamily="monospace">|</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leftRulerTicks)" />
        </svg>
      </div>

      {/* 5. Right Architectural Scale Ruler & Technical Blueprint Metadata */}
      <div className="hidden lg:block absolute right-3 xl:right-6 top-8 bottom-8 w-24 pointer-events-none opacity-45">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rightRulerTicks" width="96" height="96" patternUnits="userSpaceOnUse">
              {/* Vertical guideline */}
              <line x1="72" y1="0" x2="72" y2="96" stroke="rgba(34, 97, 146, 0.25)" strokeWidth="1" />
              {/* Major tick */}
              <line x1="62" y1="0" x2="72" y2="0" stroke="rgba(34, 97, 146, 0.45)" strokeWidth="1.2" />
              {/* Minor ticks */}
              <line x1="67" y1="24" x2="72" y2="24" stroke="rgba(34, 97, 146, 0.25)" strokeWidth="0.8" />
              <line x1="65" y1="48" x2="72" y2="48" stroke="rgba(114, 45, 55, 0.45)" strokeWidth="1.2" />
              <line x1="67" y1="72" x2="72" y2="72" stroke="rgba(34, 97, 146, 0.25)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rightRulerTicks)" />
        </svg>

        {/* Technical drafting metadata stamp pinned near top */}
        <div className="absolute top-10 right-4 text-[8px] font-mono tracking-wider text-right text-[#226192]/60 space-y-1 select-none">
          <div>[ SCALE 1:100 ]</div>
          <div className="text-[#722D37]/80 font-bold">[ BURGUNDY_351 ]</div>
          <div>DATUM: WARM_IVORY</div>
          <div>REF: ANTONY_SOJAN</div>
          <div className="text-[7px]">10.7867° N / 76.6548° E</div>
        </div>
      </div>

      {/* 6. Precision Architectural Corner Registration Marks */}
      <div className="absolute top-6 left-6 text-xs font-mono text-[#722D37]/45 select-none">
        ┌
      </div>
      <div className="absolute top-6 right-6 text-xs font-mono text-[#722D37]/45 select-none">
        ┐
      </div>
    </div>
  );
};

export default ArchitecturalBackground;
