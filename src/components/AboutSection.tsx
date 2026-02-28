import { useEffect, useRef, useState } from "react";
import { Code, Camera, Palette, BarChart3, Languages, GraduationCap } from "lucide-react";

const skills = [
  {
    icon: Code,
    title: "Software Development",
    description: "Full-stack development with modern frameworks and technologies",
  },
  {
    icon: Palette,
    title: "UI/UX & Product Design",
    description: "Creating intuitive interfaces and user-centered experiences",
  },
  {
    icon: Camera,
    title: "Photography & Cinematography",
    description: "Visual storytelling through creative lens work and video production",
  },
  {
    icon: BarChart3,
    title: "Business Analysis",
    description: "Data visualization with Power BI and strategic insights",
  },
];

const education = [
  {
    year: "2020",
    title: "10th Grade",
    institution: "Kendriya Vidyalaya No.1, Palakkad",
  },
  {
    year: "2022",
    title: "12th Grade",
    institution: "Kendriya Vidyalaya No.1, Palakkad",
  },
  {
    year: "2026",
    title: "B.Tech in Computer Science & Business Systems",
    institution: "JCT College of Engineering And Technology, Anna University, Chennai (Graduating)",
  },
];

const toolsWithIcons = [
  { name: "HTML", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS", icon: "https://cdn.simpleicons.org/css/1572B6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Premiere Pro", icon: "https://img.icons8.com/color/256/adobe-premiere-pro--v1.png" },
  { name: "After Effects", icon: "https://img.icons8.com/color/256/adobe-after-effects--v1.png" },
  { name: "CapCut", icon: "https://logo.clearbit.com/capcut.com" },
  { name: "Davinci Resolve", icon: "https://img.icons8.com/color/256/davinci-resolve.png" },
  { name: "Lightroom", icon: "https://img.icons8.com/color/256/adobe-lightroom--v1.png" },
  { name: "Photoshop", icon: "https://img.icons8.com/color/256/adobe-photoshop--v1.png" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Power BI", icon: "https://img.icons8.com/color/256/power-bi.png" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "VS Code", icon: "https://img.icons8.com/color/256/visual-studio-code-2019.png" },
  { name: "Cursor AI", icon: "https://cdn.simpleicons.org/cursor/808080" },
];

const languages = ["English", "Malayalam", "Tamil", "Hindi", "German"];

const AboutSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => {
              const newSet = new Set([...prev, index]);
              // Calculate progress: 0% -> 33% -> 66% -> 100%
              const progress = ((newSet.size - 1) / (education.length - 1)) * 100;
              setLineProgress(progress);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = timelineRef.current?.querySelectorAll('.timeline-item');
    items?.forEach((item) => observer.observe(item));

    return () => {
      items?.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <section id="about" className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
            About Me
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Creative <span className="text-gradient-gold">Developer</span> & Visual Artist
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            A fresher and freelancer with strong cross-domain expertise, bridging the gap between
            technology and creativity to deliver exceptional digital experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 relative">
          {/* Subtle background glow for skills */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="card-premium text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <skill.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">{skill.description}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h3 className="font-display text-2xl font-bold">Education</h3>
            </div>
            <div ref={timelineRef} className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-primary/30 overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full bg-primary timeline-progress"
                  style={{
                    height: `${lineProgress}%`,
                    transition: 'height 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>

              <div className="space-y-8">
                {education.map((edu, index) => {
                  const isVisible = visibleItems.has(index);
                  const isLastItem = index === education.length - 1;
                  return (
                    <div
                      key={index}
                      data-index={index}
                      className={`timeline-item flex gap-6 items-start pl-6 relative transition-all duration-700 ${isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-[-20px]'
                        }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute left-[3px] top-2 w-4 h-4 rounded-full z-10 transition-all duration-500 ${isLastItem
                        ? 'bg-transparent border-2 border-primary'
                        : 'bg-primary border-2 border-primary'
                        }`}>
                        {isVisible && isLastItem && (
                          <div className="absolute inset-0 bg-primary rounded-full animate-ping-slow opacity-75" />
                        )}
                      </div>

                      <span className="text-sm font-semibold text-primary min-w-[50px]">
                        {edu.year}
                      </span>
                      <div>
                        <h4 className="font-display font-semibold mb-1">{edu.title}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tools & Languages */}
          <div className="space-y-10 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none -z-10" />

            {/* Tools are now at the bottom in a marquee */}

            {/* Languages */}
            <div className="glass-panel p-8">
              <div className="flex items-center gap-3 mb-6">
                <Languages className="w-5 h-5 text-primary" />
                <h3 className="font-display text-2xl font-bold">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Technologies Scrolling Marquee */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl font-bold text-foreground">Tools & Technologies</h3>
          </div>

          <div className="w-full relative overflow-hidden flex items-center h-24 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-background after:to-transparent">
            {/* Wrapper that is exactly w-max (content size), allowing flex children to sit naturally */}
            <div className="flex w-max animate-marquee">
              {/* First Set */}
              <div className="flex shrink-0 justify-around items-center gap-16 px-8">
                {toolsWithIcons.map((tool, idx) => (
                  <div key={`${tool.name}-1-${idx}`} className="flex flex-col items-center justify-center gap-3 shrink-0 min-w-[100px] group">
                    <div className="w-14 h-14 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="w-full h-full object-contain filter drop-shadow-md bg-transparent"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random&color=fff&size=128`;
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* Second Set (identical duplicate for continuous scrolling) */}
              <div className="flex shrink-0 justify-around items-center gap-16 px-8">
                {toolsWithIcons.map((tool, idx) => (
                  <div key={`${tool.name}-2-${idx}`} className="flex flex-col items-center justify-center gap-3 shrink-0 min-w-[100px] group">
                    <div className="w-14 h-14 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="w-full h-full object-contain filter drop-shadow-md bg-transparent"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random&color=fff&size=128`;
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
