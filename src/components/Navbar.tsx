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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-4 px-4 transition-all duration-300 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between pl-4 md:pl-5 pr-5 md:pr-6 rounded-full border transition-all duration-500 w-full max-w-[630px] mx-auto bg-[#226192] border-white/25 shadow-[0_10px_32px_rgba(24,74,113,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-md ${isScrolled
            ? "py-2 shadow-[0_14px_40px_rgba(24,74,113,0.45),inset_0_1px_1px_rgba(255,255,255,0.45)] border-white/30"
            : "py-2.5 md:py-2.5"
          }`}
      >
        {/* Logo - Warm Ivory text with Deep Burgundy dot */}
        <a href="#home" className="font-space text-xl md:text-2xl font-bold tracking-tight shrink-0 text-[#FAF8F5] flex items-center group">
          Antony<span className="text-[#722D37] group-hover:scale-125 transition-transform inline-block">.</span>
        </a>

        {/* Desktop Navigation - Warm Ivory text with subtle hover glass pill */}
        <ul className="hidden md:flex items-center justify-center gap-0.5 lg:gap-1 mx-1 lg:mx-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="font-body text-xs md:text-sm font-bold text-[#FAF8F5]/85 hover:text-[#FAF8F5] px-2.5 lg:px-3 py-1.5 rounded-full hover:bg-white/15 active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button - Warm Ivory pill with Deep Editorial Blue text */}
        <div className="hidden md:flex items-center shrink-0 mr-1 sm:mr-1.5">
          <a
            href="#contact"
            className="bg-[#FAF8F5] text-[#226192] text-xs font-bold py-1 px-3.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_14px_rgba(250,248,245,0.35)] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full text-[#FAF8F5] hover:bg-white/15 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden absolute top-20 left-4 right-4 bg-[#226192] border border-white/25 rounded-3xl shadow-[0_20px_50px_rgba(24,74,113,0.45),inset_0_1px_1px_rgba(255,255,255,0.35)] p-5 transition-all duration-300 pointer-events-auto origin-top ${isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
          }`}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 rounded-xl font-body font-bold text-base text-[#FAF8F5] hover:bg-white/15 transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="mt-3 pt-2 border-t border-white/15">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="bg-[#FAF8F5] text-[#226192] font-bold inline-block w-full text-center text-sm py-3.5 rounded-2xl shadow-md hover:bg-white active:scale-98 transition-all"
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
