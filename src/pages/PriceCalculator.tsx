import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Car, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ParticleField from "@/components/ParticleField";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

type ServiceKey = "autoCare" | "painting" | "leather" | "accessories" | "electrical";
type VehicleKey = "sedan" | "suv" | "luxury" | "sports";

const SERVICE_BASE: Record<ServiceKey, number> = {
  autoCare: 250,
  painting: 1200,
  leather: 800,
  accessories: 400,
  electrical: 350,
};

const VEHICLE_MULTIPLIER: Record<VehicleKey, number> = {
  sedan: 1,
  suv: 1.4,
  luxury: 1.8,
  sports: 2.1,
};

const ADDONS: { key: string; price: number; labelKey: string }[] = [
  { key: "ceramic", price: 600, labelKey: "calc.addon.ceramic" },
  { key: "interiorDetail", price: 250, labelKey: "calc.addon.interior" },
  { key: "engineWash", price: 150, labelKey: "calc.addon.engine" },
  { key: "ppf", price: 900, labelKey: "calc.addon.ppf" },
];

const PriceCalculator = () => {
  const { t } = useLanguage();
  const [service, setService] = useState<ServiceKey | "">("");
  const [vehicle, setVehicle] = useState<VehicleKey | "">("");
  const [addons, setAddons] = useState<string[]>([]);

  const services: { key: ServiceKey; label: string }[] = [
    { key: "autoCare", label: t("service.autoCare") },
    { key: "painting", label: t("service.painting") },
    { key: "leather", label: t("service.leather") },
    { key: "accessories", label: t("service.accessories") },
    { key: "electrical", label: t("service.electrical") },
  ];

  const vehicles: { key: VehicleKey; label: string }[] = [
    { key: "sedan", label: t("calc.vehicle.sedan") },
    { key: "suv", label: t("calc.vehicle.suv") },
    { key: "luxury", label: t("calc.vehicle.luxury") },
    { key: "sports", label: t("calc.vehicle.sports") },
  ];

  const { base, vehicleAdj, addonsTotal, total } = useMemo(() => {
    const base = service ? SERVICE_BASE[service] : 0;
    const mult = vehicle ? VEHICLE_MULTIPLIER[vehicle] : 1;
    const vehicleAdj = base * mult - base;
    const addonsTotal = addons.reduce((sum, k) => sum + (ADDONS.find(a => a.key === k)?.price ?? 0), 0);
    const total = base * mult + addonsTotal;
    return { base, vehicleAdj, addonsTotal, total };
  }, [service, vehicle, addons]);

  const toggleAddon = (key: string) =>
    setAddons(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  const ready = service && vehicle;

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
        <ParticleField count={10} className="opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 mb-4">
            <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="text-primary font-medium tracking-widest uppercase text-sm">{t("calc.subtitle")}</span>
          </motion.div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
            <TextReveal text={t("calc.title")} />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("calc.description")}</p>
        </div>
      </section>

      <section className="pb-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service */}
              <ScrollReveal variant="fadeUp">
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-heading text-xl font-bold text-foreground">{t("calc.step1")}</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map((s, i) => (
                      <motion.button
                        key={s.key}
                        type="button"
                        onClick={() => setService(s.key)}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                          service === s.key
                            ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20"
                            : "border-border bg-background hover:border-primary/40 text-foreground"
                        }`}
                      >
                        {s.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Vehicle */}
              <ScrollReveal variant="fadeUp" delay={0.05}>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Car className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-heading text-xl font-bold text-foreground">{t("calc.step2")}</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {vehicles.map((v, i) => (
                      <motion.button
                        key={v.key}
                        type="button"
                        onClick={() => setVehicle(v.key)}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                          vehicle === v.key
                            ? "border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20"
                            : "border-border bg-background hover:border-primary/40 text-foreground"
                        }`}
                      >
                        {v.label}
                        <span className="block text-xs text-muted-foreground mt-1">
                          ×{VEHICLE_MULTIPLIER[v.key]}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Addons */}
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-heading text-xl font-bold text-foreground">{t("calc.step3")}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ADDONS.map((a, i) => {
                      const active = addons.includes(a.key);
                      return (
                        <motion.button
                          key={a.key}
                          type="button"
                          onClick={() => toggleAddon(a.key)}
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-start ${
                            active
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-background hover:border-primary/40 text-foreground"
                          }`}
                        >
                          <span className="flex items-center gap-2 text-sm font-medium">
                            <CheckCircle2 className={`h-4 w-4 ${active ? "opacity-100" : "opacity-30"}`} />
                            {t(a.labelKey as any)}
                          </span>
                          <span className="text-sm font-bold">+{a.price} AED</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Quote summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <ScrollReveal variant="scaleIn">
                  <motion.div
                    className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground rounded-2xl p-7 shadow-2xl shadow-primary/30 overflow-hidden relative"
                    layout
                  >
                    <motion.div
                      className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="flex items-center gap-2 mb-2 relative z-10">
                      <Calculator className="h-5 w-5" />
                      <span className="uppercase tracking-widest text-xs font-semibold opacity-90">
                        {t("calc.estimate")}
                      </span>
                    </div>
                    <motion.div
                      key={total}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="font-heading text-5xl font-extrabold relative z-10"
                    >
                      {total.toLocaleString()} <span className="text-2xl font-bold opacity-80">AED</span>
                    </motion.div>
                    <p className="text-xs opacity-80 mt-1 relative z-10">{t("calc.estimateNote")}</p>

                    <div className="mt-5 pt-5 border-t border-primary-foreground/20 space-y-2 text-sm relative z-10">
                      <Row label={t("calc.row.base")} value={base} />
                      <Row label={t("calc.row.vehicleAdj")} value={vehicleAdj} />
                      <Row label={t("calc.row.addons")} value={addonsTotal} />
                    </div>

                    <Link
                      to="/booking"
                      state={{ service, addOns }}
                      className="block mt-6 relative z-10"
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="w-full gap-2 group"
                        disabled={!ready}
                      >
                        {t("calc.bookNow")}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                      </Button>
                    </Link>
                    {!ready && (
                      <p className="text-xs opacity-80 mt-3 text-center relative z-10">
                        {t("calc.selectPrompt")}
                      </p>
                    )}
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const Row = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between opacity-90">
    <span>{label}</span>
    <span className="font-semibold">{value.toLocaleString()} AED</span>
  </div>
);

export default PriceCalculator;
