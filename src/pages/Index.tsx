import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { Star, Clock, Shield, Award, Car, Wrench, Palette, Zap, Sofa, ChevronRight, Quote, CreditCard, Bell, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import ParticleField from "@/components/ParticleField";
import TypewriterText from "@/components/TypewriterText";
import TextReveal from "@/components/TextReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import TrustedBrands from "@/components/TrustedBrands";
import { TranslationKey } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";
import avatarAhmed from "@/assets/avatar-ahmed.jpg";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarMohammed from "@/assets/avatar-mohammed.jpg";
import avatarFatima from "@/assets/avatar-fatima.jpg";
import avatarRaj from "@/assets/avatar-raj.jpg";
import avatarJames from "@/assets/avatar-james.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const heroSlides = [heroBg, heroSlide1, heroSlide2, heroSlide3, heroSlide4];
const portfolioImages = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const Index = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const stats = [
    { label: t("stats.googleRating"), value: "4.9+", icon: Star },
    { label: t("stats.yearsExperience"), value: "4+", icon: Award },
    { label: t("stats.happyCustomers"), value: "100%", icon: Shield },
  ];

  const features = [
    { title: t("features.bestUae"), description: t("features.bestUaeDesc"), icon: Award },
    { title: t("features.24hour"), description: t("features.24hourDesc"), icon: Clock },
    { title: t("features.freeAssessment"), description: t("features.freeAssessmentDesc"), icon: Shield },
    { title: t("features.precisionCare"), description: t("features.precisionCareDesc"), icon: Wrench },
  ];

  const services = [
    { title: t("service.autoCare"), description: t("service.autoCareDesc"), icon: Car, path: "/services/auto-care" },
    { title: t("service.accessories"), description: t("service.accessoriesDesc"), icon: Wrench, path: "/services/accessories" },
    { title: t("service.leather"), description: t("service.leatherDesc"), icon: Sofa, path: "/services/leather" },
    { title: t("service.electrical"), description: t("service.electricalDesc"), icon: Zap, path: "/services/electrical" },
    { title: t("service.painting"), description: t("service.paintingDesc"), icon: Palette, path: "/services/painting" },
  ];

  const promotions = [
    {
      title: t("packages.premium"),
      description: t("packages.premiumDesc"),
      badge: t("packages.bestValue"),
    },
    {
      title: t("packages.paintPerfection"),
      description: t("packages.paintPerfectionDesc"),
      badge: t("packages.mostPopular"),
    },
    {
      title: t("packages.interiorWellness"),
      description: t("packages.interiorWellnessDesc"),
      badge: t("packages.vip"),
    },
  ];

  const homeBenefits = [
    {
      title: t("homeFeatures.securePayment"),
      description: t("homeFeatures.securePaymentDesc"),
      icon: CreditCard,
    },
    {
      title: t("homeFeatures.remindersTitle"),
      description: t("homeFeatures.remindersDesc"),
      icon: Bell,
    },
    {
      title: t("homeFeatures.loyaltyTitle"),
      description: t("homeFeatures.loyaltyDesc"),
      icon: Gift,
    },
  ];

  const testimonials = [
    { name: "Ahmed K.", text: t("testimonial.ahmed"), rating: 5, avatar: avatarAhmed },
    { name: "Sarah M.", text: t("testimonial.sarah"), rating: 5, avatar: avatarSarah },
    { name: "Mohammed R.", text: t("testimonial.mohammed"), rating: 5, avatar: avatarMohammed },
    { name: "Fatima A.", text: t("testimonial.fatima"), rating: 5, avatar: avatarFatima },
    { name: "Raj P.", text: t("testimonial.raj"), rating: 5, avatar: avatarRaj },
    { name: "James W.", text: t("testimonial.james"), rating: 5, avatar: avatarJames },
  ];

  const typewriterTexts = [
    t("hero.title2"),
    "Auto Detailing",
    "Paint Protection",
    "Interior Care",
  ];

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={heroSlides[currentSlide]}
              alt="Auto care service center"
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-background/70" />
        </motion.div>

        {/* Floating particles */}
        <ParticleField count={15} />

        <motion.div className="container mx-auto px-4 relative z-10" style={{ opacity: heroOpacity }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              {t("hero.welcome")}
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-heading text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            >
              <span className="text-foreground drop-shadow-lg">{t("hero.title1")}</span>{" "}
              <span className="animate-gradient-text drop-shadow-lg">
                <TypewriterText texts={typewriterTexts} speed={100} deleteSpeed={50} pauseDuration={2500} />
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              {t("hero.subtitle")}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="text-base px-8 py-6 font-semibold animate-pulse-glow shine-effect">
                    {t("hero.bookNow")}
                  </Button>
                </motion.div>
              </Link>
              <Link to="/services/auto-care">
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="text-base px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    {t("hero.exploreServices")}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <motion.div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} variant="fadeUp" delay={i * 0.15}>
                <Card className="bg-card border-border card-hover-glow">
                  <CardContent className="flex items-center gap-4 p-6">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <p className="font-heading text-3xl font-bold text-foreground">
                        <AnimatedCounter value={stat.value} />
                      </p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative overflow-hidden">
        <ParticleField count={8} className="opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("features.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <TextReveal text={t("features.title1")} className="text-[#675f5f]" />
                {" "}
                <span className="text-primary">{t("features.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} variant="scaleIn" delay={i * 0.1}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card className="bg-card border-border card-hover-glow h-full tilt-card gradient-border">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 15, scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary) / 0.1)", "0 0 0 12px hsl(var(--primary) / 0)", "0 0 0 0 hsl(var(--primary) / 0.1)"] }}
                      >
                        <feature.icon className="h-7 w-7 text-primary" />
                      </motion.div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TrustedBrands />

      {/* Services */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <ParticleField count={6} className="opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("services.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <TextReveal text={t("services.title1")} className="text-foreground" />
                {" "}
                <span className="text-primary">{t("services.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={i * 0.1}>
                <Link to={service.path}>
                  <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="bg-card border-border card-hover-glow group h-full cursor-pointer tilt-card gradient-border">
                      <CardContent className="p-8">
                        <motion.div
                          className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-5 transition-colors"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <service.icon className="h-7 w-7 text-primary" />
                        </motion.div>
                        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{service.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                        <motion.span
                          className="inline-flex items-center gap-1 text-primary text-sm font-medium"
                          whileHover={{ x: 5 }}
                        >
                          {t("services.learnMore")} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                        </motion.span>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Packages */}
      <section className="py-24 bg-background/80 relative overflow-hidden">
        <ParticleField count={6} className="opacity-15" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("packages.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <TextReveal text={t("packages.title1")} className="text-foreground" />
                {" "}
                <span className="text-primary">{t("packages.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((promo, i) => (
              <ScrollReveal key={promo.title} variant="fadeUp" delay={i * 0.1}>
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 280 }}>
                  <Card className="bg-card border-border card-hover-glow h-full">
                    <CardContent className="p-8">
                      <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4">
                        {promo.badge}
                      </div>
                      <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">{promo.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-8">{promo.description}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                          {t("packages.learnMore")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-20 bg-background relative overflow-hidden">
        <ParticleField count={5} className="opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-14">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("trust.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <TextReveal text={t("trust.title1")} className="text-foreground" /> <span className="text-primary">{t("trust.title2")}</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{t("trust.note")}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {["trust.partner1", "trust.partner2", "trust.partner3"].map((key, idx) => (
              <ScrollReveal key={key} variant="fadeUp" delay={idx * 0.1}>
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 280 }}>
                  <Card className="bg-card border-border card-hover-glow h-full">
                    <CardContent className="p-8 text-center">
                      <Award className="mx-auto mb-4 h-12 w-12 text-primary" />
                      <p className="font-heading text-2xl font-semibold text-foreground">{t(key as any)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Service Benefits */}
      <section className="py-24 bg-secondary/10 relative overflow-hidden">
        <ParticleField count={6} className="opacity-15" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("homeFeatures.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <TextReveal text={t("homeFeatures.title1")} className="text-foreground" />
                {" "}
                <span className="text-primary">{t("homeFeatures.title2")}</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">{t("homeFeatures.description")}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeBenefits.map((benefit, i) => (
              <ScrollReveal key={benefit.title} variant="fadeUp" delay={i * 0.1}>
                <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 280 }}>
                  <div className="rounded-3xl border border-border bg-card p-8 h-full">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-6">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flawless Finish */}
      <section className="py-24 relative overflow-hidden">
        <ParticleField count={5} className="opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal variant="blur">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("flawless.subtitle")}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-sm">
              <TextReveal text={t("flawless.title1")} className="text-[#5f5858]" />
              {" "}
              <span className="text-primary">{t("flawless.title2")}</span>
            </h2>
            <p className="max-w-2xl mx-auto mb-12 text-[#544a4a]">
              {t("flawless.description")}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[t("flawless.trust1"), t("flawless.trust2"), t("flawless.trust3")].map((trust, i) => (
              <ScrollReveal key={trust} variant="scaleIn" delay={i * 0.15}>
                <motion.div
                  className="flex flex-col items-center gap-3"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-float"
                    style={{ animationDelay: `${i * 0.5}s` }}
                    animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary) / 0.15)", "0 0 0 15px hsl(var(--primary) / 0)", "0 0 0 0 hsl(var(--primary) / 0.15)"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    <Shield className="h-8 w-8 text-primary" />
                  </motion.div>
                  <p className="font-heading font-semibold drop-shadow-sm text-[#6c6060]">{trust}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("portfolio.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <TextReveal text={t("portfolio.title1")} className="text-foreground" />
                {" "}
                <span className="text-primary">{t("portfolio.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Ceramic Paint Renewal", image: portfolio1, category: t("service.painting"), featured: true },
              { title: "Luxury Interior Detail", image: portfolio2, category: t("service.leather") },
              { title: "Engine Bay Refresh", image: portfolio3, category: t("service.autoCare") },
              { title: "Custom Accessories Fit", image: portfolio4, category: t("service.accessories") },
            ].map((item, i) => (
              <ScrollReveal key={item.title} variant="scaleIn" delay={i * 0.08}>
                <motion.div
                  className={`group relative overflow-hidden rounded-[32px] shadow-2xl shadow-slate-950/10 ${item.featured ? "md:col-span-2 md:row-span-2" : ""}`}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-6 flex flex-col justify-end">
                    <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">{item.category}</span>
                    <h3 className="mt-4 text-2xl font-heading font-semibold text-foreground">{item.title}</h3>
                    {item.featured ? (
                      <p className="mt-3 max-w-xl text-sm text-muted-foreground">Real project photography from our workshop, showing premium restoration and detailing work.</p>
                    ) : null}
                    <span className="mt-5 inline-flex items-center rounded-full border border-primary/25 bg-white/10 px-3 py-2 text-sm text-primary font-semibold backdrop-blur-sm">
                      {t("portfolio.viewProject")}
                    </span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="text-center mt-10">
              <Link to="/portfolio">
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    {t("portfolio.exploreMore")} <ChevronRight className="h-4 w-4 ms-1 rtl:rotate-180" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <ParticleField count={5} className="opacity-15" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("testimonials.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <TextReveal text={t("testimonials.title1")} className="text-foreground" />
                {" "}
                <span className="text-primary">{t("testimonials.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp">
            <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]} className="w-full">
              <CarouselContent className="-ml-4">
                {testimonials.map((t_item, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Card className="bg-secondary border-border/50 h-full tilt-card">
                        <CardContent className="p-8">
                          <Quote className="h-8 w-8 text-primary/30 mb-4" />
                          <p className="text-muted-foreground mb-6 leading-relaxed">{t_item.text}</p>
                          <div className="flex items-center gap-2 mb-2">
                            {[...Array(t_item.rating)].map((_, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: j * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <Star className="h-4 w-4 fill-primary text-primary" />
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex items-center gap-3">
                            <img src={t_item.avatar} alt={t_item.name} className="w-10 h-10 rounded-full object-cover" />
                            <p className="font-heading font-semibold text-foreground">{t_item.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-8">
                <CarouselPrevious className="static translate-y-0 bg-white border-white text-black hover:bg-white/80 hover:text-black" />
                <CarouselNext className="static translate-y-0 bg-white border-white text-black hover:bg-white/80 hover:text-black" />
              </div>
            </Carousel>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <ParticleField count={8} className="opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="blur">
            <div className="text-center max-w-3xl mx-auto">
               <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-sm">
                 <TextReveal text={t("cta.title1")} className="text-[#837272]" />
                 {" "}
                 <span className="text-primary">{t("cta.title2")}</span>?
               </h2>
               <p className="text-lg mb-8 text-[#595454]">
                 {t("cta.description")}
               </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking">
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="text-base px-8 py-6 shine-effect animate-pulse-glow">{t("cta.bookFree")}</Button>
                  </motion.div>
                </Link>
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" className="text-base px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      {t("cta.contactUs")}
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
