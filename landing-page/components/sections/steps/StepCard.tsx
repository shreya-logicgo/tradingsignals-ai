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
    <div className="relative py-5">

      {/* Step badge — floats above top-right of card */}
      <div
        className="absolute top-0 right-[16px] flex items-center justify-center text-white z-10"
        style={{
          width: "80px",
          height: "34px",
          borderRadius: "40px",
          background: "#0012B8",
          fontSize: "12px",
          fontWeight: 500,
          fontFamily: "var(--font-hoves)",
        }}
      >
        {step}
      </div>

      {/* Card */}
      <div
        className="flex flex-col"
        style={{
          width: "300px",
          height: "280px",
          padding: "24px",
          gap: "24px",
          borderRadius: "5px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Icon size={24} className="text-white/80" />
        </div>

        {/* Text content */}
        <div className="flex flex-col" style={{ gap: "10px" }}>
          <h3
            className="text-white font-medium"
            style={{
              fontSize: "16px",
              lineHeight: "1.3",
              fontFamily: "var(--font-hoves)",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: "1.6",
              fontFamily: "var(--font-hoves)",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}