import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const FloatingButtons = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
      initial={{ opacity: 0, y: 60, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.a
        href="https://wa.me/971505551234"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg ripple-effect"
        aria-label="WhatsApp"
        whileHover={{ scale: 1.2, rotate: 10, boxShadow: "0 10px 40px rgba(34,197,94,0.4)" }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </motion.a>
      <motion.a
        href="tel:+971505551234"
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse-glow ripple-effect"
        aria-label="Call"
        whileHover={{ scale: 1.2, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
      >
        <Phone className="h-6 w-6 text-primary-foreground" />
      </motion.a>
    </motion.div>
  );
};

export default FloatingButtons;
