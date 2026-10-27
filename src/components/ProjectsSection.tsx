import { useState, useEffect } from "react";
import { Code, ExternalLink, Github, ArrowUpRight, Images, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

// Existing Cover Assets
import portfolioCover from "@/assets/ASportfolio-cover.png";
import bingoxCover from "@/assets/bingox-cover.jpg";
import lungvisionCover from "@/assets/lungvision-cover.png";
import instagramAiCover from "@/assets/instagram_ai_analyzer-cover.png";
import neuroGuardCover from "@/assets/NeuroGuard_AI-cover.png";
import liverDiseaseCover from "@/assets/Liver_disease-cover.png";

// New Project Assets
import lewisAiCover from "@/assets/Lewis AI Cover.png";
import godsEyeViewCover from "@/assets/Gods Eyes View Cover.png";
import bobaHireCover from "@/assets/BobaHire Cover.png";
import dimeSchoolAiVideo from "@/assets/DiMe School of AI Cover.mp4";
import dimeInnovationCover from "@/assets/DiMe innovation cover.png";

// Instagram AI Analyzer Gallery
import instaAi1 from "@/assets/Instagram AI 1.png";
import instaAi2 from "@/assets/Instagram AI 2.png";
import instaAi3 from "@/assets/Instagram AI 3.png";
import instaAi4 from "@/assets/Instagram AI 4.png";
import instaAi5 from "@/assets/Instagram AI 5.png";
import instaAi6 from "@/assets/Instagram AI 6.png";
import instaAi7 from "@/assets/Instagram AI 7.png";

// Liver Disease Prediction System Gallery
import liver1 from "@/assets/Liver 1.png";
import liver2 from "@/assets/Liver 2.png";
import liver3 from "@/assets/Liver 3.png";
import liver4 from "@/assets/Liver 4.png";
import liver5 from "@/assets/Liver 5.png";
import liver6 from "@/assets/Liver 6.png";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  video?: string;
  category: string;
  gallery?: string[];
}

const projects: Project[] = [
  {
    id: 1,
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
    title: "Lewis AI",
    description: "Lewis is a high-speed, all-in-one AI co-pilot built for creators and researchers. Powered locally to unlock 80+ top models for free.",
    technologies: ["Next.js", "AI / LLM", "TypeScript", "Tailwind CSS", "Vercel"],
    category: "Generative AI",
    liveUrl: "https://lewis-ai.vercel.app/",
    image: lewisAiCover,
  },
  {
    id: 3,
    title: "Gods Eye View",
    description: "A real-time global airspace radar and flight intelligence system featuring interactive live flight tracking, 3D/2D altitude analysis, and aircraft telemetry enrichment.",
    technologies: ["JavaScript", "Node.js", "WebSockets", "Leaflet", "Real-time Telemetry"],
    category: "Aviation & Geospatial Intelligence",
    image: godsEyeViewCover,
  },
  {
    id: 4,
    title: "BobaHire Executive",
    description: "Smart HR recruitment system streamlining executive talent acquisition with automated candidate pipeline intelligence, resume scoring, and interview tracking.",
    technologies: ["React", "TypeScript", "AI Recruitment", "Tailwind CSS", "Node.js"],
    category: "HRTech & Recruitment",
    image: bobaHireCover,
  },
  {
    id: 5,
    title: "Bingo X",
    description: "An exciting multiplayer bingo game with real-time gameplay, custom rooms, and interactive features. Built with modern web technologies for seamless cross-platform experience.",
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Vite"],
    category: "Game Development",
    githubUrl: "https://github.com/antonysojan18/BingoX",
    liveUrl: "https://bingox.vercel.app",
    image: bingoxCover,
  },
  {
    id: 6,
    title: "Instagram AI Analyzer",
    description: "A full stack deep learning and CNN project which predicts AI or Real videos on Instagram with frame-by-frame confidence analytics.",
    technologies: ["Python", "Deep Learning", "CNN", "React", "Node.js"],
    category: "AI & Computer Vision",
    githubUrl: "https://github.com/antonysojan18/Instagram_AI_Analyzer_Pro",
    image: instagramAiCover,
    gallery: [instaAi1, instaAi2, instaAi3, instaAi4, instaAi5, instaAi6, instaAi7],
  },
  {
    id: 7,
    title: "DiMe School of AI",
    description: "An interactive, video-rich learning ecosystem empowering future innovators with comprehensive Artificial Intelligence and machine learning masterclasses.",
    technologies: ["React", "EdTech", "Tailwind CSS", "Video Streaming", "Interactive UI"],
    category: "EdTech & AI Education",
    video: dimeSchoolAiVideo,
  },
  {
    id: 8,
    title: "DiMe Innovation",
    description: "A next-generation technology studio and digital innovation platform accelerating digital transformation, creative engineering, and AI-first solutions.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    category: "Innovation & Enterprise",
    image: dimeInnovationCover,
  },
  {
    id: 9,
    title: "NeuroGuard AI",
    description: "A full stack web application built on HTML/CSS for the early prediction and risk assessment of Parkinson's disease.",
    technologies: ["HTML", "CSS", "Python", "Machine Learning"],
    category: "HealthTech AI",
    githubUrl: "https://github.com/antonysojan18/NeuroGuard_AI",
    image: neuroGuardCover,
  },
  {
    id: 10,
    title: "Liver Disease Prediction System",
    description: "A full stack web development project of prediction and also with the doctors booking system.",
    technologies: ["React", "Python", "Machine Learning", "Node.js"],
    category: "HealthTech AI",
    githubUrl: "https://github.com/antonysojan18/LiverGuard_AI",
    image: liverDiseaseCover,
    gallery: [liver1, liver2, liver3, liver4, liver5, liver6],
  },
  {
    id: 11,
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing creative work with smooth animations and modern design.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    category: "Web Development",
    githubUrl: "https://github.com/antonysojan18/AntonySojan",
    liveUrl: "https://www.antonysojan.space",
    image: portfolioCover,
  },
];

const ProjectsSection = () => {
  const [activeGallery, setActiveGallery] = useState<{
    title: string;
    images: string[];
  } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Keyboard navigation for gallery modal
  useEffect(() => {
    if (!activeGallery) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? activeGallery.images.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === activeGallery.images.length - 1 ? 0 : prev + 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGallery]);

  return (
    <section id="projects" className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[#226192] uppercase tracking-widest mb-2 sm:mb-3">
            My Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Featured <span className="text-gradient-gold">Projects</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            A collection of my software development projects, showcasing technical skills and creative problem-solving.
          </p>
        </div>

        {/* Projects Grid (Scroll Stack) */}
        <div className="max-w-3xl mx-auto">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={40}
            itemStackDistance={18}
            baseScale={0.85}
            itemScale={0.03}
          >
            {projects.map((project) => (
              <ScrollStackItem
                key={project.id}
                itemClassName="!h-auto !p-0 !bg-transparent !shadow-none !border-none !rounded-none"
              >
                <div className="group relative bg-[#226192] text-[#EAE6DE] rounded-2xl sm:rounded-3xl !p-0 w-full border border-white/20 hover:border-white/40 hover:shadow-[0_20px_48px_rgba(24,74,113,0.45)] transition-all duration-700 overflow-hidden">
                  {/* Cover Media (Video or Image) */}
                  {project.video ? (
                    <div className="relative w-full h-48 sm:h-60 md:h-80 overflow-hidden rounded-t-[calc(1rem-1px)] sm:rounded-t-[calc(1.5rem-1px)] bg-black/40">
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#226192] via-[#226192]/20 to-transparent pointer-events-none" />
                    </div>
                  ) : project.image ? (
                    <div className="relative w-full h-40 sm:h-48 md:h-64 overflow-hidden rounded-t-[calc(1rem-1px)] sm:rounded-t-[calc(1.5rem-1px)]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#226192] via-[#226192]/30 to-transparent" />
                    </div>
                  ) : null}

                  <div className="p-4 sm:p-6 md:p-8 -mt-5 sm:-mt-8 relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-[11px] sm:text-xs font-bold text-[#FAF8F5] uppercase tracking-wider sm:tracking-widest bg-white/15 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/25">
                        {project.category}
                      </span>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-500 shadow-soft">
                        <Code className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF8F5] group-hover:text-[#226192] transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 text-[#FAF8F5] transition-colors duration-300">
                      {project.title}
                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 text-[#FAF8F5]" />
                    </h3>

                    {/* Description */}
                    <p className="text-[#EAE6DE]/85 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/15 border border-white/20 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide text-[#FAF8F5] shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links & Gallery Button */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white/10 border border-white/25 rounded-xl text-xs sm:text-sm font-semibold text-[#FAF8F5] hover:bg-white hover:text-[#226192] active:scale-95 transition-all duration-300"
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
                          className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-[#FAF8F5] text-[#226192] rounded-xl text-xs sm:text-sm font-bold hover:bg-white hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all duration-300"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                      {project.gallery && project.gallery.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveGallery({
                              title: project.title,
                              images: project.gallery!,
                            });
                            setCurrentImageIndex(0);
                          }}
                          className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white/20 border border-white/35 rounded-xl text-xs sm:text-sm font-bold text-[#FAF8F5] hover:bg-white hover:text-[#226192] hover:shadow-md active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                          <Images size={16} />
                          Gallery ({project.gallery.length})
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Call to Action */}
        <div className="mt-8 sm:mt-10 text-center px-4">
          <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
            Want to see more projects or collaborate on something?
          </p>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#226192] text-[#FAF8F5] rounded-full font-medium hover:shadow-editorial hover:bg-[#184A71] hover:scale-[1.02] active:scale-95 transition-all duration-300 text-sm sm:text-base"
          >
            Get In Touch
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Interactive Project Screenshots Gallery Modal */}
      <Dialog
        open={!!activeGallery}
        onOpenChange={(open) => {
          if (!open) setActiveGallery(null);
        }}
      >
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-[#171D3B]/95 text-[#FAF8F5] border border-white/20 backdrop-blur-2xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          {activeGallery && (
            <div className="flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2.5">
                  <Images className="w-5 h-5 text-[#EF8557]" />
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#FAF8F5]">
                    {activeGallery.title}
                  </h4>
                  <span className="text-xs font-mono font-bold text-[#EAE6DE]/85 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                    {currentImageIndex + 1} / {activeGallery.images.length}
                  </span>
                </div>
              </div>

              {/* Main Image Viewport with Next/Prev Controls */}
              <div className="relative flex-1 min-h-[260px] sm:min-h-[420px] max-h-[62vh] flex items-center justify-center bg-black/50 p-2 sm:p-5 group select-none">
                <img
                  src={activeGallery.images[currentImageIndex]}
                  alt={`${activeGallery.title} screenshot ${currentImageIndex + 1}`}
                  className="max-h-[56vh] max-w-full w-auto object-contain rounded-xl shadow-2xl transition-all duration-300"
                />

                {/* Prev Chevron */}
                {activeGallery.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? activeGallery.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#226192] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* Next Chevron */}
                {activeGallery.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === activeGallery.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#226192] text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>

              {/* Thumbnail Strip */}
              <div className="p-3 sm:p-4 bg-white/5 border-t border-white/10 flex items-center gap-2 sm:gap-3 overflow-x-auto">
                {activeGallery.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      currentImageIndex === idx
                        ? "border-[#722D37] scale-105 shadow-[0_0_14px_rgba(114,45,55,0.65)]"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
