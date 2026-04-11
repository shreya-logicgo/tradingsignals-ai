"use client";

import { useTranslation } from "react-i18next";
import StrategyCard from "./StrategyCard";
import StrategyTabs from "./StrategyTabs";
import StrategyFilters from "./StrategyFilters";
import primeIcon from "@/assets/icons/tsai-prime.png";
import momentumIcon from "@/assets/icons/tsai-momentum.png";
import coreIcon from "@/assets/icons/tsai-core.png";
import altsIcon from "@/assets/icons/tsai-alts.png";
import flashIcon from "@/assets/icons/tsai-flash.png";
import systemIcon from "@/assets/icons/tsai-system.png";
import structIcon from "@/assets/icons/tsai-struct.png";
import assistIcon from "@/assets/icons/tsai-assist.png";
import volIcon from "@/assets/icons/tsai-vol.png";
import hybridIcon from "@/assets/icons/tsai-hybrid.png";

export default function Strategies() {
  const { t } = useTranslation();

  const strategies = [
    {
      icon: primeIcon,
      name: t("strategy.cards.prime.title"),
      description: t("strategy.cards.prime.desc"),
      roi: t("strategy.cards.prime.roi"),
      price: t("strategy.cards.prime.price"),
    },
    {
      icon: momentumIcon,
      name: t("strategy.cards.momentum.title"),
      description: t("strategy.cards.momentum.desc"),
      roi: t("strategy.cards.momentum.roi"),
      price: t("strategy.cards.momentum.price"),
    },
    {
      icon: coreIcon,
      name: t("strategy.cards.core.title"),
      description: t("strategy.cards.core.desc"),
      roi: t("strategy.cards.core.roi"),
      price: t("strategy.cards.core.price"),
    },
    {
      icon: altsIcon,
      name: t("strategy.cards.alts.title"),
      description: t("strategy.cards.alts.desc"),
      roi: t("strategy.cards.alts.roi"),
      price: t("strategy.cards.alts.price"),
    },
    {
      icon: flashIcon,
      name: t("strategy.cards.flash.title"),
      description: t("strategy.cards.flash.desc"),
      roi: t("strategy.cards.flash.roi"),
      price: t("strategy.cards.flash.price"),
    },
    {
      icon: systemIcon,
      name: t("strategy.cards.system.title"),
      description: t("strategy.cards.system.desc"),
      roi: t("strategy.cards.system.roi"),
      price: t("strategy.cards.system.price"),
    },
    {
      icon: structIcon,
      name: t("strategy.cards.struct.title"),
      description: t("strategy.cards.struct.desc"),
      roi: t("strategy.cards.struct.roi"),
      price: t("strategy.cards.struct.price"),
    },
    {
      icon: assistIcon,
      name: t("strategy.cards.assist.title"),
      description: t("strategy.cards.assist.desc"),
      roi: t("strategy.cards.assist.roi"),
      price: t("strategy.cards.assist.price"),
    },
    {
      icon: volIcon,
      name: t("strategy.cards.vol.title"),
      description: t("strategy.cards.vol.desc"),
      roi: t("strategy.cards.vol.roi"),
      price: t("strategy.cards.vol.price"),
    },
    {
      icon: hybridIcon,
      name: t("strategy.cards.hybrid.title"),
      description: t("strategy.cards.hybrid.desc"),
      roi: t("strategy.cards.hybrid.roi"),
      price: t("strategy.cards.hybrid.price"),
    },
  ];

  return (
    <section className="w-full bg-[#010B24] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header Section — Localized */}
        <div className="flex flex-col items-center text-center max-w-[740px] mx-auto mb-12 md:mb-16 gap-6 md:gap-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 shadow-inner">
            <span className="text-[11px] font-mono font-medium tracking-widest uppercase text-[#C7CCD2]">
              {t("strategy.strategybadge")}
            </span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-white font-hoves font-medium text-3xl md:text-4xl lg:text-5xl leading-tight">
              {t("strategy.title")}
            </h2>
            <p className="font-hoves text-[15px] md:text-base text-[#C7CCD2] leading-relaxed max-w-[600px] opacity-80">
              {t("strategy.description")}
            </p>
          </div>
        </div>

        {/* Filters and Tabs */}
        <div className="flex flex-col gap-6 mb-12">
          <StrategyTabs />
          <StrategyFilters />
        </div>

        {/* Strategies Grid — using h-full to normalize heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch">
          {strategies.map((s) => (
            <div key={s.name} className="flex">
              <StrategyCard {...s} />
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Glow (Optional but premium) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
    </section>
  );
}

