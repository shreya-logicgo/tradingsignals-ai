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
    <div className="group relative p-[1px] rounded-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      {/* Animated Gradient Border Overlay */}
      <div className="absolute inset-0 rounded-xl bg-white/10 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-400 transition-colors duration-300" />
      
      {/* Inner Card Content */}
      <div className="relative flex flex-col w-full h-full p-6 gap-6 rounded-[11px] bg-gradient-to-br from-[#0b1736] to-[#0a1124] z-10 overflow-hidden">
        {/* Glow Effect on Hover */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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

        {/* Text Area */}
        <div className="flex flex-col gap-2 relative z-10 flex-grow">
          <h3 className="text-white text-[15px] font-medium leading-snug font-hoves">
            {name}
          </h3>
          <p className="text-[13px] font-hoves text-white/50 leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors">
            {description}
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-white/5 relative z-10" />

        {/* Footer Stats Area — Localized */}
        <div className="flex flex-col gap-5 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-green-500 font-hoves leading-tight tracking-tight">
                {roi}
              </span>
              <span className="text-[11px] text-white/30 font-hoves uppercase tracking-wider">
                {t("strategy.monthlyAvg")}
              </span>
            </div>
            <span className="text-white/80 font-medium text-sm font-hoves">
              {price}
            </span>
          </div>

          {/* Action Button — Localized */}
          <button className="w-full h-11 rounded-full text-sm font-medium transition-all duration-300 font-hoves bg-blue-600/10 text-white border border-white/10 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-sky-500 group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-600/20">
            {t("strategy.card_cta")}
          </button>
        </div>
      </div>
    </div>
  );
}
