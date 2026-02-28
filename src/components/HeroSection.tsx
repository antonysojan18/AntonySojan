import { ArrowRight, Circle } from "lucide-react";
import antonyProfile from "@/assets/antony-profile.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 section-padding overflow-hidden"
    >
      {/* Background gradient (made transparent to show Prism) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent pointer-events-none" />

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
              <span className="font-body text-lg md:text-xl font-semibold tracking-wide uppercase text-foreground transition-colors duration-300">
                Software Developer
              </span>
              <Circle size={8} className="fill-primary text-primary transition-colors duration-300" />
              <span className="font-body text-lg md:text-xl font-semibold tracking-wide uppercase text-foreground transition-colors duration-300">
                Cinematographer
              </span>
              <Circle size={8} className="fill-primary text-primary transition-colors duration-300" />
              <span className="font-body text-lg md:text-xl font-semibold tracking-wide uppercase text-foreground transition-colors duration-300">
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
            <div className="relative group">
              {/* Decorative circle glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-gold-light/40 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

              {/* Additional backdrop rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full border border-primary/10 animate-[spin_15s_linear_infinite_reverse]" />

              {/* Image container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.15)] ring-1 ring-white/10 group-hover:ring-primary/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent z-10" />
                <img
                  src={antonyProfile}
                  alt="Antony Sojan - Software Developer and Creative Professional"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* Stats badges below image */}
            <div className="flex gap-4 mt-8 relative z-20">
              <div className="glass-panel rounded-2xl p-5 animate-float hover:border-primary/50 transition-colors">
                <p className="font-display text-4xl font-bold text-gradient-gold">5+</p>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase mt-1">Skills Mastered</p>
              </div>

              <div className="glass-panel rounded-2xl p-5 animate-float hover:border-primary/50 transition-colors" style={{ animationDelay: "1s" }}>
                <p className="font-display text-4xl font-bold text-gradient-gold">20+</p>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase mt-1">Projects Built</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
