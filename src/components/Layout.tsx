import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";
import ScrollProgress from "./ScrollProgress";
import PageTransition from "./PageTransition";

const layoutTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark min-h-screen flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute left-10 top-24 h-36 w-36 rounded-full bg-primary/10 blur-3xl"
          animate={{ y: [0, -30, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-1/3 h-52 w-52 rounded-full bg-secondary/20 blur-3xl"
          animate={{ x: [0, -40, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full border border-primary/30"
          animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-12 h-20 w-20 -translate-x-1/2 rounded-full bg-[#8b5cf6]/15 blur-3xl"
          animate={{ x: [0, 20, -20, 0], opacity: [0.35, 0.8, 0.35, 0.35] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-20 bottom-24 h-32 w-32 rounded-full bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/10 blur-3xl"
          animate={{ scale: [0.95, 1.1, 0.95], opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <ScrollProgress />
      <Header />
      <motion.main
        className="flex-1 relative z-10"
        initial={layoutTransition.initial}
        animate={layoutTransition.animate}
        exit={layoutTransition.exit}
        transition={layoutTransition.transition}
      >
        <PageTransition>{children}</PageTransition>
      </motion.main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Layout;
