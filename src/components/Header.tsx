import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const services = [
    { name: t("service.autoCare"), path: "/services/auto-care" },
    { name: t("service.accessories"), path: "/services/accessories" },
    { name: t("service.leather"), path: "/services/leather" },
    { name: t("service.electrical"), path: "/services/electrical" },
    { name: t("service.painting"), path: "/services/painting" },
  ];

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.services"), path: "#", hasDropdown: true },
    { name: t("nav.portfolio"), path: "/portfolio" },
    { name: t("nav.booking"), path: "/booking" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center"
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-primary-foreground font-heading font-bold text-lg">FO</span>
          </motion.div>
          <div>
            <span className="font-heading font-bold text-lg leading-tight block text-[#5a3030]">
              First Option
            </span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">UAE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors text-[#725f5f]">
                  {link.name}
                  <motion.div animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full start-0 pt-2 w-56"
                  >
                    {services.map((service, i) => (
                      <motion.div
                        key={service.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={service.path}
                          className="block px-4 py-2.5 text-sm text-card-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {service.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors group",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-[#877373]"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                  location.pathname === link.path ? "w-3/4" : "w-0 group-hover:w-1/2"
                )} />
              </Link>
            )
          )}
        </nav>

        {/* CTA + Language + Mobile */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="h-4 w-4" />
            {language === "en" ? "عربي" : "EN"}
          </motion.button>

          <a href="tel:+971505551234" className="hidden md:flex">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Phone className="h-4 w-4" />
                {t("nav.callNow")}
              </Button>
            </motion.div>
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side={language === "ar" ? "left" : "right"} className="bg-background border-border w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-2 mt-8">
                {navLinks.map((link, i) =>
                  link.hasDropdown ? (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <p className="px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {t("nav.services_label")}
                      </p>
                      {services.map((service, j) => (
                        <motion.div
                          key={service.path}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (i + j) * 0.05 }}
                        >
                          <Link
                            to={service.path}
                            className="block px-6 py-2.5 text-foreground hover:text-primary transition-colors"
                          >
                            {service.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={cn(
                          "px-4 py-2.5 text-foreground hover:text-primary transition-colors block",
                          location.pathname === link.path && "text-primary font-semibold"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                )}
                <motion.div
                  className="mt-4 px-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <a href="tel:+971505551234">
                    <Button className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      {t("nav.callNow")}
                    </Button>
                  </a>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
