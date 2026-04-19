import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  title: string;
}

const BeforeAfterSlider = ({ before, after, title }: BeforeAfterSliderProps) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    };
    const stop = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [isDragging, updatePosition]);

  return (
    <div className="rounded-3xl overflow-hidden border border-border bg-card shadow-lg group">
      <div className="p-5 pb-3">
        <p className="text-sm text-primary uppercase tracking-[0.2em]">{title}</p>
      </div>
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] overflow-hidden cursor-ew-resize select-none touch-none"
        onMouseDown={(e) => {
          setIsDragging(true);
          updatePosition(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          updatePosition(e.touches[0].clientX);
        }}
      >
        {/* After (full background) */}
        <img
          src={after}
          alt={`${title} after`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
        <span className="absolute top-4 right-4 z-20 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
          {t("portfolioPage.afterText")}
        </span>

        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={before}
            alt={`${title} before`}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
            {t("portfolioPage.beforeText")}
          </span>
        </div>

        {/* Divider line + handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-primary shadow-[0_0_20px_hsl(var(--primary)/0.6)] z-10 pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl ring-4 ring-background"
            animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MoveHorizontal className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
