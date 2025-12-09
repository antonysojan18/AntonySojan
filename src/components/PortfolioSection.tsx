import { useState } from "react";
import { ExternalLink, Instagram, X } from "lucide-react";
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
];

const PortfolioSection = () => {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const openItem = (item: PortfolioItem) => setActiveItem(item);
  const closeItem = () => setActiveItem(null);

  return (
    <section id="portfolio" className="section-padding bg-cream-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
            My Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Featured <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            A curated collection of my creative and technical work — places, faces, and digital spaces.
          </p>
        </div>

        {/* Featured Photo - My Work */}
        <div className="mb-10">
          <div className="relative group overflow-hidden rounded-xl max-w-xs mx-auto">
            <div className="aspect-square">
              <img
                src={portfolioMain}
                alt="Antony Sojan - Photographer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Behind The Lens
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-cream mt-1">
                The Photographer
              </h3>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {portfolioItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openItem(item)}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
            >
              {/* Image */}
              <div className="aspect-[4/3] md:aspect-auto md:h-full min-h-[180px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-left">
                <span className="text-primary text-xs font-medium uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-display text-base md:text-lg font-bold text-cream mt-1">
                  {item.title}
                </h3>
              </div>

              {/* Hover Icon */}
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-cream flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <ExternalLink className="w-4 h-4 text-charcoal" />
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={closeItem}
            role="presentation"
          >
            <div
              className="bg-background rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full"
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
                  className="absolute top-3 right-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-cream hover:bg-black/90 transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 md:p-6">
                <span className="text-primary text-xs font-medium uppercase tracking-wider">
                  {activeItem.category}
                </span>
                <h3 className="font-display text-xl font-bold mt-1">{activeItem.title}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Instagram Links */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            See more of my work on Instagram
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com/tony.werks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-primary transition-colors duration-300"
            >
              <Instagram size={18} />
              @tony.werks
            </a>
            <a
              href="https://instagram.com/antonysojan18"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-full font-medium hover:bg-foreground hover:text-background transition-colors duration-300"
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
