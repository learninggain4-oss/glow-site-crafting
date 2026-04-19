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

      {/* Enhanced floating particles with trails */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="relative"
          >
            {/* Particle trail */}
            <motion.div
              className={`absolute rounded-full ${
                i % 4 === 0 ? 'bg-primary/50' :
                i % 4 === 1 ? 'bg-blue-400/40' :
                i % 4 === 2 ? 'bg-purple-400/40' :
                'bg-green-400/40'
              }`}
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${20 + Math.random() * 30}px`,
                filter: 'blur(1px)'
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
                scale: [0, 1, 0.3, 1, 0],
                opacity: [0, 0.6, 0.2, 0.8, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
            {/* Main particle */}
            <motion.div
              className={`absolute rounded-full ${
                i % 4 === 0 ? 'bg-primary' :
                i % 4 === 1 ? 'bg-blue-400' :
                i % 4 === 2 ? 'bg-purple-400' :
                'bg-green-400'
              }`}
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`
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
                scale: [0, 1.5, 0.5, 1, 0],
                opacity: [0, 1, 0.4, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          </motion.div>
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
                className="h-24 w-24 text-primary/80"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2.8, ease: "linear", repeat: Infinity }}
              >
                <motion.circle
                  cx="60" cy="60" r="54"
                  className="fill-none stroke-current/20"
                  strokeWidth="8"
                  animate={{
                    strokeDasharray: ["0 339", "169 170", "0 339"],
                    stroke: [
                      "rgba(34,197,94,0.2)",
                      "rgba(59,130,246,0.3)",
                      "rgba(147,51,234,0.2)",
                      "rgba(34,197,94,0.2)"
                    ]
                  }}
                  transition={{
                    strokeDasharray: { duration: 2, repeat: Infinity },
                    stroke: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <motion.circle
                  cx="60" cy="60" r="42"
                  className="fill-none stroke-current/30"
                  strokeWidth="10"
                  animate={{
                    strokeDasharray: ["0 263", "131 132", "0 263"],
                    stroke: [
                      "rgba(34,197,94,0.3)",
                      "rgba(147,51,234,0.4)",
                      "rgba(59,130,246,0.3)",
                      "rgba(34,197,94,0.3)"
                    ]
                  }}
                  transition={{
                    strokeDasharray: { duration: 2.5, repeat: Infinity, delay: 0.5 },
                    stroke: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                  }}
                />
                <motion.circle
                  cx="60" cy="60" r="16"
                  className="fill-current text-primary/80"
                  animate={{
                    scale: [1, 1.3, 1],
                    fill: [
                      "rgba(34,197,94,0.8)",
                      "rgba(59,130,246,0.9)",
                      "rgba(147,51,234,0.8)",
                      "rgba(34,197,94,0.8)"
                    ]
                  }}
                  transition={{
                    scale: { duration: 1.5, repeat: Infinity },
                    fill: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
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
                      scale: [1, 1.4, 1],
                      fill: [
                        "rgba(34,197,94,0.8)",
                        "rgba(59,130,246,0.9)",
                        "rgba(147,51,234,0.8)",
                        "rgba(34,197,94,0.8)"
                      ]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: "easeInOut",
                      fill: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }
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
                      scaleY: [1, 1.5, 1],
                      fill: [
                        "rgba(34,197,94,0.7)",
                        "rgba(59,130,246,0.8)",
                        "rgba(147,51,234,0.7)",
                        "rgba(34,197,94,0.7)"
                      ]
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: index * 0.04,
                      ease: "easeInOut",
                      fill: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.04 }
                    }}
                  />
                ))}
                <motion.circle
                  cx="60" cy="60" r="6"
                  className="fill-current text-primary/90"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.7, 1, 0.7],
                    fill: [
                      "rgba(34,197,94,0.9)",
                      "rgba(251,191,36,1)",
                      "rgba(239,68,68,0.9)",
                      "rgba(34,197,94,0.9)"
                    ]
                  }}
                  transition={{
                    scale: { duration: 1, repeat: Infinity },
                    opacity: { duration: 1, repeat: Infinity },
                    fill: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
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
