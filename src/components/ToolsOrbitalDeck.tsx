

interface ToolItem {
  name: string;
  icon: string;
  category: "dev" | "cinema";
  domain: string;
  tag: string;
  color: string;
}

const DEV_TOOLS: ToolItem[] = [
  {
    name: "React",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
    category: "dev",
    domain: "Frontend",
    tag: "UI Architecture",
    color: "#61DAFB",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
    category: "dev",
    domain: "Core Logic",
    tag: "Modern ES6+",
    color: "#F7DF1E",
  },
  {
    name: "Python",
    icon: "https://cdn.simpleicons.org/python/3776AB",
    category: "dev",
    domain: "Data & ML",
    tag: "Backend & Scripts",
    color: "#3776AB",
  },
  {
    name: "HTML5",
    icon: "https://cdn.simpleicons.org/html5/E34F26",
    category: "dev",
    domain: "Markup",
    tag: "Semantic Canvas",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    icon: "https://cdn.simpleicons.org/css/1572B6",
    category: "dev",
    domain: "Styling",
    tag: "3D Animations",
    color: "#1572B6",
  },
  {
    name: "VS Code",
    icon: "https://img.icons8.com/color/256/visual-studio-code-2019.png",
    category: "dev",
    domain: "Editor",
    tag: "Development IDE",
    color: "#007ACC",
  },
  {
    name: "Cursor AI",
    icon: "https://cdn.simpleicons.org/cursor/808080",
    category: "dev",
    domain: "AI Pair",
    tag: "Agentic Workflow",
    color: "#EF8557",
  },
  {
    name: "Power BI",
    icon: "https://img.icons8.com/color/256/power-bi.png",
    category: "dev",
    domain: "Analytics",
    tag: "Business Insights",
    color: "#F2C811",
  },
];

const CINEMA_TOOLS: ToolItem[] = [
  {
    name: "DaVinci Resolve",
    icon: "https://img.icons8.com/color/256/davinci-resolve.png",
    category: "cinema",
    domain: "Color Grading",
    tag: "Nodes & Color Science",
    color: "#EF8557",
  },
  {
    name: "Premiere Pro",
    icon: "https://img.icons8.com/color/256/adobe-premiere-pro--v1.png",
    category: "cinema",
    domain: "Video Edit",
    tag: "Narrative Cuts",
    color: "#9999FF",
  },
  {
    name: "Lightroom",
    icon: "https://img.icons8.com/color/256/adobe-lightroom--v1.png",
    category: "cinema",
    domain: "Photo Lab",
    tag: "RAW Color Mastering",
    color: "#31A8FF",
  },
  {
    name: "After Effects",
    icon: "https://img.icons8.com/color/256/adobe-after-effects--v1.png",
    category: "cinema",
    domain: "Motion VFX",
    tag: "Visual FX & 3D",
    color: "#9999FF",
  },
  {
    name: "Photoshop",
    icon: "https://img.icons8.com/color/256/adobe-photoshop--v1.png",
    category: "cinema",
    domain: "Compositing",
    tag: "Retouching & Posters",
    color: "#31A8FF",
  },
  {
    name: "Figma",
    icon: "https://cdn.simpleicons.org/figma/F24E1E",
    category: "cinema",
    domain: "Product Design",
    tag: "UI/UX Systems",
    color: "#F24E1E",
  },
  {
    name: "CapCut",
    icon: "https://logo.clearbit.com/capcut.com",
    category: "cinema",
    domain: "Fast Form",
    tag: "Social Visuals",
    color: "#000000",
  },
];

const ToolCapsule = ({ tool }: { tool: ToolItem }) => {
  return (
    <div className="group/pill relative flex items-center gap-2.5 sm:gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/70 hover:bg-white/95 backdrop-blur-xl border border-white/80 hover:border-[#226192]/40 shadow-[0_4px_16px_rgba(34,97,146,0.06)] hover:shadow-[0_10px_28px_rgba(34,97,146,0.18)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0">
      {/* Icon with subtle halo */}
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/80 flex items-center justify-center p-1.5 shadow-sm border border-black/5 shrink-0 transition-transform duration-300 group-hover/pill:rotate-6">
        <div
          className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover/pill:opacity-50 transition-opacity"
          style={{ backgroundColor: tool.color }}
        />
        <img
          src={tool.icon}
          alt={tool.name}
          className="w-full h-full object-contain relative z-10 filter drop-shadow-sm"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=226192&color=fff&size=128`;
          }}
        />
      </div>

      {/* Label and Domain */}
      <div className="flex flex-col text-left whitespace-nowrap pr-1">
        <span className="font-display font-bold text-xs sm:text-sm text-[#226192] group-hover/pill:text-[#722D37] transition-colors">
          {tool.name}
        </span>
        <span className="text-[9.5px] sm:text-[11px] font-medium text-muted-foreground group-hover/pill:text-foreground transition-colors">
          {tool.tag}
        </span>
      </div>
    </div>
  );
};

const ToolsOrbitalDeck = () => {
  return (
    <div className="w-full mt-8 sm:mt-10 relative">
      {/* Space-Saving Centered Section Header (No Star Logo, No Filter Pills) */}
      <div className="text-center mb-3 sm:mb-4 px-2">
        <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-[#226192]">
          Tools &amp; <span className="text-gradient-gold">Technologies</span>
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Continuous interactive stream • Touch or hover to pause &amp; inspect
        </p>
      </div>

      {/* Dual Counter-Flowing Compact Ribbon (Space Saver with Edge Fade Masks) */}
      <div className="relative w-full overflow-hidden py-2 space-y-3 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        {/* Track 1: Dev Stack (Glides Left) */}
        <div className="w-full overflow-hidden group/marquee1 flex items-center">
          <div className="flex w-max animate-marquee group-hover/marquee1:[animation-play-state:paused] gap-4 py-1">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-4">
              {DEV_TOOLS.map((tool) => (
                <ToolCapsule key={`t1-1-${tool.name}`} tool={tool} />
              ))}
            </div>
            {/* Duplicate Set for Seamless Infinite Stream */}
            <div className="flex shrink-0 items-center gap-4" aria-hidden="true">
              {DEV_TOOLS.map((tool) => (
                <ToolCapsule key={`t1-2-${tool.name}`} tool={tool} />
              ))}
            </div>
          </div>
        </div>

        {/* Track 2: Cinema & Design Stack (Glides Right in Reverse) */}
        <div className="w-full overflow-hidden group/marquee2 flex items-center">
          <div className="flex w-max animate-marquee-reverse group-hover/marquee2:[animation-play-state:paused] gap-4 py-1">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-4">
              {CINEMA_TOOLS.map((tool) => (
                <ToolCapsule key={`t2-1-${tool.name}`} tool={tool} />
              ))}
            </div>
            {/* Duplicate Set for Seamless Infinite Stream */}
            <div className="flex shrink-0 items-center gap-4" aria-hidden="true">
              {CINEMA_TOOLS.map((tool) => (
                <ToolCapsule key={`t2-2-${tool.name}`} tool={tool} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsOrbitalDeck;
