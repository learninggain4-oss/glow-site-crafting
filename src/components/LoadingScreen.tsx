import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[250] grid place-items-center bg-background/95 backdrop-blur-xl px-4 py-8 overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-border bg-background/90 px-8 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.12)] relative">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
            className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-primary/20 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.14),_transparent_50%)] shadow-[0_0_30px_rgba(34,197,94,0.12)]"
          >
            {/* Animated gradient ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              className="absolute inset-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-60"
            />

            <div className="absolute inset-4 rounded-full border-2 border-primary/30 bg-background/80 shadow-[0_0_30px_rgba(34,197,94,0.1)] wheel-glow" />

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-950/95 border border-primary/20 shadow-[0_0_18px_rgba(34,197,94,0.18)]"
            >
              <motion.svg
                viewBox="0 0 120 120"
                className="h-24 w-24 text-primary/80"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              >
                <circle cx="60" cy="60" r="54" className="fill-none stroke-current/20" strokeWidth="8" />
                <circle cx="60" cy="60" r="42" className="fill-none stroke-current/30" strokeWidth="10" />
                <circle cx="60" cy="60" r="16" className="fill-current text-primary/80" />
                {new Array(8).fill(null).map((_, index) => (
                  <motion.rect
                    key={index}
                    x="58"
                    y="14"
                    width="4"
                    height="20"
                    rx="2"
                    className="fill-current text-primary/80"
                    transform={`rotate(${index * 45} 60 60)`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
                  />
                ))}
                {new Array(16).fill(null).map((_, index) => (
                  <motion.rect
                    key={`tread-${index}`}
                    x="56"
                    y="4"
                    width="8"
                    height="12"
                    rx="4"
                    className="fill-current text-primary/70"
                    transform={`rotate(${index * 22.5} 60 60)`}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.05 }}
                  />
                ))}
                <circle cx="60" cy="60" r="6" className="fill-current text-primary/90" />
              </motion.svg>
            </motion.div>

            {/* Pulsing dots around the wheel */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_20px_rgba(34,197,94,0.35)]"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `rotate(${i * 60}deg) translateX(80px) translateY(-50%)`
                }}
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs uppercase tracking-[0.35em] text-muted-foreground"
          >
            Loading
          </motion.p>
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="font-heading text-3xl font-semibold text-foreground"
          >
            Revving up the ride
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
