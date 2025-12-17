import { Code, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import portfolioCover from "@/assets/portfolio-cover.jpg";
import bingoxCover from "@/assets/bingox-cover.jpg";

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
    id: 2,
    title: "Bingo X",
    description: "An exciting multiplayer bingo game with real-time gameplay, custom rooms, and interactive features. Built with modern web technologies for seamless cross-platform experience.",
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Vite"],
    category: "Game Development",
    githubUrl: "https://github.com/antonysojan18/BingoX",
    liveUrl: "https://bingox.vercel.app/lobby",
    image: bingoxCover,
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
    <section id="projects" className="section-padding bg-background">
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-card rounded-3xl border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-card overflow-hidden"
            >
              {/* Cover Image */}
              {project.image && (
                <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-t-3xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                </div>
              )}
              
              <div className="p-6 -mt-4">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {project.category}
                </span>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Code className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl font-bold mb-2 flex items-center gap-3">
                {project.title}
                <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:shadow-gold hover:scale-[1.02] transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
              </div>
            </div>
          ))}
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

