import { ArrowRight, Circle } from "lucide-react";
import antonyProfile from "@/assets/antony-profile.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 section-padding overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-background to-cream-dark pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 mb-8 animate-fade-up">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                Available for new opportunities
              </span>
            </div>

            {/* Greeting */}
            <p className="font-display text-2xl md:text-3xl italic text-muted-foreground mb-4 animate-fade-up delay-100">
              Hey, there
            </p>

            {/* Name */}
            <h1 className="font-display font-bold tracking-tight mb-6 animate-fade-up delay-200">
              <span className="text-3xl md:text-4xl lg:text-5xl">I AM</span><br />
              <span className="text-gradient-gold text-4xl md:text-6xl lg:text-7xl">ANTONY SOJAN</span>
            </h1>

            {/* Title */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6 animate-fade-up delay-300">
              <span className="font-body text-lg md:text-xl font-semibold tracking-wide uppercase">
                Software Developer
              </span>
              <Circle size={8} className="fill-primary text-primary" />
              <span className="font-body text-lg md:text-xl font-semibold tracking-wide uppercase">
                Cinematographer
              </span>
              <Circle size={8} className="fill-primary text-primary" />
              <span className="font-body text-lg md:text-xl font-semibold tracking-wide uppercase">
                Designer
              </span>
            </div>

            {/* Sub-bio */}
            <p className="font-body text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 animate-fade-up delay-400">
              A Bachelor of technology Student who turns software development, 
              product design, and visual storytelling into impactful experiences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-fade-up delay-500">
              <a href="#portfolio" className="btn-gold group">
                View Portfolio
                <ArrowRight size={18} className="inline ml-2 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="/Antony_Sojan_CV.pdf" 
                download="Antony_Sojan_Resume.pdf"
                className="btn-outline-dark"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end animate-scale-in">
            <div className="relative">
              {/* Decorative circle */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-gold-light/30 rounded-full blur-3xl" />
              
              {/* Image container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-card">
                <img
                  src={antonyProfile}
                  alt="Antony Sojan - Software Developer and Creative Professional"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Stats badges below image */}
            <div className="flex gap-4 mt-6">
              <div className="bg-background rounded-xl shadow-card p-4 animate-float">
                <p className="font-display text-3xl font-bold text-primary">5+</p>
                <p className="text-xs text-muted-foreground">Skills Mastered</p>
              </div>

              <div className="bg-background rounded-xl shadow-card p-4 animate-float" style={{ animationDelay: "1s" }}>
                <p className="font-display text-3xl font-bold text-primary">20+</p>
                <p className="text-xs text-muted-foreground">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
