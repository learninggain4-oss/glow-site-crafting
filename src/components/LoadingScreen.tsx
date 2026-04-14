import { motion } from "framer-motion";

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
            <svg viewBox="0 0 120 120" className="h-24 w-24 text-primary/80">
              <circle cx="60" cy="60" r="54" className="fill-none stroke-current/20" strokeWidth="8" />
              <circle cx="60" cy="60" r="42" className="fill-none stroke-current/30" strokeWidth="10" />
              <circle cx="60" cy="60" r="16" className="fill-current text-primary/80" />
              {new Array(8).fill(null).map((_, index) => (
                <rect
                  key={index}
                  x="58"
                  y="14"
                  width="4"
                  height="20"
                  rx="2"
                  className="fill-current text-primary/80"
                  transform={`rotate(${index * 45} 60 60)`}
                />
              ))}
              {new Array(16).fill(null).map((_, index) => (
                <rect
                  key={`tread-${index}`}
                  x="56"
                  y="4"
                  width="8"
                  height="12"
                  rx="4"
                  className="fill-current text-primary/70"
                  transform={`rotate(${index * 22.5} 60 60)`}
                />
              ))}
              <circle cx="60" cy="60" r="6" className="fill-current text-primary/90" />
            </svg>
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
