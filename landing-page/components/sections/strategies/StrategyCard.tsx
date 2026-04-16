"use client";

import Image, { StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";

interface StrategyCardProps {
  icon: StaticImageData | string;
  name: string;
  description: string;
  roi: string;
  price: string;
}

export default function StrategyCard({
  icon,
  name,
  description,
  roi,
  price,
}: StrategyCardProps) {
  const { t } = useTranslation();

  return (
    /*
      - w-full: fills the grid column completely
      - min-w-[220px]: never shrinks below 220px (matches minmax in parent)
      - h-full: stretches to fill the equal-height grid row (gridAutoRows: 1fr)
      - flex flex-col: so inner content can flex-grow properly
    */
    <div className="group relative p-[2px] rounded-xl w-full min-w-[220px] h-full flex flex-col overflow-visible">

      {/* Outer Bloom */}
      <div className="absolute inset-[-10px] rounded-xl bg-blue-600/0 group-hover:bg-blue-600/25 blur-[50px] transition-all duration-700 -z-10 pointer-events-none" />

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 rounded-xl bg-white/5 transition-opacity duration-500 group-hover:opacity-0" />
        <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg_at_50%_50%,#2563EB_0%,#06B6D4_25%,#8B5CF6_50%,#06B6D4_75%,#2563EB_100%)]" />
      </div>

      {/* Inner Card */}
      <div className="relative flex flex-col w-full flex-1 p-3 gap-2 rounded-[10px] bg-gradient-to-br from-[#0b1736] to-[#0a1124] z-10 overflow-hidden">

        {/* Internal Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Icon */}
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-white/10 relative z-10 shadow-inner">
          <Image
            src={icon}
            alt={name}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text — flex-grow so footer is always pushed to bottom */}
        <div className="flex flex-col gap-2 relative z-10 flex-grow">
          <h3
            className="text-white text-[15px] font-medium leading-snug"
            style={{ fontFamily: "var(--font-hoves)" }}
          >
            {name}
          </h3>
          {/* min-h reserves 3 lines so all cards align the footer at the same Y */}
          <p
            className="text-[13px] text-white/50 leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors min-h-[3.9em]"
            style={{ fontFamily: "var(--font-hoves)" }}
          >
            {description}
          </p>
        </div>

        {/* Footer — mt-auto pins it to the bottom */}
        <div className="flex flex-col gap-5 relative z-10 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span
                className="text-lg font-semibold text-green-500 leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-hoves)" }}
              >
                {roi}
              </span>
              <span
                className="text-[11px] text-white/30 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-hoves)" }}
              >
                {t("strategy.monthlyAvg")}
              </span>
            </div>
            <span
              className="text-white/80 font-medium text-sm"
              style={{ fontFamily: "var(--font-hoves)" }}
            >
              {price}
            </span>
          </div>

          <button
            className="w-full h-11 rounded-full cursor-pointer text-sm font-medium transition-all duration-300 bg-blue-600/10 text-white border border-white/10 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-500 group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-600/30"
            style={{ fontFamily: "var(--font-hoves)" }}
          >
            {t("strategy.card_cta")}
          </button>
        </div>
      </div>
    </div>
  );
}