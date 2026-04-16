"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeUpVariant } from "@/utils/animations";
import TraderFeatureCard from "./TraderFeatureCard";

/* ── Inline SVG icons (Preserved) ── */
const ShieldIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const EyeIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const ChartIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const ZapIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Traders() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const items = t("whyUs.items", { returnObjects: true }) as { title: string; desc: string }[];

  const allCards = [
    { icon: <ShieldIcon />, title: items[0]?.title || "Security", description: items[0]?.desc || "" },
    { icon: <EyeIcon />, title: items[1]?.title || "Transparency", description: items[1]?.desc || "" },
    { icon: <ChartIcon />, title: items[2]?.title || "Analytics", description: items[2]?.desc || "" },
    { icon: <ZapIcon />, title: items[3]?.title || "Execution", description: items[3]?.desc || "" },
  ];

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < allCards.length;
  const displayCards = isMounted ? allCards.slice(startIndex, startIndex + visibleCount) : allCards;

  return (
    <motion.section 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="w-full bg-transparent py-3 md:py-3  relative overflow-hidden mb-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-15 relative z-20">
        <div className="flex flex-col gap-12 lg:gap-16 items-center">

          {/* ── Header block — Localized ── */}
          <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center gap-6 max-w-[521px]">
            {/* Badge */}
            <div className="px-3.5 py-1.5 rounded-full  backdrop-blur-sm">
              <span className="text-[11px] font-mono tracking-widest uppercase text-vivid-cyan">
                {t("whyUs.title")}
              </span>
            </div>
            <h2 className="font-hoves font-medium text-3xl md:text-4xl text-white leading-tight">
              {t("whyUs.heading")}
            </h2>
            <p className="font-hoves font-light text-sm md:text-base text-[#c7ccd2] leading-relaxed max-w-[480px]">
              {t("whyUs.description")}
            </p>
          </motion.div>

          {/* ── Cards slider ── */}
          <motion.div variants={fadeUpVariant} className="w-full flex flex-col gap-8">
            <div className="relative w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {displayCards.map((card, i) => (
                  <div key={isMounted ? startIndex + i : i}>
                    <TraderFeatureCard {...card} index={i} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation (Preserved) */}
            <div className={`flex justify-center items-center gap-4 transition-all duration-300 ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <button
                onClick={() => setStartIndex((p) => Math.max(0, p - 1))}
                disabled={!canPrev}
                className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-200 ${canPrev ? "bg-white/10 text-white hover:bg-white/20" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
              >
                <ChevronLeft />
              </button>
              <div className="flex gap-1.5">
                {isMounted && Array.from({ length: allCards.length - visibleCount + 1 }).map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === startIndex ? "w-6 bg-vivid-cyan" : "w-1.5 bg-white/20"}`} />
                ))}
              </div>
              <button
                onClick={() => setStartIndex((p) => Math.min(allCards.length - visibleCount, p + 1))}
                disabled={!canNext}
                className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-200 ${canNext ? "bg-white/10 text-white hover:bg-white/20" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
              >
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}