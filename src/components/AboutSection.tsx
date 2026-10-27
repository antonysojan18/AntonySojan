import { useEffect, useRef, useState } from "react";
import { Code, Camera, Palette, BarChart3, Languages, GraduationCap } from "lucide-react";
import ToolsOrbitalDeck from "./ToolsOrbitalDeck";
import TiltCard from "./TiltCard";

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
    institution: "JCT College of Engineering And Technology, Anna University, Chennai",
  },
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
    <section
      id="about"
      className="relative pt-10 pb-12 md:pt-14 md:pb-16 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[#226192] uppercase tracking-widest mb-2 sm:mb-3">
            About Me
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Creative <span className="text-gradient-gold">Developer</span> & Visual Artist
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Antony Sojan is a developer and visual artist with strong cross-domain expertise, bridging the gap between
            technology and creativity to deliver exceptional digital experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 mb-12 relative">
          {/* Subtle background glow for skills */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-[#226192]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

          {skills.map((skill, index) => (
            <TiltCard
              key={skill.title}
              maxTilt={9}
              className="h-full"
            >
              <div
                className="card-premium p-3 sm:p-5 md:p-8 text-center flex flex-col items-center justify-start h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-4 rounded-xl sm:rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                  <skill.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#FAF8F5]" />
                </div>
                <h3 className="font-display text-xs xs:text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 text-[#FAF8F5] leading-snug">
                  {skill.title}
                </h3>
                <p className="text-[10px] xs:text-[11px] sm:text-sm text-[#EAE6DE]/85 leading-snug sm:leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-6 h-6 text-[#226192]" />
              <h3 className="font-display text-2xl font-bold text-[#226192]">Education</h3>
            </div>
            <div ref={timelineRef} className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-[#226192]/30 overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full bg-[#226192] timeline-progress"
                  style={{
                    height: `${lineProgress}%`,
                    transition: 'height 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>

              <div className="space-y-6 sm:space-y-8">
                {education.map((edu, index) => {
                  const isVisible = visibleItems.has(index);
                  const isLastItem = index === education.length - 1;
                  return (
                    <div
                      key={index}
                      data-index={index}
                      className={`timeline-item flex gap-3.5 sm:gap-6 items-start pl-5 sm:pl-6 relative transition-all duration-700 ${isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-[-20px]'
                        }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute left-[3px] top-2 w-4 h-4 rounded-full z-10 transition-all duration-500 ${isLastItem
                        ? 'bg-transparent border-2 border-[#226192]'
                        : 'bg-[#226192] border-2 border-[#226192]'
                        }`}>
                        {isVisible && isLastItem && (
                          <div className="absolute inset-0 bg-[#226192] rounded-full animate-ping-slow opacity-75" />
                        )}
                      </div>

                      <div className="flex-1 py-0.5 sm:py-1">
                        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-1">
                          <h4 className="font-display font-bold text-base sm:text-lg md:text-xl text-[#226192]">{edu.title}</h4>
                          <span className="text-[11px] sm:text-xs font-bold text-[#226192] bg-[#226192]/10 border border-[#226192]/25 px-2.5 py-0.5 rounded-full">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base font-medium text-[#226192]/80 leading-relaxed">{edu.institution}</p>
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
            <div className="glass-panel p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Languages className="w-5 h-5 text-[#FAF8F5]" />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FAF8F5]">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white/15 rounded-full text-xs sm:text-sm font-semibold text-[#FAF8F5] border border-white/20"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 3D Orbital Console (Dev Terminal × Cinema Bay) */}
        <ToolsOrbitalDeck />
      </div>
    </section>
  );
};

export default AboutSection;
