import { useEffect } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

/**
 * Adds a layered stacking animation to elements with the `stack-section` class.
 * Each section scales and shifts slightly as it scrolls out, letting the next
 * section slide over it for a seamless layered effect.
 */
export const useStackedScroll = (selector = ".stack-section") => {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!sections.length) return;

    const handleScroll = () => {
      const vh = window.innerHeight || 1;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();

        // How far the section has moved past the top of the viewport (0 to 1+)
        const pastTop = clamp(-rect.top / vh, 0, 1.2);

        // Layering transforms
        const translate = pastTop * 60; // px
        const scale = 1 - pastTop * 0.05;
        const opacity = 1 - pastTop * 0.08;

        section.style.setProperty("--stack-translate", `${translate}px`);
        section.style.setProperty("--stack-scale", scale.toFixed(3));
        section.style.setProperty("--stack-opacity", opacity.toFixed(3));
        section.style.setProperty("--stack-z", `${sections.length - index}`);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [selector]);
};

export default useStackedScroll;

