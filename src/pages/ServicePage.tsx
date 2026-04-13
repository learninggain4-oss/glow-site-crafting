import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Wrench, Sofa, Zap, Palette, CheckCircle, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { TranslationKey } from "@/i18n/translations";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const serviceConfig: Record<string, {
  titleKey: TranslationKey;
  descKey: TranslationKey;
  longDescKey: TranslationKey;
  icon: typeof Car;
  featureKeys: TranslationKey[];
}> = {
  "auto-care": {
    titleKey: "service.autoCare",
    descKey: "service.autoCareDesc",
    longDescKey: "service.autoCare.long",
    icon: Car,
    featureKeys: ["service.ac.f1", "service.ac.f2", "service.ac.f3", "service.ac.f4", "service.ac.f5", "service.ac.f6"],
  },
  accessories: {
    titleKey: "service.accessories",
    descKey: "service.accessoriesDesc",
    longDescKey: "service.accessories.long",
    icon: Wrench,
    featureKeys: ["service.acc.f1", "service.acc.f2", "service.acc.f3", "service.acc.f4", "service.acc.f5", "service.acc.f6"],
  },
  leather: {
    titleKey: "service.leather",
    descKey: "service.leatherDesc",
    longDescKey: "service.leather.long",
    icon: Sofa,
    featureKeys: ["service.lth.f1", "service.lth.f2", "service.lth.f3", "service.lth.f4", "service.lth.f5", "service.lth.f6"],
  },
  electrical: {
    titleKey: "service.electrical",
    descKey: "service.electricalDesc",
    longDescKey: "service.electrical.long",
    icon: Zap,
    featureKeys: ["service.elc.f1", "service.elc.f2", "service.elc.f3", "service.elc.f4", "service.elc.f5", "service.elc.f6"],
  },
  painting: {
    titleKey: "service.painting",
    descKey: "service.paintingDesc",
    longDescKey: "service.painting.long",
    icon: Palette,
    featureKeys: ["service.pnt.f1", "service.pnt.f2", "service.pnt.f3", "service.pnt.f4", "service.pnt.f5", "service.pnt.f6"],
  },
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const config = slug ? serviceConfig[slug] : null;

  if (!config) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">{t("servicePage.notFound")}</h1>
            <Link to="/"><Button>{t("servicePage.goHome")}</Button></Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const Icon = config.icon;

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeInUp}
              className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
              <span className="animate-gradient-text">{t(config.titleKey)}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">{t(config.descKey)}</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <ScrollReveal variant="fadeLeft">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">{t("servicePage.aboutService")} <span className="text-primary">{t("servicePage.service")}</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{t(config.longDescKey)}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="gap-2 shine-effect animate-pulse-glow">
                      {t("servicePage.bookThis")} <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      {t("servicePage.getQuote")}
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fadeRight" delay={0.2}>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }}>
                <Card className="bg-card border-border card-hover-glow">
                  <CardContent className="p-8">
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      {t("servicePage.whatsIncluded")}
                    </h3>
                    <div className="space-y-4">
                      {config.featureKeys.map((key, i) => (
                        <motion.div
                          key={key}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          whileHover={{ x: 8 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.4 }}
                          >
                            <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                          </motion.div>
                          <span className="text-foreground">{t(key)}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal variant="blur">
            <h2 className="font-heading text-4xl font-bold text-foreground mb-6">
              {t("servicePage.readyTitle")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {t("servicePage.readyDesc")}
            </p>
            <Link to="/booking">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button size="lg" className="text-base px-8 py-6 shine-effect animate-pulse-glow">{t("hero.bookNow")}</Button>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default ServicePage;
