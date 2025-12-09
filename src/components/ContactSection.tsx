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
    label: "@tonywerks",
    href: "https://instagram.com/tonywerks",
  },
  {
    icon: Linkedin,
    label: "antonysojan",
    href: "https://linkedin.com/in/antonysojan",
  },
];

const EMAILJS_PUBLIC_KEY = "mX7V0Ym5LT1Dtw3PR";
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
        { publicKey: EMAILJS_PUBLIC_KEY },
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
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary uppercase tracking-widest mb-4">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's Work <span className="text-gradient-gold">Together</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
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
                  className="w-full px-4 py-4 bg-muted rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
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
                  className="w-full px-4 py-4 bg-muted rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-muted rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-10">
            {/* Direct Contact */}
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="group flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-primary/10 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <info.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-display text-2xl font-bold mb-6">Follow Me</h3>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-3 bg-muted rounded-xl hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    <social.icon size={18} />
                    <span className="font-medium text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Note */}
            <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Response time:</span> I typically respond within 24-48 hours. For urgent inquiries, please call directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
