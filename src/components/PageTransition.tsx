import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
      {/* Page transition overlay */}
      <motion.div
        className="fixed inset-0 z-[200] bg-primary/5 pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        className="fixed inset-0 z-[199] bg-background pointer-events-none"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0.9 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="fixed top-24 left-1/4 h-24 w-24 rounded-full bg-primary/10 blur-2xl pointer-events-none"
        animate={{ scale: [0.8, 1.05, 0.8], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed right-10 bottom-16 h-20 w-20 rounded-full border border-primary/20 pointer-events-none"
        animate={{ rotate: [0, 45, 0], opacity: [0.25, 0.7, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed right-1/4 top-32 h-16 w-16 rounded-full bg-secondary/20 blur-2xl pointer-events-none"
        animate={{ y: [0, 18, -10, 0], opacity: [0.3, 0.8, 0.4, 0.3] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed left-10 bottom-28 h-12 w-12 rounded-full border border-primary/30 pointer-events-none"
        animate={{ scale: [1, 0.9, 1.05, 1], rotate: [0, 30, -10, 0], opacity: [0.35, 0.75, 0.45, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
};

export default PageTransition;
