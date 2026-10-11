import { useState } from "react";
import { send } from "@emailjs/browser";
import { Mail, Phone, Instagram, Linkedin, Send, ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "antonysojan18@gmail.com",
    href: "mailto:antonysojan18@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 74488 42897",
    href: "tel:+917448842897",
  },
];

const socials = [
  {
    icon: Instagram,
    label: "@antonysojan18",
    href: "https://instagram.com/antonysojan18",
  },
  {
    icon: Instagram,
    label: "@tony.werks",
    href: "https://instagram.com/tony.werks",
  },
  {
    icon: Linkedin,
    label: "antonysojan",
    href: "https://linkedin.com/in/antonysojan",
  },
];

const EMAILJS_PUBLIC_KEY = "7BEAMQxQ2PNKDXbgl";
const EMAILJS_SERVICE_ID = "service_wctgnfr";
const EMAILJS_TEMPLATE_ID = "template_8gvqoru";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill out your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          reply_to: email,
          message,
        },
        EMAILJS_PUBLIC_KEY,
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS send failed", error);
      toast({
        title: "Something went wrong",
        description: "I couldn't send your message. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block text-xs sm:text-sm font-semibold text-[#226192] uppercase tracking-widest mb-2 sm:mb-3">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Let's Work <span className="text-gradient-gold">Together</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Contact Form Box */}
          <div className="bg-[#226192] text-[#FAF8F5] p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(34,97,146,0.22)] border border-white/20">
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2 text-[#FAF8F5]">Send a Message</h3>
            <p className="text-xs sm:text-sm text-[#EAE6DE]/80 mb-5 sm:mb-6">Fill in the details below and I'll get back to you promptly.</p>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-semibold text-[#FAF8F5] mb-1.5 sm:mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base bg-white/10 rounded-xl border border-white/25 text-[#FAF8F5] placeholder:text-[#FAF8F5]/40 focus:border-[#FAF8F5] focus:bg-white/15 focus:ring-2 focus:ring-white/20 outline-none transition-all font-body"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-[#FAF8F5] mb-1.5 sm:mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base bg-white/10 rounded-xl border border-white/25 text-[#FAF8F5] placeholder:text-[#FAF8F5]/40 focus:border-[#FAF8F5] focus:bg-white/15 focus:ring-2 focus:ring-white/20 outline-none transition-all font-body"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-semibold text-[#FAF8F5] mb-1.5 sm:mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-sm sm:text-base bg-white/10 rounded-xl border border-white/25 text-[#FAF8F5] placeholder:text-[#FAF8F5]/40 focus:border-[#FAF8F5] focus:bg-white/15 focus:ring-2 focus:ring-white/20 outline-none transition-all font-body resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 px-6 bg-[#FAF8F5] text-[#226192] hover:bg-white font-bold rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 sm:space-y-10">
            {/* Direct Contact */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#226192]">Contact Info</h3>
              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="group flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 bg-[#226192] text-[#FAF8F5] border border-white/20 rounded-xl sm:rounded-2xl hover:border-white/40 hover:shadow-[0_12px_32px_rgba(34,97,146,0.25)] transition-all duration-300 shadow-sm"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-[#FAF8F5] transition-colors duration-300 shrink-0">
                      <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF8F5] group-hover:text-[#226192] transition-colors duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] sm:text-xs uppercase tracking-wider text-[#EAE6DE]/75 font-medium">{info.label}</p>
                      <p className="font-semibold text-sm sm:text-base text-[#FAF8F5] truncate">{info.value}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-auto opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#FAF8F5] shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#226192]">Follow Me</h3>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3.5 bg-[#226192] text-[#FAF8F5] border border-white/20 rounded-xl hover:bg-[#2C3480] hover:border-white/35 transition-all duration-300 shadow-sm text-xs sm:text-sm"
                  >
                    <social.icon size={16} className="text-[#FAF8F5]" />
                    <span className="font-semibold text-[#FAF8F5]">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Note */}
            <div className="p-4 sm:p-6 bg-[#226192] text-[#FAF8F5] rounded-xl sm:rounded-2xl border border-white/20 shadow-sm">
              <p className="text-xs sm:text-sm text-[#EAE6DE]/90 leading-relaxed">
                <span className="text-[#FAF8F5] font-bold">Response time:</span> I typically respond within 24-48 hours. For urgent inquiries, please call directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
