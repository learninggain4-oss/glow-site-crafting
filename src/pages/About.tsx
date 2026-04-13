import { motion } from "framer-motion";
import { Award, Users, Target, Heart, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import aboutStory from "@/assets/about-story.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const About = () => {
  const { t } = useLanguage();

  const values = [
    { title: t("about.qualityFirst"), description: t("about.qualityFirstDesc"), icon: Award },
    { title: t("about.customerFocus"), description: t("about.customerFocusDesc"), icon: Users },
    { title: t("about.innovation"), description: t("about.innovationDesc"), icon: Target },
    { title: t("about.passion"), description: t("about.passionDesc"), icon: Heart },
  ];

  const whyItems = [
    t("about.why1"), t("about.why2"), t("about.why3"),
    t("about.why4"), t("about.why5"), t("about.why6"),
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        {/* Decorative floating elements */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/5"
          animate={{ y: [0, -20, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-primary/5"
          animate={{ y: [0, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-primary font-medium tracking-widest uppercase text-sm">{t("about.subtitle")}</span>
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t("about.title1")} <span className="animate-gradient-text">{t("about.title2")}</span> {t("about.title3")}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
              {t("about.intro")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="fadeLeft">
              <motion.p
                className="text-primary font-medium tracking-widest uppercase text-sm mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {t("about.storySubtitle")}
              </motion.p>
              <h2 className="font-heading text-4xl font-bold mb-6 drop-shadow-sm text-[#5e5555]">{t("about.storyTitle1")} <span className="text-primary">{t("about.storyTitle2")}</span></h2>
              <div className="space-y-4 leading-relaxed">
                {[
                  { text: t("about.storyP1"), color: "text-[#4f4a4a]", delay: 0.1 },
                  { text: t("about.storyP2"), color: "text-[#675f5f]", delay: 0.2 },
                  { text: t("about.storyP3"), color: "text-[#6a5858]", delay: 0.3 },
                ].map((item, i) => (
                  <motion.p
                    key={i}
                    className={item.color}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.delay, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {item.text}
                  </motion.p>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal variant="rotateIn" delay={0.2}>
              <motion.div
                className="aspect-square bg-muted rounded-2xl overflow-hidden floating-shadow"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img src={aboutStory} alt="First Option UAE workshop" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal variant="blur">
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("about.missionSubtitle")}</p>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-6 drop-shadow-sm">{t("about.missionTitle1")} <span className="text-primary">{t("about.missionTitle2")}</span></h2>
              <p className="text-lg text-foreground/70 mb-12">{t("about.missionDesc")}</p>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} variant="flipUp" delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="tilt-card"
                  >
                    <Card className="bg-card border-border text-start card-hover-glow gradient-border">
                      <CardContent className="p-6 flex items-start gap-4">
                        <motion.div
                          className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <v.icon className="h-6 w-6 text-primary" />
                        </motion.div>
                        <div>
                          <h3 className="font-heading font-semibold text-foreground mb-1">{v.title}</h3>
                          <p className="text-sm text-muted-foreground">{v.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal variant="slideUp">
              <div className="text-center mb-12">
                <p className="text-primary font-medium tracking-widest uppercase text-sm mb-2">{t("about.whySubtitle")}</p>
                <h2 className="font-heading text-4xl font-bold drop-shadow-sm border-[#524747] text-[#7c6e6e]">{t("about.whyTitle1")} <span className="text-primary">{t("about.whyTitle2")}</span></h2>
              </div>
            </ScrollReveal>
            <div className="space-y-4">
              {whyItems.map((item, i) => (
                <ScrollReveal key={item} variant="fadeLeft" delay={i * 0.08}>
                  <motion.div
                    className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border ripple-effect"
                    whileHover={{ x: 10, scale: 1.02, borderColor: "hsl(var(--primary) / 0.5)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.4 }}
                      className="animate-breathe"
                    >
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    </motion.div>
                    <span className="text-foreground">{item}</span>
                    <motion.div
                      className="ml-auto"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                    >
                      <Sparkles className="h-4 w-4 text-primary/40" />
                    </motion.div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
