import { Award, GraduationCap, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import TiltCard from "./TiltCard";

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
        <div className="h-full">
          <TiltCard maxTilt={6} className="h-full">
            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#226192] text-[#EAE6DE] border border-white/20 cursor-pointer transition-all duration-300 hover:border-white/40 hover:shadow-[0_16px_36px_rgba(24,74,113,0.35)] flex flex-col h-full">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between">
                <h4 className="font-display text-xs sm:text-sm font-bold text-[#FAF8F5] line-clamp-2 mb-1.5 sm:mb-2 leading-tight sm:leading-snug">
                  {certificate.title}
                </h4>
                {type === "nptel" && "score" in certificate && (
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#EAE6DE]/85 gap-1 mt-auto pt-1">
                    <span className="truncate">{certificate.institution}</span>
                    <span className="text-[#FAF8F5] bg-white/20 px-1.5 sm:px-2.5 py-0.5 rounded-full font-bold shrink-0">{certificate.score}</span>
                  </div>
                )}
                {type === "internship" && "organization" in certificate && (
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between text-[10px] sm:text-xs text-[#EAE6DE]/85 gap-0.5 sm:gap-1 mt-auto pt-1">
                    <span className="truncate font-medium">{certificate.organization}</span>
                    <span className="shrink-0 text-[#FAF8F5]/80 text-[9.5px] sm:text-xs">{certificate.duration}</span>
                  </div>
                )}
              </div>
            </div>
          </TiltCard>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-2 bg-background/95 backdrop-blur-md border border-[#226192]/20">
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
    <section id="certificates" className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto px-0 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#226192]/10 border border-[#226192]/25 mb-3 sm:mb-4">
            <Award className="w-4 h-4 text-[#226192]" />
            <span className="text-xs sm:text-sm font-semibold text-[#226192]">Achievements</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#226192] mb-2 sm:mb-3">
            CERTIFICATES
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-2">
            A showcase of my academic achievements, professional certifications, and workshop completions.
          </p>
        </div>

        {/* NPTEL Achievements */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-8">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#226192]" />
            <h3 className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-[#226192]">
              NPTEL ACHIEVEMENTS
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {nptelCertificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} type="nptel" />
            ))}
          </div>
        </div>

        {/* Internships & Workshops */}
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-8">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#226192]" />
            <h3 className="font-display text-lg sm:text-2xl md:text-3xl font-bold text-[#226192]">
              INTERNSHIPS & WORKSHOPS
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
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
