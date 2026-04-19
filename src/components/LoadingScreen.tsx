import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[250] grid place-items-center bg-background/95 backdrop-blur-xl px-4 py-8 overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(34,197,94,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(34,197,94,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Enhanced floating particles background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'bg-primary/40' :
              i % 3 === 1 ? 'bg-blue-400/30' :
              'bg-purple-400/30'
            }`}
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: [0, 1, 0.5, 1, 0],
              opacity: [0, 0.8, 0.4, 0.8, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Ripple effects */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute border-2 border-primary/20 rounded-full"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: [0, 2, 3], opacity: [0.8, 0.4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut"
            }}
            style={{
              width: '200px',
              height: '200px'
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-border bg-background/90 px-8 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.12)] relative backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", type: "spring", stiffness: 100 }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-primary/20 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.14),_transparent_50%)] shadow-[0_0_30px_rgba(34,197,94,0.12)]"
          >
            {/* Multiple animated gradient rings */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              className="absolute inset-1 rounded-full bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 opacity-70"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              className="absolute inset-3 rounded-full bg-gradient-to-r from-blue-400/20 via-primary/40 to-purple-400/20 opacity-50"
            />

            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34,197,94,0.2)",
                  "0 0 40px rgba(34,197,94,0.4)",
                  "0 0 20px rgba(34,197,94,0.2)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-4 rounded-full border-2 border-primary/30 bg-background/80 shadow-[0_0_30px_rgba(34,197,94,0.1)] wheel-glow"
            />

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-950/95 border border-primary/20 shadow-[0_0_18px_rgba(34,197,94,0.18)]"
            >
              <motion.svg
                viewBox="0 0 120 120"
                className="h-24 w-24 text-primary/80"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              >
                <motion.circle
                  cx="60" cy="60" r="54"
                  className="fill-none stroke-current/20"
                  strokeWidth="8"
                  animate={{ strokeDasharray: ["0 339", "169 170", "0 339"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.circle
                  cx="60" cy="60" r="42"
                  className="fill-none stroke-current/30"
                  strokeWidth="10"
                  animate={{ strokeDasharray: ["0 263", "131 132", "0 263"] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle
                  cx="60" cy="60" r="16"
                  className="fill-current text-primary/80"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
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
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: "easeInOut"
                    }}
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
                    animate={{
                      opacity: [0.2, 0.9, 0.2],
                      scaleY: [1, 1.4, 1]
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: index * 0.04,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                <motion.circle
                  cx="60" cy="60" r="6"
                  className="fill-current text-primary/90"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.svg>
            </motion.div>

            {/* Enhanced pulsing dots around the wheel */}
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className={`absolute rounded-full shadow-lg ${
                  i % 4 === 0 ? 'bg-primary' :
                  i % 4 === 1 ? 'bg-blue-400' :
                  i % 4 === 2 ? 'bg-purple-400' :
                  'bg-green-400'
                }`}
                style={{
                  width: `${3 + (i % 2) * 2}px`,
                  height: `${3 + (i % 2) * 2}px`,
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `rotate(${i * 45}deg) translateX(85px) translateY(-50%)`
                }}
                animate={{
                  scale: [0.3, 2, 0.3],
                  opacity: [0.2, 1, 0.2],
                  boxShadow: [
                    "0 0 5px currentColor",
                    "0 0 20px currentColor",
                    "0 0 5px currentColor"
                  ]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Inner rotating elements */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, ease: "linear", repeat: Infinity }}
              className="absolute inset-6 border border-primary/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              className="absolute inset-8 border border-primary/5 rounded-full"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            type: "spring",
            stiffness: 100
          }}
          className="text-center"
        >
          <motion.p
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-2"
          >
            Loading
          </motion.p>
          <motion.h2
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              type: "spring",
              stiffness: 200
            }}
            className="font-heading text-3xl font-semibold text-foreground"
          >
            {"Revving up the ride".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.1,
                  delay: 1 + index * 0.05,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
