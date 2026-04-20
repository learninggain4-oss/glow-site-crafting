import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[250] grid place-items-center bg-background/95 backdrop-blur-xl px-4 py-8 overflow-hidden">
      {/* Advanced animated background with morphing shapes */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.1) 30%, transparent 60%)",
            "radial-gradient(circle at 80% 20%, rgba(147,51,234,0.15) 0%, rgba(34,197,94,0.1) 30%, transparent 60%)",
            "radial-gradient(circle at 40% 80%, rgba(34,197,94,0.15) 0%, rgba(239,68,68,0.1) 30%, transparent 60%)",
            "radial-gradient(circle at 60% 30%, rgba(59,130,246,0.15) 0%, rgba(147,51,234,0.1) 30%, transparent 60%)",
            "radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.1) 30%, transparent 60%)"
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Morphing background shapes */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute opacity-10"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              background: `linear-gradient(45deg, ${
                i % 5 === 0 ? 'rgba(34,197,94,0.2)' :
                i % 5 === 1 ? 'rgba(59,130,246,0.2)' :
                i % 5 === 2 ? 'rgba(147,51,234,0.2)' :
                i % 5 === 3 ? 'rgba(239,68,68,0.2)' :
                'rgba(251,191,36,0.2)'
              }, transparent)`
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
              scale: 0.5
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
              rotate: [0, 180, 360],
              scale: [0.5, 1.2, 0.8, 1, 0.5],
              borderRadius: ["50%", "20%", "80%", "30%", "50%"]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Refined motion rays for cleaner animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${80 + i * 20}px`,
              height: `${80 + i * 20}px`,
              border: '1px solid rgba(255,255,255,0.08)'
            }}
            animate={{
              scale: [0.9, 1.04, 0.9],
              opacity: [0.12, 0.4, 0.12],
              rotate: [0, 8, 0]
            }}
            transition={{
              duration: 4.2 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      {/* Advanced ripple effects with multiple layers */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className={`absolute border-2 rounded-full ${
              i % 4 === 0 ? 'border-primary/30' :
              i % 4 === 1 ? 'border-blue-400/25' :
              i % 4 === 2 ? 'border-purple-400/25' :
              'border-green-400/25'
            }`}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{
              scale: [0, 1.5, 2.5, 3.5],
              opacity: [0.6, 0.4, 0.2, 0],
              borderWidth: [2, 1, 0.5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
            style={{
              width: '250px',
              height: '250px'
            }}
          />
        ))}
      </div>

      {/* Breathing container */}
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center gap-6 rounded-[2rem] border border-border bg-background/90 px-8 py-10 shadow-[0_30px_80px_rgba(15,23,42,0.12)] relative backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 120 }}
          className="relative"
        >
          {/* Magnetic field effect */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-gradient-radial from-primary/20 to-transparent"
          />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
            className="relative flex h-36 w-36 items-center justify-center rounded-full border-4 border-primary/20 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.14),_transparent_50%)] shadow-[0_0_30px_rgba(34,197,94,0.12)]"
          >
            {/* Multiple animated gradient rings with color shifts */}
            <motion.div
              animate={{
                rotate: -360,
                background: [
                  "conic-gradient(from 0deg, rgba(34,197,94,0.3), rgba(59,130,246,0.3), rgba(147,51,234,0.3), rgba(34,197,94,0.3))",
                  "conic-gradient(from 90deg, rgba(147,51,234,0.3), rgba(34,197,94,0.3), rgba(59,130,246,0.3), rgba(147,51,234,0.3))",
                  "conic-gradient(from 180deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3), rgba(34,197,94,0.3), rgba(59,130,246,0.3))",
                  "conic-gradient(from 270deg, rgba(34,197,94,0.3), rgba(59,130,246,0.3), rgba(147,51,234,0.3), rgba(34,197,94,0.3))"
                ]
              }}
              transition={{
                rotate: { duration: 3, ease: "linear", repeat: Infinity },
                background: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-1 rounded-full opacity-70"
            />
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: { duration: 4, ease: "linear", repeat: Infinity },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-3 rounded-full bg-gradient-to-r from-blue-400/20 via-primary/40 to-purple-400/20 opacity-50"
            />

            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(34,197,94,0.2), inset 0 0 20px rgba(34,197,94,0.1)",
                  "0 0 40px rgba(59,130,246,0.3), inset 0 0 30px rgba(59,130,246,0.15)",
                  "0 0 20px rgba(147,51,234,0.2), inset 0 0 20px rgba(147,51,234,0.1)",
                  "0 0 20px rgba(34,197,94,0.2), inset 0 0 20px rgba(34,197,94,0.1)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-4 rounded-full border-2 border-primary/30 bg-background/80 shadow-[0_0_30px_rgba(34,197,94,0.1)] wheel-glow"
            />

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 3, -3, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-950/95 border border-primary/20 shadow-[0_0_18px_rgba(34,197,94,0.18)]"
            >
            <motion.svg
                viewBox="0 0 120 120"
                className="h-24 w-24"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
              >
                <defs>
                  <radialGradient id="tireGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="40%" stopColor="rgba(15,23,42,0.95)" />
                    <stop offset="100%" stopColor="rgba(15,23,42,0.8)" />
                  </radialGradient>
                  <radialGradient id="rimGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="18%" stopColor="rgba(248,250,252,0.98)" />
                    <stop offset="100%" stopColor="rgba(148,163,184,0.55)" />
                  </radialGradient>
                  <linearGradient id="spokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(248,250,252,0.96)" />
                    <stop offset="100%" stopColor="rgba(148,163,184,0.82)" />
                  </linearGradient>
                </defs>
                {/* Tire */}
                <circle
                  cx="60" cy="60" r="54"
                  fill="url(#tireGradient)"
                  stroke="rgba(15,23,42,0.9)"
                  strokeWidth="8"
                />
                {/* Tread pattern */}
                {new Array(24).fill(null).map((_, index) => (
                  <rect
                    key={`tread-${index}`}
                    x="57"
                    y="4"
                    width="6"
                    height="12"
                    rx="3"
                    fill="rgba(15,23,42,0.85)"
                    transform={`rotate(${index * 15} 60 60)`}
                  />
                ))}
                {/* Rim */}
                <circle
                  cx="60" cy="60" r="42"
                  fill="url(#rimGradient)"
                  stroke="rgba(148,163,184,0.4)"
                  strokeWidth="2"
                />
                <circle
                  cx="60" cy="60" r="34"
                  fill="rgba(15,23,42,0.12)"
                  stroke="rgba(148,163,184,0.25)"
                  strokeWidth="2"
                />
                {/* Spokes */}
                {new Array(5).fill(null).map((_, index) => (
                  <path
                    key={`spoke-${index}`}
                    d="M60 60 L60 18 Q62 16 66 18 L66 42 Q64 45 60 45 Q56 45 54 42 L54 18 Q58 16 60 18 Z"
                    fill="url(#spokeGradient)"
                    transform={`rotate(${index * 72} 60 60)`}
                  />
                ))}
                {/* Inner hub ring */}
                <circle
                  cx="60" cy="60" r="16"
                  fill="rgba(248,250,252,1)"
                  stroke="rgba(148,163,184,0.55)"
                  strokeWidth="3"
                />
                {/* Lug nuts */}
                {new Array(5).fill(null).map((_, index) => (
                  <circle
                    key={`lug-${index}`}
                    cx={60 + 18 * Math.cos((index * 72) * Math.PI / 180)}
                    cy={60 + 18 * Math.sin((index * 72) * Math.PI / 180)}
                    r="2.5"
                    fill="rgba(71,85,105,1)"
                  />
                ))}
                {/* Center cap */}
                <circle
                  cx="60" cy="60" r="6"
                  fill="rgba(248,250,252,0.98)"
                  stroke="rgba(148,163,184,0.55)"
                  strokeWidth="1.5"
                />
              </motion.svg>
            </motion.div>

            {/* Enhanced pulsing dots with color cycling */}
            {[...Array(10)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full shadow-lg"
                style={{
                  width: `${3 + (i % 3) * 2}px`,
                  height: `${3 + (i % 3) * 2}px`,
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `rotate(${i * 36}deg) translateX(90px) translateY(-50%)`
                }}
                animate={{
                  scale: [0.2, 2.5, 0.2],
                  opacity: [0.1, 1, 0.1],
                  backgroundColor: [
                    "rgba(34,197,94,1)",
                    "rgba(59,130,246,1)",
                    "rgba(147,51,234,1)",
                    "rgba(239,68,68,1)",
                    "rgba(251,191,36,1)",
                    "rgba(34,197,94,1)"
                  ],
                  boxShadow: [
                    "0 0 5px rgba(34,197,94,0.5)",
                    "0 0 15px rgba(59,130,246,0.7)",
                    "0 0 20px rgba(147,51,234,0.6)",
                    "0 0 15px rgba(239,68,68,0.7)",
                    "0 0 20px rgba(251,191,36,0.8)",
                    "0 0 5px rgba(34,197,94,0.5)"
                  ]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Inner rotating elements with glow */}
            <motion.div
              animate={{
                rotate: -360,
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                rotate: { duration: 6, ease: "linear", repeat: Infinity },
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-6 border border-primary/10 rounded-full shadow-[inset_0_0_10px_rgba(34,197,94,0.1)]"
            />
            <motion.div
              animate={{
                rotate: 360,
                opacity: [0.05, 0.2, 0.05]
              }}
              transition={{
                rotate: { duration: 4, ease: "linear", repeat: Infinity },
                opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-8 border border-primary/5 rounded-full shadow-[inset_0_0_5px_rgba(59,130,246,0.05)]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.7,
            type: "spring",
            stiffness: 120
          }}
          className="text-center"
        >
          <motion.p
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.9, 1.1, 0.9],
              color: [
                "rgba(107,114,128,1)",
                "rgba(34,197,94,0.8)",
                "rgba(59,130,246,0.8)",
                "rgba(107,114,128,1)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-xs uppercase tracking-[0.35em] text-muted-foreground mb-3"
          >
            Loading
          </motion.p>
          <motion.h2
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 1,
              type: "spring",
              stiffness: 150
            }}
            className="font-heading text-3xl font-semibold text-foreground"
          >
            {"Revving up the ride".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  color: [
                    "rgba(15,23,42,1)",
                    "rgba(34,197,94,1)",
                    "rgba(59,130,246,1)",
                    "rgba(147,51,234,1)",
                    "rgba(15,23,42,1)"
                  ]
                }}
                transition={{
                  duration: 0.08,
                  delay: 1.2 + index * 0.03,
                  ease: "easeOut",
                  color: {
                    duration: 2,
                    repeat: Infinity,
                    delay: 1.5 + index * 0.1,
                    ease: "easeInOut"
                  }
                }}
                className="inline-block"
                style={{ perspective: "1000px" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
