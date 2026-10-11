import { useState, useEffect } from "react";
import { Instagram, X } from "lucide-react";
import CircularCarousel from "./CircularCarousel";
import portfolioMain from "@/assets/portfolio-main.jpg";
import portfolioWildlife1 from "@/assets/portfolio-wildlife-1.jpg";
import portfolioNature1 from "@/assets/portfolio-nature-1.jpg";
import portfolioWildlife2 from "@/assets/portfolio-wildlife-2.jpg";
import portfolioCreative1 from "@/assets/portfolio-creative-1.jpg";
import portfolioLandscape1 from "@/assets/portfolio-landscape-1.jpg";
import portfolioLandscape2 from "@/assets/portfolio-landscape-2.jpg";
import portfolioBW1 from "@/assets/portfolio-bw-1.jpg";
import portfolioLandscape3 from "@/assets/portfolio-landscape-3.jpg";
import portfolioPortrait1 from "@/assets/portfolio-portrait-1.jpg";
import portfolioLandscape4 from "@/assets/portfolio-landscape-4.jpg";
import img1 from "@/assets/IMG 1.jpeg";
import img2 from "@/assets/IMG 2.jpeg";
import img3 from "@/assets/IMG 3.jpeg";
import img4 from "@/assets/IMG 4.jpeg";

type PortfolioItem = (typeof portfolioItems)[number];

const portfolioItems = [
  {
    id: 1,
    title: "Golden Sunset",
    category: "Landscape",
    image: portfolioLandscape2,
    span: "md:col-span-2",
  },
  {
    id: 2,
    title: "Stage Presence",
    category: "Portrait Photography",
    image: portfolioPortrait1,
    span: "md:row-span-2",
  },
  {
    id: 3,
    title: "Feline Friends",
    category: "Wildlife",
    image: portfolioWildlife1,
    span: "",
  },
  {
    id: 4,
    title: "Miniature World",
    category: "Creative",
    image: portfolioCreative1,
    span: "",
  },
  {
    id: 5,
    title: "Rural Serenity",
    category: "Nature",
    image: portfolioNature1,
    span: "md:col-span-2",
  },
  {
    id: 6,
    title: "Persian Grace",
    category: "Wildlife",
    image: portfolioWildlife2,
    span: "",
  },
  {
    id: 7,
    title: "Sacred Garden",
    category: "Landscape",
    image: portfolioLandscape1,
    span: "",
  },
  {
    id: 8,
    title: "Shadow Play",
    category: "Black & White",
    image: portfolioBW1,
    span: "",
  },
  {
    id: 9,
    title: "Divine Light",
    category: "Landscape",
    image: portfolioLandscape3,
    span: "",
  },
  {
    id: 10,
    title: "Mountains",
    category: "Landscape",
    image: portfolioLandscape4,
    span: "",
  },
  {
    id: 11,
    title: "Flight in Blue",
    category: "Aviation & Sky",
    image: img1,
    span: "",
  },
  {
    id: 12,
    title: "Canopy River",
    category: "Landscape",
    image: img2,
    span: "",
  },
  {
    id: 13,
    title: "Metro Motion",
    category: "Street Photography",
    image: img3,
    span: "",
  },
  {
    id: 14,
    title: "Cascade Stream",
    category: "Nature",
    image: img4,
    span: "",
  },
];

const carouselItems = portfolioItems.map((item) => ({
  src: item.image,
  alt: item.title,
  title: item.title,
  subtitle: item.category,
}));

const PortfolioSection = () => {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openItem = (item: PortfolioItem) => setActiveItem(item);
  const closeItem = () => setActiveItem(null);

  return (
    <section id="portfolio" className="pt-2 pb-4 md:pt-4 md:pb-6 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-2 sm:mb-4">
          <span className="inline-block text-xs md:text-sm font-semibold text-[#226192] uppercase tracking-widest mb-1.5">
            My Work
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
            Featured <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            A curated collection of my creative and technical work — places, faces, and digital spaces.
          </p>
        </div>

        {/* 3D Circular Carousel Portfolio Gallery - enlarged for high visibility with tight spacing */}
        <div className="w-full relative overflow-hidden rounded-3xl h-[400px] xs:h-[440px] sm:h-[500px] md:h-[540px] lg:h-[560px]">
          <CircularCarousel
            items={carouselItems}
            preset="cylinder"
            intro="rise"
            cardWidth={isMobile ? 210 : 320}
            aspectRatio={1}
            speed={isMobile ? 10 : 14}
            captions={false}
            gap={isMobile ? 16 : 26}
            tilt={-5}
            curve={1}
            perspective={isMobile ? 1800 : 2500}
            autoplay="drift"
            interval={3}
            direction="left"
            momentum={0.6}
            snap
            pauseOnHover
            focusOnClick
            draggable
            parallax={0.3}
            stretch={0.5}
            fadeColor="#000000"
            depthFade={0.55}
            innerShade={0.6}
            cornerRadius={16}
            onItemClick={(_item, index) => openItem(portfolioItems[index])}
          />
        </div>

        {/* Lightbox */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={closeItem}
            role="presentation"
          >
            <div
              className="bg-[#226192] text-[#FAF8F5] rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full max-h-[70vh] object-contain bg-black"
                />
                <button
                  type="button"
                  onClick={closeItem}
                  className="absolute top-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-[#FAF8F5] hover:bg-black/90 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 sm:p-5 md:p-6 bg-[#226192] border-t border-white/10">
                <span className="text-[#FAF8F5] bg-white/15 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
                  {activeItem.category}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-[#FAF8F5]">{activeItem.title}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Instagram Links */}
        <div className="mt-8 sm:mt-10 text-center px-2">
          <p className="text-muted-foreground mb-4 sm:mb-6 font-medium text-sm sm:text-base">
            See more of my work on Instagram
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
            <a
              href="https://instagram.com/tony.werks"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-[#226192] text-[#FAF8F5] rounded-full font-semibold hover:bg-[#2C3480] shadow-md hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base"
            >
              <Instagram size={18} />
              @tony.werks
            </a>
            <a
              href="https://instagram.com/antonysojan18"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-[#226192] text-[#FAF8F5] rounded-full font-semibold hover:bg-[#2C3480] shadow-md hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base"
            >
              <Instagram size={18} />
              @antonysojan18
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
