import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[250] grid place-items-center bg-background/95 backdrop-blur-xl px-4 py-8">
      <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-border bg-background/90 px-8 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.7, ease: "linear", repeat: Infinity }}
          className="relative flex h-28 w-28 items-center justify-center rounded-full border border-primary/30"
        >
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute inset-10 rounded-full bg-primary/10" />
          <span className="absolute -right-2 top-1/2 inline-block h-4 w-4 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_rgba(34,197,94,0.35)] animate-pulse" />
          <span className="absolute bottom-0 left-1/2 inline-block h-3 w-3 -translate-x-1/2 rounded-full bg-primary/70 shadow-[0_0_14px_rgba(34,197,94,0.25)] animate-bounce-slow" />
          <span className="absolute left-0 top-1/4 inline-block h-3 w-3 rounded-full bg-primary/60 shadow-[0_0_14px_rgba(34,197,94,0.2)] animate-bounce-slow delay-150" />
        </motion.div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Loading</p>
          <h2 className="font-heading text-3xl font-semibold text-foreground">Preparing your glow</h2>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
