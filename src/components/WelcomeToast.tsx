import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface WelcomeToastProps {
  title: string;
  description: string;
  onDismiss?: () => void;
}

const WelcomeToast = ({ title, description }: WelcomeToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.95 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[360px] max-w-[92vw] overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-background via-background to-primary/10 p-[1px] shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.5)]"
    >
      {/* animated gradient ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-60"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(var(--primary)/0.7), transparent 30%, hsl(var(--primary)/0.5) 60%, transparent 90%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative rounded-2xl bg-background/95 backdrop-blur-xl px-4 py-3.5">
        {/* shimmer sweep */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-primary/15 to-transparent"
          initial={{ x: "-120%" }}
          animate={{ x: "220%" }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
        />

        {/* floating sparkles */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute text-primary/70"
            style={{
              top: `${15 + i * 18}%`,
              right: `${10 + i * 12}%`,
            }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [-2, -10, -18],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          >
            <Sparkles className="h-3 w-3" />
          </motion.span>
        ))}

        <div className="relative flex items-start gap-3">
          {/* icon badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 14 }}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/40"
          >
            <CheckCircle2 className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-xl bg-primary"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 1.6 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-sm font-extrabold tracking-tight text-foreground">
                {title}
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* progress bar */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-primary/70 to-primary/30"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

export default WelcomeToast;
