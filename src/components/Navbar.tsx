import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Certificates", href: "#certificates" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between px-6 rounded-full border transition-all duration-500 w-full max-w-4xl mx-auto ${isScrolled
            ? "bg-background/80 backdrop-blur-xl border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2"
            : "bg-background/40 backdrop-blur-md border-white/10 shadow-soft py-4"
          }`}
      >
        {/* Logo */}
        <a href="#home" className="font-display text-xl md:text-2xl font-semibold tracking-tight shrink-0">
          Antony<span className="text-primary">.</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-8 mx-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="font-body text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <a
            href="#contact"
            className="btn-gold text-sm py-2 px-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Contact
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden absolute top-24 left-4 right-4 bg-background/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl transition-all duration-300 pointer-events-auto origin-top ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
          }`}
      >
        <ul className="flex flex-col py-4 px-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 font-body font-medium text-foreground/90 hover:text-primary transition-colors border-b border-border/50 last:border-0"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="mt-4 pb-2 text-center">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="btn-gold inline-block w-full text-sm py-3"
            >
              Contact Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
