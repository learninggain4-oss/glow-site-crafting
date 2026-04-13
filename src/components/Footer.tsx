import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.portfolio"), path: "/portfolio" },
    { name: t("nav.booking"), path: "/booking" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const serviceLinks = [
    { name: t("service.autoCare"), path: "/services/auto-care" },
    { name: t("service.accessories"), path: "/services/accessories" },
    { name: t("service.leather"), path: "/services/leather" },
    { name: t("service.electrical"), path: "/services/electrical" },
    { name: t("service.painting"), path: "/services/painting" },
  ];

  const socialIcons = [Facebook, Instagram, Twitter, Youtube];

  return (
    <footer className="bg-card border-t border-border">
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
                {socialIcons.map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
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
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">
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
                    <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block">
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
                    className="flex items-start gap-3"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div whileHover={{ rotate: 20 }}>
                      <item.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
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
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} First Option UAE. {t("footer.rights")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("footer.premiumService")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
