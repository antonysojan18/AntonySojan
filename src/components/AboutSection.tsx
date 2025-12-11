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

const tools = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "Premiere Pro",
  "After Effects",
  "CapCut",
  "Davinci Resolve",
  "Lightroom",
  "Photoshop",
  "Figma",
  "Power BI",
  "React",
  "VS Code",
  "Cursor AI",
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
    <section id="about" className="section-padding bg-cream-dark">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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
                      className={`timeline-item flex gap-6 items-start pl-6 relative transition-all duration-700 ${
                        isVisible 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-[-20px]'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute left-[3px] top-2 w-4 h-4 rounded-full z-10 transition-all duration-500 ${
                        isLastItem 
                          ? 'bg-background border-2 border-primary' 
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
          <div className="space-y-10">
            {/* Tools */}
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-background rounded-full text-sm font-medium border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
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
      </div>
    </section>
  );
};

export default AboutSection;
