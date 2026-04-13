import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
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

  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.categoryKey === filter);

  const getCategoryLabel = (key: string) => categories.find(c => c.key === key)?.label || key;

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-4">{t("portfolioPage.subtitle")}</motion.p>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t("portfolioPage.title1")} <span className="animate-gradient-text">{t("portfolioPage.title2")}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("portfolioPage.description")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fadeUp">
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === cat.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <motion.div
                    onClick={() => setLightbox(item.id)}
                    className="aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer relative"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/70 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ZoomIn className="h-8 w-8 text-primary mb-2" />
                      </motion.div>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground font-heading font-semibold translate-y-2 group-hover:translate-y-0 duration-300">
                        {item.title}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-sm translate-y-2 group-hover:translate-y-0 duration-500">
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

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
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
              initial={{ scale: 0.5, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-3xl w-full aspect-video bg-muted rounded-2xl overflow-hidden flex items-center justify-center"
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
