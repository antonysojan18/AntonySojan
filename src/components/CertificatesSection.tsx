import { Award, GraduationCap, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// NPTEL Certificates
import cert1 from "@/assets/cert1.jpg";
import cert2 from "@/assets/cert2.jpg";
import cert3 from "@/assets/cert3.jpg";
import cert4 from "@/assets/cert4.jpg";

// Internship & Workshop Certificates
import cert5 from "@/assets/cert5.jpg";
import cert6 from "@/assets/cert6.jpg";
import cert7 from "@/assets/cert7.jpg";
import cert8 from "@/assets/cert8.jpg";
import cert9 from "@/assets/cert9.jpg";
import cert10 from "@/assets/cert10.jpg";
import cert11 from "@/assets/cert11.jpg";
import cert12 from "@/assets/cert12.jpg";
import cert13 from "@/assets/cert13.jpg";
import cert14 from "@/assets/cert14.jpg";
import cert15 from "@/assets/cert15.jpg";

const nptelCertificates = [
  {
    id: 1,
    title: "Management Information System",
    score: "75%",
    institution: "IIT Kharagpur",
    image: cert1,
  },
  {
    id: 2,
    title: "AI in Human Resource Management",
    score: "62%",
    institution: "IIT Guwahati",
    image: cert2,
  },
  {
    id: 3,
    title: "Business Intelligence & Analytics",
    score: "56%",
    institution: "IIT Madras",
    image: cert3,
  },
  {
    id: 4,
    title: "Cyber Security and Privacy",
    score: "56%",
    institution: "IIT Madras",
    image: cert4,
  },
];

const internshipCertificates = [
  {
    id: 5,
    title: "Android Development Internship",
    organization: "Prodigy InfoTech",
    duration: "June - July 2024",
    image: cert5,
  },
  {
    id: 6,
    title: "Data Analytics Internship",
    organization: "CodeAlpha",
    duration: "April - May 2025",
    image: cert6,
  },
  {
    id: 7,
    title: "UX Kickstarter Workshop",
    organization: "Growth School",
    duration: "Workshop",
    image: cert7,
  },
  {
    id: 8,
    title: "Cyber Security & Ethical Hacking Bootcamp",
    organization: "LetsUpgrade",
    duration: "August 2024",
    image: cert8,
  },
  {
    id: 9,
    title: "Data Analytics - Letter of Recommendation",
    organization: "CodeAlpha",
    duration: "May 2025",
    image: cert9,
  },
  {
    id: 10,
    title: "ChatGPT & AI Tools Workshop",
    organization: "be10X",
    duration: "August 2024",
    image: cert10,
  },
  {
    id: 11,
    title: "AI for Beginners",
    organization: "HP LIFE",
    duration: "March 2025",
    image: cert11,
  },
  {
    id: 12,
    title: "Freedom with AI Masterclass",
    organization: "Freedom with AI",
    duration: "October 2024",
    image: cert12,
  },
  {
    id: 13,
    title: "Oracle Cloud Infrastructure AI Certified",
    organization: "Oracle University",
    duration: "May 2024",
    image: cert13,
  },
  {
    id: 14,
    title: "AI Fluency Training",
    organization: "Microsoft & Naan Mudhalvan",
    duration: "December 2023",
    image: cert14,
  },
  {
    id: 15,
    title: "Ethical Hacking & Cybersecurity Workshop",
    organization: "HackingFlix",
    duration: "August 2024",
    image: cert15,
  },
];

const CertificateCard = ({
  certificate,
  type,
}: {
  certificate: (typeof nptelCertificates)[0] | (typeof internshipCertificates)[0];
  type: "nptel" | "internship";
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group relative overflow-hidden rounded-lg bg-card border border-border/50 cursor-pointer transition-all duration-300 hover:border-gold/50 hover:shadow-elegant">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h4 className="font-display text-sm font-semibold text-foreground line-clamp-2 mb-2">
              {certificate.title}
            </h4>
            {type === "nptel" && "score" in certificate && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{certificate.institution}</span>
                <span className="text-gold font-semibold">{certificate.score}</span>
              </div>
            )}
            {type === "internship" && "organization" in certificate && (
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{certificate.organization}</span>
                <span>{certificate.duration}</span>
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-2 bg-background/95 backdrop-blur-sm">
        <img
          src={certificate.image}
          alt={certificate.title}
          className="w-full h-auto rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
};

const CertificatesSection = () => {
  return (
    <section id="certificates" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <Award className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">Achievements</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            CERTIFICATES
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my academic achievements, professional certifications, and workshop completions.
          </p>
        </div>

        {/* NPTEL Achievements */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-6 h-6 text-gold" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              NPTEL ACHIEVEMENTS
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nptelCertificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} type="nptel" />
            ))}
          </div>
        </div>

        {/* Internships & Workshops */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6 text-gold" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              INTERNSHIPS & WORKSHOPS
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {internshipCertificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} type="internship" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
