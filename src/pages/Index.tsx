import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, Clock, Shield, Award, Car, Wrench, Palette, Zap, Sofa, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
};

// Counter animation hook
const useCountUp = (end: string, duration: number = 2000, inView: boolean = false) => {
  const [count, setCount] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const numericMatch = end.match(/[\d.]+/);
    if (!numericMatch) { setCount(end); return; }
    const target = parseFloat(numericMatch[0]);
    const prefix = end.slice(0, end.indexOf(numericMatch[0]));
    const suffix = end.slice(end.indexOf(numericMatch[0]) + numericMatch[0].length);
    const isDecimal = numericMatch[0].includes(".");
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(prefix + (isDecimal ? current.toFixed(1) : Math.floor(current).toString()) + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, inView]);
  return count;
};

const Index = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const testimonials = [
    { name: "Ahmed K.", text: t("testimonial.ahmed"), rating: 5, avatar: avatarAhmed },
    { name: "Sarah M.", text: t("testimonial.sarah"), rating: 5, avatar: avatarSarah },
    { name: "Mohammed R.", text: t("testimonial.mohammed"), rating: 5, avatar: avatarMohammed },
    { name: "Fatima A.", text: t("testimonial.fatima"), rating: 5, avatar: avatarFatima },
    { name: "Raj P.", text: t("testimonial.raj"), rating: 5, avatar: avatarRaj },
    { name: "James W.", text: t("testimonial.james"), rating: 5, avatar: avatarJames },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={heroSlides[currentSlide]}
              alt="Auto care service center"
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-background/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
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
              <span className="text-primary drop-shadow-lg">{t("hero.title2")}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              {t("hero.subtitle")}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" className="text-base px-8 py-6 font-semibold">
                  {t("hero.bookNow")}
                </Button>
              </Link>
              <Link to="/services/auto-care">
                <Button variant="outline" size="lg" className="text-base px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  {t("hero.exploreServices")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} variant="fadeUp" delay={i * 0.15}>
                <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-heading text-3xl font-bold text-foreground">{stat.value}</p>
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
      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("features.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <span className="text-foreground">{t("features.title1")}</span> <span className="text-primary">{t("features.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} variant="scaleIn" delay={i * 0.1}>
                <Card className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Companies Marquee */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fadeUp">
            <p className="text-center text-muted-foreground font-medium tracking-widest uppercase text-sm mb-10">
              {t("marquee.title")}
            </p>
          </ScrollReveal>
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-16 px-8 shrink-0">
                  {["Mercedes-Benz", "BMW", "Porsche", "Land Rover", "Audi", "Toyota", "Lexus", "Nissan"].map((brand) => (
                    <span
                      key={`${setIndex}-${brand}`}
                      className="font-heading text-2xl font-bold text-muted-foreground/40 hover:text-primary/60 transition-colors select-none"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("services.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <span className="text-foreground">{t("services.title1")}</span> <span className="text-primary">{t("services.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} variant={i % 2 === 0 ? "fadeLeft" : "fadeRight"} delay={i * 0.1}>
                <Link to={service.path}>
                  <Card className="bg-card border-border hover:border-primary transition-all hover:-translate-y-2 group h-full cursor-pointer">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-5 transition-colors">
                        <service.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        {t("services.learnMore")} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flawless Finish */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal variant="blur">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("flawless.subtitle")}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-foreground">{t("flawless.title1")}</span> <span className="text-primary">{t("flawless.title2")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
              {t("flawless.description")}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[t("flawless.trust1"), t("flawless.trust2"), t("flawless.trust3")].map((trust, i) => (
              <ScrollReveal key={trust} variant="scaleIn" delay={i * 0.15}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-heading font-semibold text-foreground">{trust}</p>
                </div>
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
                <span className="text-foreground">{t("portfolio.title1")}</span> <span className="text-primary">{t("portfolio.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolioImages.map((img, i) => (
              <ScrollReveal key={i} variant="scaleIn" delay={i * 0.08}>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer relative">
                  <img src={img} alt={`Portfolio project ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground font-heading font-semibold">
                      {t("portfolio.viewProject")}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="text-center mt-10">
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  {t("portfolio.exploreMore")} <ChevronRight className="h-4 w-4 ms-1 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("testimonials.subtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
                <span className="text-foreground">{t("testimonials.title1")}</span> <span className="text-primary">{t("testimonials.title2")}</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp">
            <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]} className="w-full">
              <CarouselContent className="-ml-4">
                {testimonials.map((t_item, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-secondary border-border/50 h-full">
                      <CardContent className="p-8">
                        <Quote className="h-8 w-8 text-primary/30 mb-4" />
                        <p className="text-muted-foreground mb-6 leading-relaxed">{t_item.text}</p>
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(t_item.rating)].map((_, j) => (
                            <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <img src={t_item.avatar} alt={t_item.name} className="w-10 h-10 rounded-full object-cover" />
                          <p className="font-heading font-semibold text-foreground">{t_item.name}</p>
                        </div>
                      </CardContent>
                    </Card>
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
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="blur">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold mb-6">
                <span className="text-foreground">{t("cta.title1")}</span> <span className="text-primary">{t("cta.title2")}</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t("cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking">
                  <Button size="lg" className="text-base px-8 py-6">{t("cta.bookFree")}</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="text-base px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    {t("cta.contactUs")}
                  </Button>
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
