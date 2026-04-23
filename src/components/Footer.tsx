import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube, Heart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";

const Footer = () => {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      toast({ title: t("footer.newsletterErrorTitle"), description: t("footer.newsletterErrorDesc"), variant: "destructive" });
      return;
    }
    setNewsletterEmail("");
    toast({ title: t("footer.newsletterSubscribed"), description: t("footer.newsletterSubscribedDesc") });
  };

  const quickLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.portfolio"), path: "/portfolio" },
    { name: t("nav.booking"), path: "/booking" },
    { name: t("nav.contact"), path: "/contact" },
    { name: "Admin Login", path: "/admin/login" },
  ];

  const serviceLinks = [
    { name: t("service.autoCare"), path: "/services/auto-care" },
    { name: t("service.accessories"), path: "/services/accessories" },
    { name: t("service.leather"), path: "/services/leather" },
    { name: t("service.electrical"), path: "/services/electrical" },
    { name: t("service.painting"), path: "/services/painting" },
  ];

  const socialIcons = [
    { icon: Facebook, color: "hover:bg-blue-600" },
    { icon: Instagram, color: "hover:bg-pink-600" },
    { icon: Twitter, color: "hover:bg-sky-500" },
    { icon: Youtube, color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      {/* Subtle animated background gradient */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <ScrollReveal variant="fadeUp" delay={0}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary) / 0.3)", "0 0 0 8px hsl(var(--primary) / 0)", "0 0 0 0 hsl(var(--primary) / 0.3)"] }}
                >
                  <span className="text-primary-foreground font-heading font-bold text-lg">FO</span>
                </motion.div>
                <div>
                  <span className="font-heading font-bold text-lg text-foreground block">First Option</span>
                  <span className="text-xs text-muted-foreground tracking-widest uppercase">UAE</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {t("footer.description")}
              </p>
              <div className="flex gap-3">
                {socialIcons.map(({ icon: Icon, color }, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className={`w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground ${color} hover:text-white transition-all`}
                    whileHover={{ scale: 1.2, rotate: 10, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                    viewport={{ once: true }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-all inline-block underline-grow magnetic-hover">
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">{t("footer.ourServices")}</h4>
              <ul className="space-y-2.5">
                {serviceLinks.map((link, i) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-all inline-block underline-grow magnetic-hover">
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">{t("footer.contactInfo")}</h4>
              <ul className="space-y-3">
                {[
                  { icon: Phone, text: "+971 50 555 1234", href: "tel:+971505551234" },
                  { icon: Mail, text: "info@firstoptionuae.com", href: "mailto:info@firstoptionuae.com" },
                  { icon: MapPin, text: "Al Quoz Industrial Area, Dubai, UAE" },
                  { icon: Clock, text: t("footer.workingHours") },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 group"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 20, scale: 1.2 }}
                      className="transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-primary mt-0.5 shrink-0 group-hover:text-primary" />
                    </motion.div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
              <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
                <h4 className="font-heading font-semibold text-foreground mb-3">{t("footer.newsletterTitle")}</h4>
                <p className="text-sm text-muted-foreground">{t("footer.newsletterDesc")}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Input
                    placeholder={t("footer.newsletterPlaceholder")}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-secondary border-border"
                  />
                  <Button type="submit" className="w-full sm:w-auto">
                    {t("footer.subscribe")}
                  </Button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <motion.p
            className="text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} First Option UAE. {t("footer.rights")}
          </motion.p>
          <motion.p
            className="text-xs text-muted-foreground flex items-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("footer.premiumService")}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-3 w-3 text-primary inline fill-primary" />
            </motion.span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
