import { Video, Camera, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Video,
    number: "01",
    title: "Cinematography",
    description:
      "Portrait cinematography of people, places, and creative environments. Crafting visual narratives that capture emotion and tell compelling stories through motion.",
    features: ["Portrait Films", "Location Shoots", "Creative Direction", "Color Grading"],
  },
  {
    icon: Camera,
    number: "02",
    title: "Photography",
    description:
      "Creative portrait photography, model shoots, lifestyle visuals, and event coverage. Capturing authentic moments with artistic precision and style.",
    features: ["Portrait Sessions", "Model Shoots", "Lifestyle", "Event Coverage"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
            What I Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Bringing creativity and technical excellence together to deliver exceptional visual experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-card rounded-3xl p-8 md:p-10 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-card overflow-hidden"
            >
              {/* Background Number */}
              <span className="absolute -right-4 -top-4 font-display text-[150px] font-bold text-muted/30 select-none pointer-events-none transition-all duration-500 group-hover:text-primary/10">
                {service.number}
              </span>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                  {service.title}
                  <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-primary" />
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services Note */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Also offering{" "}
            <span className="text-foreground font-medium">UI/UX Design</span>,{" "}
            <span className="text-foreground font-medium">Video Editing</span>, and{" "}
            <span className="text-foreground font-medium">Graphic Design</span> services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
