"use client";

import { LucideIcon } from "lucide-react";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export default function StepCard({
  step,
  title,
  description,
  Icon,
}: StepCardProps) {
  return (
    <div className="relative w-full max-w-[340px] md:max-w-[320px] lg:max-w-[330px] group">
      {/* Step badge — floats above top-right of card */}
      <div className="absolute -top-3 -right-2 px-5 py-1.5 rounded-full bg-blue-700 text-white text-[11px] font-bold font-hoves z-20 shadow-lg border border-white/10 tracking-wider">
        {step}
      </div>

      {/* Card Body */}
      <div className="flex flex-col h-full min-h-[290px] p-8 gap-8 rounded-xl bg-[#0b1224] border border-white/[0.05] shadow-2xl transition-all duration-500 group-hover:border-white/10 group-hover:bg-[#0d152b]">
        {/* Icon container */}
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-black/40 border border-white/[0.05] shadow-inner flex-shrink-0">
          <Icon size={26} className="text-white/80" />
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-lg font-medium font-hoves leading-tight">
            {title}
          </h3>
          <p className="text-[13px] font-light text-white/50 leading-relaxed font-hoves">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
