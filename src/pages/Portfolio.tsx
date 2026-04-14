import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ParticleField from "@/components/ParticleField";
import { useLanguage } from "@/i18n/LanguageContext";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const portfolioImages = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5, portfolio6];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const Portfolio = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = [
    { key: "All", label: t("portfolioPage.all") },
    { key: "Auto Care", label: t("service.autoCare") },
    { key: "Painting", label: t("service.painting") },
    { key: "Leather", label: t("service.leather") },
    { key: "Accessories", label: t("service.accessories") },
  ];

  const portfolioItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `${t("portfolioPage.project")} ${i + 1}`,
    categoryKey: ["Auto Care", "Painting", "Leather", "Accessories"][i % 4],
    image: portfolioImages[i % 6],
  }));

  const beforeAfterItems = [
    { title: t("portfolioPage.beforeAfterCase1"), before: portfolio1, after: portfolio2 },
    { title: t("portfolioPage.beforeAfterCase2"), before: portfolio3, after: portfolio4 },
    { title: t("portfolioPage.beforeAfterCase3"), before: portfolio5, after: portfolio6 },
  ];

  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.categoryKey === filter);

  const getCategoryLabel = (key: string) => categories.find(c => c.key === key)?.label || key;

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <ParticleField count={10} className="opacity-30" />
        <motion.div
          className="absolute top-24 right-20 w-28 h-28 rounded-full bg-primary/5"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-5 left-16 w-16 h-16 rounded-full bg-primary/5"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-4">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-primary font-medium tracking-widest uppercase text-sm">{t("portfolioPage.subtitle")}</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              <TextReveal text={t("portfolioPage.title1")} /> <span className="animate-gradient-text">{t("portfolioPage.title2")}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("portfolioPage.description")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <ParticleField count={5} className="opacity-15" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="slideUp">
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ripple-effect ${
                    filter === cat.key
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:shadow-md"
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 10 }}
                  transition={{ duration: 0.4, delay: i * 0.04, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    onClick={() => setLightbox(item.id)}
                    className="aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer relative floating-shadow tilt-card"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end pb-4 gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ZoomIn className="h-8 w-8 text-primary mb-2" />
                      </motion.div>
                      <span className="text-foreground font-heading font-semibold translate-y-2 group-hover:translate-y-0 transition-transform">
                        {item.title}
                      </span>
                      <span className="text-primary text-sm translate-y-2 group-hover:translate-y-0 transition-transform delay-75">
                        {getCategoryLabel(item.categoryKey)}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background/90 relative overflow-hidden">
        <ParticleField count={6} className="opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal variant="fadeUp">
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("portfolioPage.beforeAfterSubtitle")}</p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold">{t("portfolioPage.beforeAfterTitle")}</h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">{t("portfolioPage.beforeAfterDesc")}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beforeAfterItems.map((item, i) => (
              <ScrollReveal key={item.title} variant="fadeUp" delay={i * 0.1}>
                <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-sm">
                  <div className="grid grid-cols-1 gap-3 p-6">
                    <div>
                      <p className="text-sm text-primary uppercase tracking-[0.2em] mb-2">{item.title}</p>
                      <div className="relative overflow-hidden rounded-3xl">
                        <img src={item.before} alt={`${item.title} before`} className="w-full h-56 object-cover" />
                        <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">{t("portfolioPage.beforeText")}</span>
                      </div>
                    </div>
                    <div>
                      <div className="relative overflow-hidden rounded-3xl">
                        <img src={item.after} alt={`${item.title} after`} className="w-full h-56 object-cover" />
                        <span className="absolute top-4 left-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">{t("portfolioPage.afterText")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.button
              onClick={() => setLightbox(null)}
              className="absolute top-6 end-6 w-10 h-10 rounded-full bg-card flex items-center justify-center"
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <X className="h-5 w-5 text-foreground" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotateY: -30 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.3, opacity: 0, rotateY: 30 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-3xl w-full aspect-video bg-muted rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox !== null && (
                <img
                  src={portfolioItems.find(p => p.id === lightbox)?.image}
                  alt="Portfolio project"
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Portfolio;
