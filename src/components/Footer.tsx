import { Heart, ArrowUp, Github, Linkedin, Instagram, Mail } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/antonysojan18",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/antonysojan",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/antonysojan18",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:antonysojan18@gmail.com",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#226192] text-[#FAF8F5] border-t border-white/20 shadow-[0_-10px_32px_rgba(24,74,113,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] overflow-hidden">
      {/* Subtle architectural background grid & glow inside footer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2) 0%, transparent 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-6 sm:pt-8 pb-4 sm:pb-5">
        {/* Main Footer Row - Compact alignment */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 pb-5 sm:pb-6 border-b border-white/15">
          {/* Brand Logo */}
          <div className="flex items-center">
            <a
              href="#home"
              className="font-space text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF8F5] inline-flex items-center group"
            >
              Antony
              <span className="text-[#722D37] group-hover:scale-125 transition-transform inline-block">.</span>
            </a>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col items-center">
            <h4 className="font-space text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FAF8F5]/60 mb-2">
              Navigation
            </h4>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-[#FAF8F5]/85 hover:text-[#FAF8F5] inline-flex items-center gap-0.5 hover:underline underline-offset-4 transition-colors"
                  >
                    <span className="text-[#722D37] text-[10px]">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Back To Top */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-space text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#FAF8F5]/60 mb-2">
              Connect With Me
            </h4>
            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#FAF8F5] hover:bg-white hover:text-[#226192] hover:scale-110 active:scale-95 transition-all duration-200 shadow-sm"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-[#226192] border border-white/20 text-[#FAF8F5] text-[11px] font-bold transition-all duration-200 group shadow-sm active:scale-95 ml-1"
              >
                <span>Top</span>
                <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location Telemetry - Tight padding */}
        <div className="pt-3.5 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-[11px] sm:text-xs text-[#FAF8F5]/70">
          <p className="flex items-center justify-center gap-1.5">
            © {currentYear} Antony Sojan. Made with{" "}
            <Heart size={13} className="text-[#722D37] fill-[#722D37] inline animate-pulse" /> in India.
          </p>

          <p className="font-mono text-[10.5px] text-[#FAF8F5]/55 tracking-wider">
            [ 10.7867° N • 76.6548° E // PALAKKAD ]
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
