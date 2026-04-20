import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

const layoutTransition = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark min-h-screen flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute right-0 top-1/3 h-52 w-52 rounded-full bg-secondary/10 blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-10 top-24 h-36 w-36 rounded-full bg-primary/5 blur-3xl"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
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
    </div>
  );
};

export default Layout;
