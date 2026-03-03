import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, X } from "lucide-react";
import Layout from "@/components/Layout";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const categories = ["All", "Auto Care", "Painting", "Leather", "Accessories"];

const portfolioItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Project ${i + 1}`,
  category: categories[1 + (i % 4)],
}));

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Portfolio</motion.p>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Work</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our completed projects and see the quality we deliver.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                layout
                onClick={() => setLightbox(item.id)}
                className="aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer relative"
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                  <Car className="h-10 w-10 text-muted-foreground/40" />
                </div>
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-colors flex flex-col items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground font-heading font-semibold">
                    {item.title}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-sm">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-card flex items-center justify-center"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-3xl w-full aspect-video bg-muted rounded-2xl overflow-hidden flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                <Car className="h-20 w-20 text-muted-foreground/40" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Portfolio;
