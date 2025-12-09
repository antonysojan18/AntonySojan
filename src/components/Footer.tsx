import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 md:px-12 lg:px-20 bg-cream-dark border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <a href="#home" className="font-display text-xl font-semibold tracking-tight">
          Antony<span className="text-primary">.</span>
        </a>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          © {currentYear} Antony Sojan. Made with{" "}
          <Heart size={14} className="text-primary fill-primary" /> in India
        </p>

        {/* Quick Links */}
        <div className="flex items-center gap-6">
          <a
            href="#about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#portfolio"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
