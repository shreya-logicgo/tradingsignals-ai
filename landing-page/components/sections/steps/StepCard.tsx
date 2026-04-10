"use client";

import { LucideIcon } from "lucide-react";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

const CARD_HEIGHT = 230;

export default function StepCard({
  step,
  title,
  description,
  Icon,
}: StepCardProps) {
  return (
    <div
      className="relative flex flex-col"
      style={{
        width: "280px",
        height: `${CARD_HEIGHT}px`,
        padding: "20px",             // ✅ reduced
        gap: "16px",                 // ✅ reduced
        borderRadius: "5px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* 🔵 Step Badge */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          top: "-12px",
          right: "16px",
          width: "60px",              // ✅ slightly bigger for readability
          height: "25px",
          borderRadius: "40px",
          background: "#0012B8",
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {step}
      </div>

      {/* 🔳 Icon */}
      <div
        className="flex items-center justify-center"
        style={{
          width: "50px",              // ✅ smaller
          height: "50px",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <Icon size={22} className="text-white/80" />
      </div>

      {/* 📄 Content */}
      <div className="flex flex-col gap-[6px] w-full">

        <h3
          className="text-white font-medium"
          style={{
            fontSize: "14px",         // ✅ scaled down
            fontFamily: "var(--font-hoves)",
          }}
        >
          {title}
        </h3>

        <p
          className="text-white/60"
          style={{
            fontSize: "12px",         // ✅ scaled down
            lineHeight: "1.5",
            fontFamily: "var(--font-hoves)",
            whiteSpace: "normal",
          }}
        >
          {description}
        </p>

      </div>
    </div>
  );
}