import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { z } from "zod";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  service: z.string().min(1, "Please select a service"),
  vehicleMake: z.string().trim().min(1, "Vehicle make is required").max(50),
  vehicleModel: z.string().trim().min(1, "Vehicle model is required").max(50),
  vehicleYear: z.string().trim().min(1, "Vehicle year is required").max(4),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().max(500).optional(),
});

const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
];

const Booking = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "",
    vehicleMake: "", vehicleModel: "", vehicleYear: "",
    time: "", notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const serviceOptions = [
    { label: t("service.autoCare"), value: "auto-care" },
    { label: t("service.accessories"), value: "accessories" },
    { label: t("service.leather"), value: "leather" },
    { label: t("service.electrical"), value: "electrical" },
    { label: t("service.painting"), value: "painting" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse({ ...formData, date });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast({ title: t("booking.confirmed"), description: t("booking.confirmedDesc") });
  };

  if (submitted) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-center max-w-md"
          >
            <motion.div
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <CheckCircle className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">{t("booking.confirmed")}</h2>
              <p className="text-muted-foreground mb-8">{t("booking.confirmedDesc")}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", service: "", vehicleMake: "", vehicleModel: "", vehicleYear: "", time: "", notes: "" }); setDate(undefined); }}>
                {t("booking.bookAnother")}
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeInUp} className="text-primary font-medium tracking-widest uppercase text-sm mb-4">{t("booking.subtitle")}</motion.p>
            <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t("booking.title1")} <span className="animate-gradient-text">{t("booking.title2")}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("booking.description")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal variant="fadeUp">
            <motion.div whileHover={{ scale: 1.005 }} transition={{ type: "spring", stiffness: 200 }}>
              <Card className="bg-card border-border card-hover-glow">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={sectionReveal} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        {t("booking.contactInfo")}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Input placeholder={t("booking.fullName")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02]" />
                          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <Input placeholder={t("contact.email")} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02]" />
                          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                        </div>
                        <div className="sm:col-span-2">
                          <Input placeholder={t("contact.phone")} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02]" />
                          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={sectionReveal} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        {t("booking.serviceDetails")}
                      </h3>
                      <div>
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
                      </div>
                    </motion.div>

                    <motion.div variants={sectionReveal} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        {t("booking.vehicleInfo")}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Input placeholder={t("booking.make")} value={formData.vehicleMake} onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02]" />
                          {errors.vehicleMake && <p className="text-sm text-destructive mt-1">{errors.vehicleMake}</p>}
                        </div>
                        <div>
                          <Input placeholder={t("booking.model")} value={formData.vehicleModel} onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02]" />
                          {errors.vehicleModel && <p className="text-sm text-destructive mt-1">{errors.vehicleModel}</p>}
                        </div>
                        <div>
                          <Input placeholder={t("booking.year")} value={formData.vehicleYear} onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.02]" />
                          {errors.vehicleYear && <p className="text-sm text-destructive mt-1">{errors.vehicleYear}</p>}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={sectionReveal} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        {t("booking.dateTime")}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-secondary border-border", !date && "text-muted-foreground")}>
                                <CalendarIcon className="me-2 h-4 w-4" />
                                {date ? format(date, "PPP") : t("booking.pickDate")}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                            </PopoverContent>
                          </Popover>
                          {errors.date && <p className="text-sm text-destructive mt-1">{errors.date}</p>}
                        </div>
                        <div>
                          <Select value={formData.time} onValueChange={(v) => setFormData({ ...formData, time: v })}>
                            <SelectTrigger className="bg-secondary border-border">
                              <SelectValue placeholder={t("booking.selectTime")} />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((ts) => (
                                <SelectItem key={ts} value={ts}>{ts}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.time && <p className="text-sm text-destructive mt-1">{errors.time}</p>}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={sectionReveal} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                      <Textarea placeholder={t("booking.notes")} rows={3} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="bg-secondary border-border transition-all focus:scale-[1.01]" />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" className="w-full shine-effect animate-pulse-glow" size="lg">{t("booking.confirm")}</Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
