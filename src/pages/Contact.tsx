import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";
import { z } from "zod";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contactInfo = [
    { icon: Phone, label: t("contact.phoneLabel"), value: "+971 50 555 1234", href: "tel:+971505551234" },
    { icon: MessageCircle, label: t("contact.whatsapp"), value: "+971 50 555 1234", href: "https://wa.me/971505551234" },
    { icon: Mail, label: t("contact.emailLabel"), value: "info@firstoptionuae.com", href: "mailto:info@firstoptionuae.com" },
    { icon: MapPin, label: t("contact.location"), value: "Al Quoz Industrial Area, Dubai, UAE", href: "#" },
    { icon: Clock, label: t("contact.workingHours"), value: t("footer.workingHours"), href: "#" },
  ];

  const serviceOptions = [
    { label: t("service.autoCare"), value: "auto-care" },
    { label: t("service.accessories"), value: "accessories" },
    { label: t("service.leather"), value: "leather" },
    { label: t("service.electrical"), value: "electrical" },
    { label: t("service.painting"), value: "painting" },
    { label: t("contact.other"), value: "other" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    toast({ title: t("contact.messageSent"), description: t("contact.messageDesc") });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-4">{t("contact.subtitle")}</motion.p>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t("contact.title1")} <span className="animate-gradient-text">{t("contact.title2")}</span>
            </motion.h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal variant="fadeLeft">
              <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 200 }}>
                <Card className="bg-card border-border card-hover-glow">
                  <CardContent className="p-8">
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{t("contact.sendMessage")}</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <Input placeholder={t("contact.name")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02] focus:shadow-lg" />
                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <Input placeholder={t("contact.email")} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02] focus:shadow-lg" />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <Input placeholder={t("contact.phone")} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02] focus:shadow-lg" />
                        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                        <Select value={formData.service} onValueChange={(v) => setFormData({ ...formData, service: v })}>
                          <SelectTrigger className="bg-secondary border-border">
                            <SelectValue placeholder={t("contact.selectService")} />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((s) => (
                              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.service && <p className="text-sm text-destructive mt-1">{errors.service}</p>}
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                        <Textarea placeholder={t("contact.message")} rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02] focus:shadow-lg" />
                        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" className="w-full gap-2 shine-effect" size="lg">
                          <Send className="h-4 w-4" />
                          {t("contact.send")}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal variant="fadeRight" delay={0.2}>
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">{t("contact.infoTitle")}</h2>
                <p className="text-muted-foreground mb-6">{t("contact.infoDesc")}</p>
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
                <ScrollReveal variant="scaleIn" delay={0.5}>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center mt-6 card-hover-glow">
                    <motion.div
                      className="text-center text-muted-foreground"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MapPin className="h-10 w-10 mx-auto mb-2" />
                      <p className="text-sm">Google Maps – Al Quoz, Dubai</p>
                    </motion.div>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
