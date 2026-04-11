"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import glowBar from "@/assets/images/glowBars.png";

export default function Stats() {
  const { t } = useTranslation();

  const stats = [
    { number: "1,250+", label: t("stats.registeredUsers") },
    { number: "$4.5M", label: t("stats.aum") },
    { number: "$12M", label: t("stats.totalPnl") },
  ];

  return (
    <section className="w-full relative lg:py-30">
      {/* ── GlowBar Image ── */}
      <div
        className="absolute md:-top-90 -top-25  mx-auto inset-0 pointer-events-none lg:h-250 lg:max-w-300 h-150 max-w-200"
        style={{ zIndex: 1 }}
      >
        <Image
          src={glowBar}
          alt=""
          fill
          sizes="100vw"
          className=""
          style={{ mixBlendMode: "screen" }}
          priority
        />
      </div>

      {/* ── Stats Content ── */}
      <div className="flex flex-col md:flex-row items-center justify-center relative z-10">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col md:flex-row items-center">

            {/* Divider */}
            {i > 0 && (
              <div
                className="w-16 h-[1px] md:w-[1px] md:h-[44px] my-6 md:my-0 md:mx-[60px] shrink-0"
                style={{
                  background: "rgba(255,255,255,0.12)",
                }}
              />
            )}

            {/* Stat Block — Localized */}
            <div className="flex flex-col items-center text-center">
              <span
                className="text-4xl md:text-[48px] font-medium text-white tracking-[-0.5px] leading-[1.1]"
                style={{
                  fontFamily: "var(--font-hoves)",
                }}
              >
                {stat.number}
              </span>

              <span
                className="text-xs md:text-[14px] text-white/50 mt-2 md:mt-[10px] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-hoves)",
                }}
              >
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
