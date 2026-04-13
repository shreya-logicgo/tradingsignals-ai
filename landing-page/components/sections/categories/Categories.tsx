"use client";

import { useTranslation } from "react-i18next";
import CategoryCard from "./CategoryCard";

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
    <section className="w-full bg-[#010B24] py-16 md:py-24">
      {/* Outer wrapper — Localized px-6 md:px-12 lg:px-24 */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Main content container */}
        <div className="flex flex-col gap-12 lg:gap-16">

          {/* Header Block — Localized */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12">
            {/* Left: Badge + Heading */}
            <div className="flex flex-col gap-4 max-w-[439px]">
              {/* Badge */}
              <div className="inline-flex self-start items-center px-4 py-1.5 rounded-full border border-white/10">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C7CCD2]">
                  {t("tradingChannels.title")}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-normal leading-tight md:leading-[40px] font-hoves text-white"
              style={{ fontFamily: "var(--font-hoves)" }}>
                {t("tradingChannels.heading")}
              </h2>
            </div>

            {/* Right: Description */}
            <div className="max-w-[540px] lg:self-end">
              <p className="text-sm md:text-base leading-relaxed text-white/65 font-hoves lg:text-right"
              style={{ fontFamily: "var(--font-hoves)" }}>
                {t("tradingChannels.description")}
              </p>
            </div>
          </div>

          {/* ── Cards Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.title} {...cat} />
            ))}
          </div>

          {/* ── Explore Button — Localized ── */}
          <div className="flex justify-center pt-4">
            <button className="px-7 py-3 rounded-full border border-white font-hoves text-white text-md font-medium tracking-widest font-hoves transition-colors duration-300 hover:bg-white hover:text-black hover:border-white"
            style={{ fontFamily: "var(--font-hoves)" }}>
              <span>{t("tradingChannels.cta")}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

