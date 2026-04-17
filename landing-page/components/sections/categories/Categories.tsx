"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import Link from "next/link";

export default function Categories() {
  const { t } = useTranslation();

  const categories = [
    {
      title: t("tradingChannels.cards.scalping.title"),
      description: t("tradingChannels.cards.scalping.desc"),
      tags: t("tradingChannels.cards.scalping.badges", { returnObjects: true }) as string[],
    },
    {
      title: t("tradingChannels.cards.swing.title"),
      description: t("tradingChannels.cards.swing.desc"),
      tags: t("tradingChannels.cards.swing.badges", { returnObjects: true }) as string[],
    },
    {
      title: t("tradingChannels.cards.aiStrategy.title"),
      description: t("tradingChannels.cards.aiStrategy.desc"),
      tags: t("tradingChannels.cards.aiStrategy.badges", { returnObjects: true }) as string[],
    },
    {
      title: t("tradingChannels.cards.lowRisk.title"),
      description: t("tradingChannels.cards.lowRisk.desc"),
      tags: t("tradingChannels.cards.lowRisk.badges", { returnObjects: true }) as string[],
    },
    {
      title: t("tradingChannels.cards.highRisk.title"),
      description: t("tradingChannels.cards.highRisk.desc"),
      tags: t("tradingChannels.cards.highRisk.badges", { returnObjects: true }) as string[],
    },
    {
      title: t("tradingChannels.cards.futures.title"),
      description: t("tradingChannels.cards.futures.desc"),
      tags: t("tradingChannels.cards.futures.badges", { returnObjects: true }) as string[],
    },
  ];

  return (
    // bg-transparent so the parent AmbientTradingSection gradient shows through.
    // overflow-visible keeps the shared layer unclipped.
    // Removed: unified-energy-field div and all its children.
    <section className="w-full bg-transparent py-6 md:py-10 relative overflow-visible">

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-15 relative z-10">
        <div className="flex flex-col gap-8 lg:gap-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12"
          >
            <div className="flex flex-col gap-4 max-w-[439px]">
              <div className="inline-flex self-start items-center  py-1.5 ">
                <span className="text-[15px] font-mono tracking-widest  uppercase text-vivid-cyan">
                  {t("tradingChannels.title")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-normal leading-tight md:leading-[40px] font-hoves text-white">
                {t("tradingChannels.heading")}
              </h2>
            </div>

            <div className="max-w-[540px] lg:self-end">
              <p className="text-sm md:text-base leading-relaxed text-white/65 font-hoves lg:text-right">
                {t("tradingChannels.description")}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 relative z-10">
            {categories.map((cat, index) => (
              <CategoryCard key={cat.title} {...cat} index={index} />
            ))}
          </div>

          <div className="flex justify-center relative z-10">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="https://crypto.tradingsignals.ai/login"
                className="px-7 py-3 rounded-full border border-white font-hoves text-white text-md font-medium tracking-widest transition-all duration-500 hover:bg-white hover:text-black inline-flex items-center justify-center"
              >
                <span>{t("tradingChannels.cta")}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}