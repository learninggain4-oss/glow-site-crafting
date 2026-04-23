import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Globe, Lock } from "lucide-react";
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
    { name: t("nav.priceCalculator"), path: "/price-calculator" },
    { name: t("nav.booking"), path: "/booking" },
    { name: t("nav.account"), path: "/account" },
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
          ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-slate-800"
          : "bg-slate-950/20 backdrop-blur-xl"
      )}
    >
      <div className="container mx-auto px-4 flex items-center gap-4 md:gap-6 h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <motion.div
            className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20"
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 240 }}
          >
            <span className="text-white font-heading font-bold text-sm md:text-lg">FO</span>
          </motion.div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-sm md:text-lg leading-tight block text-white">
              First Option
            </span>
            <span className="text-xs text-slate-400 tracking-widest uppercase">UAE</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-4">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors text-slate-200 hover:text-red-400">
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
                    <div className="bg-card border border-border rounded-lg shadow-xl py-2">
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
                    </div>
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
                    ? "text-red-500"
                    : "text-slate-300 hover:text-white"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-red-500 rounded-full transition-all duration-300",
                  location.pathname === link.path ? "w-3/4" : "w-0 group-hover:w-1/2"
                )} />
              </Link>
            )
          )}
        </nav>

        {/* CTA + Language + Mobile */}
        <div className="flex items-center gap-2 md:gap-3 ml-auto">
          <motion.button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-slate-900/95 border border-slate-700 text-white text-xs md:text-sm font-medium hover:bg-slate-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="h-3 w-3 md:h-4 md:w-4" />
            {language === "en" ? "عربي" : "EN"}
          </motion.button>

          <a href="tel:+971505551234" className="hidden md:inline-flex">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" className="gap-2 bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:text-white shadow-lg shadow-red-600/20">
                <Phone className="h-4 w-4" />
                {t("nav.callNow")}
              </Button>
            </motion.div>
          </a>

          {/* Admin Login Button */}
          <Link to="/admin/login">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200 animate-tilt" />
              <Button 
                size="sm" 
                className="gap-2 relative font-semibold bg-slate-950/80 backdrop-blur-xl border border-white/10 text-white hover:bg-slate-950/90"
              >
                <Lock className="h-4 w-4 text-purple-400" />
                <span className="hidden md:inline">Admin</span>
                {/* Liquid blobs */}
                <span className="absolute inset-0 rounded-lg overflow-hidden">
                  <span className="absolute top-0 left-1/4 w-16 h-16 bg-purple-500/30 rounded-full blur-xl animate-blob mix-blend-screen" />
                  <span className="absolute bottom-0 right-1/4 w-12 h-12 bg-fuchsia-500/30 rounded-full blur-xl animate-blob animation-delay-2000 mix-blend-screen" />
                  <span className="absolute top-1/2 left-1/2 w-10 h-10 bg-violet-500/30 rounded-full blur-xl animate-blob animation-delay-4000 mix-blend-screen" />
                </span>
              </Button>
              <style>{`
                @keyframes blob {
                  0%, 100% { transform: translate(0, 0) scale(1); }
                  33% { transform: translate(10px, -10px) scale(1.1); }
                  66% { transform: translate(-5px, 5px) scale(0.9); }
                }
                .animate-blob {
                  animation: blob 4s ease-in-out infinite;
                }
                .animation-delay-2000 {
                  animation-delay: 2s;
                }
                .animation-delay-4000 {
                  animation-delay: 4s;
                }
              `}</style>
            </motion.div>
          </Link>

          {/* Mobile Quick Call Button */}
          <a href="tel:+971505551234" className="md:hidden">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" variant="outline" className="gap-1.5 bg-red-600/10 border-red-600/30 text-red-400 hover:bg-red-600 hover:text-white">
                <Phone className="h-4 w-4" />
              </Button>
            </motion.div>
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-slate-900/95 border border-slate-700 hover:bg-slate-800 transition-colors p-0"
                >
                  <motion.div
                    animate={mobileOpen ? "open" : "closed"}
                    className="flex flex-col items-center justify-center w-full h-full"
                  >
                    <motion.span
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: 45, y: 6 }
                      }}
                      className="block h-0.5 w-4 bg-white rounded-full mb-1"
                    />
                    <motion.span
                      variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 }
                      }}
                      className="block h-0.5 w-4 bg-white rounded-full mb-1"
                    />
                    <motion.span
                      variants={{
                        closed: { rotate: 0, y: 0 },
                        open: { rotate: -45, y: -6 }
                      }}
                      className="block h-0.5 w-4 bg-white rounded-full"
                    />
                  </motion.div>
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side={language === "ar" ? "left" : "right"} className="bg-background border-border w-80 sm:w-96">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              {/* Mobile Header */}
              <div className="flex items-center justify-between py-4 border-b border-border mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                    <span className="text-white font-heading font-bold text-sm">FO</span>
                  </div>
                  <div>
                    <span className="font-heading font-bold text-sm leading-tight block text-foreground">
                      First Option
                    </span>
                    <span className="text-xs text-muted-foreground tracking-widest uppercase">UAE</span>
                  </div>
                </div>
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/95 border border-slate-700 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="h-4 w-4" />
                  {language === "en" ? "عربي" : "EN"}
                </motion.button>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) =>
                  link.hasDropdown ? (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="mb-4"
                    >
                      <p className="px-4 py-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider border-b border-border mb-2">
                        {t("nav.services_label")}
                      </p>
                      <div className="space-y-1">
                        {services.map((service, j) => (
                          <motion.div
                            key={service.path}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (i + j) * 0.05 }}
                          >
                            <Link
                              to={service.path}
                              className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-lg mx-2"
                            >
                              {service.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
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
                          "flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-all rounded-lg mx-2",
                          location.pathname === link.path && "text-primary bg-primary/10 font-semibold"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>

              <motion.div
                className="mt-8 px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a href="tel:+971505551234">
                  <Button className="w-full gap-2 h-12 text-base font-semibold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20">
                    <Phone className="h-5 w-5" />
                    {t("nav.callNow")}
                  </Button>
                </a>
              </motion.div>

              {/* Mobile Admin Login */}
              <motion.div
                className="mt-4 px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/admin/login" className="relative group block">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-500 group-hover:duration-200" />
                  <Button 
                    className="w-full gap-2 h-12 text-base font-semibold relative bg-slate-950/80 backdrop-blur-xl border border-white/10 text-white hover:bg-slate-950/90"
                  >
                    <Lock className="h-5 w-5 text-purple-400" />
                    Admin Login
                    {/* Liquid blobs */}
                    <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <span className="absolute top-0 left-1/4 w-20 h-20 bg-purple-500/30 rounded-full blur-xl animate-blob mix-blend-screen" />
                      <span className="absolute bottom-0 right-1/4 w-16 h-16 bg-fuchsia-500/30 rounded-full blur-xl animate-blob animation-delay-2000 mix-blend-screen" />
                      <span className="absolute top-1/2 left-1/2 w-12 h-12 bg-violet-500/30 rounded-full blur-xl animate-blob animation-delay-4000 mix-blend-screen" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
