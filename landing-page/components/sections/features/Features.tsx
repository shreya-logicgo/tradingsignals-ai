"use client";

import { Brain, Link2, SlidersHorizontal, LineChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import FeatureCard from "./FeatureCard";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t("features.cards.aiSignals.title"),
      description: t("features.cards.aiSignals.desc"),
      gradient: "/images/gradient_3_.png",
    },
    {
      icon: Link2,
      title: t("features.cards.multiExchange.title"),
      description: t("features.cards.multiExchange.desc"),
      gradient: "/images/gradient_4_.png",
    },
    {
      icon: SlidersHorizontal,
      title: t("features.cards.automation.title"),
      description: t("features.cards.automation.desc"),
      gradient: "/images/gradient_5_.png",
    },
    {
      icon: LineChart,
      title: t("features.cards.analytics.title"),
      description: t("features.cards.analytics.desc"),
      gradient: "/images/gradient_6_.png",
    },
  ];

  return (
    <section className="w-full bg-[#010B24] py-5 md:py-5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header Section — Localized */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 md:gap-12 lg:gap-20 mb-12 md:mb-16">
          
          {/* Left: Badge + Heading block */}
          <div className="flex flex-col items-start gap-4 md:gap-5">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 shadow-inner">
              <span className="text-[11px] font-mono font-medium tracking-widest uppercase text-white/50">
                {t("features.title")}
              </span>
            </div>

            {/* Main Section Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-medium text-white leading-tight md:leading-[1.15] font-hoves max-w-[520px]"style={{ fontFamily: "var(--font-hoves)" }}>
              {t("features.heading")}
            </h2>
          </div>

          {/* Right: Supporting brief */}
          <div className="lg:max-w-[420px] lg:mb-2 flex-shrink-0">
            <p className="text-[15px] md:text-base font-normal text-white/80 leading-relaxed font-hoves"style={{ fontFamily: "var(--font-hoves)" }}>
              {t("features.description")}
            </p>
          </div>
        </div>

        {/* ── Asymmetrical Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
          
          {/* Top Row: Cards 0 and 1 */}
          <div className="md:col-span-5 h-full">
            <FeatureCard {...features[0]} />
          </div>
          <div className="md:col-span-7 h-full">
            <FeatureCard {...features[1]} />
          </div>

          {/* Bottom Row: Cards 2 and 3 */}
          <div className="md:col-span-7 h-full">
            <FeatureCard {...features[2]} />
          </div>
          <div className="md:col-span-5 h-full">
            <FeatureCard {...features[3]} />
          </div>

        </div>
      </div>
      
      {/* Decorative background glow for depth */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
    </section>
  );
}

