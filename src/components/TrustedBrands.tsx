import { motion } from "framer-motion";
import type { SVGProps } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

type BrandLogo = (props: SVGProps<SVGSVGElement>) => JSX.Element;

type Brand = {
  name: string;
  Logo: BrandLogo;
};

const brands: Brand[] = [
  {
    name: "Mercedes-Benz",
    Logo: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 L12 12 L19.5 17.3" />
        <path d="M12 12 L4.5 17.3" />
        <path d="M12 2 L12 12 L12 22" />
      </svg>
    ),
  },
  {
    name: "BMW",
    Logo: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 v20" />
        <path d="M2 12 h20" />
        <path d="M5.75 5.75 l12.5 12.5" />
        <path d="M18.25 5.75 l-12.5 12.5" />
      </svg>
    ),
  },
  {
    name: "Porsche",
    Logo: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 4 h12 l2 6 v8 a2 2 0 0 1 -2 2 h-8 a2 2 0 0 1 -2 -2 v-8 z" />
        <path d="M12 8 v8" />
        <path d="M8 12 h8" />
      </svg>
    ),
  },
  {
    name: "Land Rover",
    Logo: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
        <ellipse cx="12" cy="12" rx="8" ry="5" />
        <path d="M7.5 12 h9" />
        <path d="M9.75 9.5 v5" />
      </svg>
    ),
  },
  {
    name: "Audi",
    Logo: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
        <circle cx="6" cy="12" r="3" />
        <circle cx="10.5" cy="12" r="3" />
        <circle cx="15" cy="12" r="3" />
        <circle cx="19.5" cy="12" r="3" />
      </svg>
    ),
  },
  {
    name: "Toyota",
    Logo: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
        <ellipse cx="12" cy="12" rx="7.5" ry="4.5" />
        <path d="M6.3 8.5 c1.8 2.8 4 4.2 5.7 5.3 c1.7 -1.1 3.9 -2.5 5.7 -5.3" />
        <path d="M7.5 15.2 c2.8 -0.9 5.8 -0.9 8.5 0" />
      </svg>
    ),
  },
  {
    name: "Lexus",
    Logo: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
        <ellipse cx="12" cy="12" rx="8" ry="8" />
        <path d="M9 16 l3 -8 l3 8" />
      </svg>
    ),
  },
  {
    name: "Nissan",
    Logo: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
        <circle cx="12" cy="12" r="8" />
        <path d="M5 12 h14" />
        <path d="M8 9 h8" />
      </svg>
    ),
  },
];

const TrustedBrands = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-background/90 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent blur-3xl" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <p className="text-primary font-medium tracking-[0.4em] uppercase text-sm mb-4">{t("marquee.title")}</p>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-foreground">Premium partners</span>{" "}
            <span className="text-primary">with real logos</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
            Real brand trust, showcased in a premium display for your auto care audience.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group rounded-[32px] border border-border/70 bg-card/80 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-950/5 text-foreground shadow-lg shadow-slate-950/15">
                <brand.Logo className="h-12 w-12" />
              </div>
              <p className="mt-6 text-center text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {brand.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
