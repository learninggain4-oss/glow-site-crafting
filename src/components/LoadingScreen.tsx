import { motion } from "framer-motion";
import { Car } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[250] grid place-items-center bg-background/95 backdrop-blur-xl px-4 py-8">
      <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-border bg-background/90 px-8 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
          className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-primary/20 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.14),_transparent_50%)] shadow-[0_0_30px_rgba(34,197,94,0.12)]"
        >
          <div className="absolute inset-4 rounded-full border-2 border-primary/30 bg-background/80 shadow-[0_0_30px_rgba(34,197,94,0.1)] wheel-glow" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-950/95 border border-primary/20 shadow-[0_0_18px_rgba(34,197,94,0.18)]">
            <div className="absolute inset-4 rounded-full bg-slate-950/90" />
            {Array.from({ length: 6 }).map((_, index) => (
              <span
                key={index}
                className="absolute left-1/2 top-1/2 h-10 w-[2px] rounded-full bg-primary/80"
                style={{ transform: `translate(-50%, -100%) rotate(${index * 60}deg)` }}
              />
            ))}
            <span className="absolute inset-0 rounded-full border border-primary/30" />
            <Car className="relative h-10 w-10 text-primary/80 drop-shadow-[0_0_20px_rgba(34,197,94,0.2)]" />
          </div>
          <span className="absolute -right-2 top-1/2 inline-block h-4 w-4 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_20px_rgba(34,197,94,0.35)] animate-pulse" />
        </motion.div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Loading</p>
          <h2 className="font-heading text-3xl font-semibold text-foreground">Revving up the ride</h2>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
