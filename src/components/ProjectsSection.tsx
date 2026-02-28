import { Code, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import portfolioCover from "@/assets/portfolio-cover.jpg";
import bingoxCover from "@/assets/bingox-cover.jpg";
import lungvisionCover from "@/assets/lungvision-cover.png";
import instagramAiCover from "@/assets/instagram_ai_analyzer-cover.png";
import neuroGuardCover from "@/assets/NeuroGuard_AI-cover.png";
import liverDiseaseCover from "@/assets/Liver_disease-cover.png";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 3,
    title: "LungVision AI",
    description: "A Full Stack early lung cancer prediction system with real-time doctor booking platform.",
    technologies: ["React", "Python", "Machine Learning", "Node.js"],
    category: "HealthTech AI",
    githubUrl: "https://github.com/antonysojan18/LungVision",
    liveUrl: "https://lungvision.vercel.app",
    image: lungvisionCover,
  },
  {
    id: 2,
    title: "Bingo X",
    description: "An exciting multiplayer bingo game with real-time gameplay, custom rooms, and interactive features. Built with modern web technologies for seamless cross-platform experience.",
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Vite"],
    category: "Game Development",
    githubUrl: "https://github.com/antonysojan18/BingoX",
    liveUrl: "https://bingox.vercel.app",
    image: bingoxCover,
  },
  {
    id: 4,
    title: "Instagram AI Analyzer",
    description: "A full stack deep learning and CNN project which predicts AI or Real videos in Instagram.",
    technologies: ["Python", "Deep Learning", "CNN", "React", "Node.js"],
    category: "AI & Computer Vision",
    githubUrl: "https://github.com/antonysojan18/Instagram_AI_Analyzer_Pro",
    image: instagramAiCover,
  },
  {
    id: 5,
    title: "NeuroGuard AI",
    description: "A full stack web application built on HTML/CSS for the prediction of Parkinson's disease.",
    technologies: ["HTML", "CSS", "Python", "Machine Learning"],
    category: "HealthTech AI",
    githubUrl: "https://github.com/antonysojan18/NeuroGuard_AI",
    image: neuroGuardCover,
  },
  {
    id: 6,
    title: "Liver Disease Prediction System",
    description: "A full stack web development project of prediction and also with the doctors booking system.",
    technologies: ["React", "Python", "Machine Learning", "Node.js"],
    category: "HealthTech AI",
    githubUrl: "https://github.com/antonysojan18/LiverGuard_AI",
    image: liverDiseaseCover,
  },
  {
    id: 1,
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing creative work with smooth animations and modern design.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    category: "Web Development",
    githubUrl: "https://github.com/antonysojan18/AntonySojan",
    liveUrl: "https://antonysojan.vercel.app/",
    image: portfolioCover,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
            My Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            A collection of my software development projects, showcasing technical skills and creative problem-solving.
          </p>
        </div>

        {/* Projects Grid (Scroll Stack) */}
        <div className="max-w-3xl mx-auto">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={40}
            itemStackDistance={30}
            baseScale={0.85}
            itemScale={0.03}
          >
            {projects.map((project) => (
              <ScrollStackItem
                key={project.id}
                itemClassName="!h-auto !p-0 !bg-transparent !shadow-none !border-none !rounded-none mb-6"
              >
                <div className="group relative glass-panel !bg-card/20 !p-0 w-full ring-1 ring-white/5 hover:ring-primary/40 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] transition-all duration-700">
                  {/* Cover Image */}
                  {project.image && (
                    <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-t-[calc(1.5rem-1px)]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    </div>
                  )}

                  <div className="p-8 -mt-8 relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                        {project.category}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors duration-500 shadow-soft">
                        <Code className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 flex items-center gap-3 text-foreground group-hover:text-gradient-gold transition-colors duration-300">
                      {project.title}
                      <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-background/50 border border-white/5 rounded-full text-xs font-semibold tracking-wide text-foreground shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-background/50 border border-white/10 rounded-xl text-sm font-semibold hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-gold transition-all duration-300"
                        >
                          <Github size={18} />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:scale-[1.03] transition-all duration-300"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Want to see more projects or collaborate on something?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-gold hover:scale-[1.02] transition-all duration-300"
          >
            Get In Touch
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

