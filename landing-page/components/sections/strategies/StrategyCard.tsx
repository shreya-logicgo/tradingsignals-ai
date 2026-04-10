"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface StrategyCardProps {
  icon: StaticImageData | string;
  name: string;
  description: string;
  roi: string;
  price: string;
}

const CARD_HEIGHT = 332;

export default function StrategyCard({
  icon,
  name,
  description,
  roi,
  price,
}: StrategyCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="p-[1px] transition-all duration-300 cursor-pointer"
      style={{
        borderRadius: "10px",
        width: "100%",
        height: `${CARD_HEIGHT}px`,   // ✅ outer shell locked to same height
        background: hovered
          ? "linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)"
          : "rgba(255,255,255,0.10)",
        boxShadow: hovered
          ? "0 0 20px rgba(37,99,235,0.20), 0 0 40px rgba(6,182,212,0.08)"
          : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Inner card — 2px less to account for 1px border on each side */}
      <div
        className="flex flex-col w-full"
        style={{
          borderRadius: "9px",
          padding: "24px",
          gap: "20px",
          background: "linear-gradient(160deg, #0b1736 0%, #0a1124 100%)",
          height: `${CARD_HEIGHT - 2}px`,  // ✅ inner = outer - 2px (1px each side)
        }}
      >
        {/* Icon */}
        <div
          className="w-[56px] h-[56px] rounded-full overflow-hidden flex-shrink-0"
          style={{ border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <Image
            src={icon}
            alt={name}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name + description — flex-1 fills remaining space */}
        <div className="flex flex-col flex-1 overflow-hidden" style={{ gap: "8px" }}>
          <h3
            className="text-white font-medium leading-snug flex-shrink-0"
            style={{ fontSize: "15px", fontFamily: "var(--font-hoves)" }}
          >
            {name}
          </h3>
          <p
            className="overflow-hidden"
            style={{
              fontSize: "13px",
              fontFamily: "var(--font-hoves)",
              color: "rgba(255, 255, 255, 0.65)",
              lineHeight: "1.65",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex flex-col" style={{ gap: "3px" }}>
            <span
              className="font-semibold"
              style={{ fontSize: "18px", color: "#22c55e", fontFamily: "var(--font-hoves)" }}
            >
              {roi}
            </span>
            <span
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.40)", fontFamily: "var(--font-hoves)" }}
            >
              Monthly Avg
            </span>
          </div>
          <span
            className="text-white font-medium"
            style={{ fontSize: "14px", fontFamily: "var(--font-hoves)" }}
          >
            {price}
          </span>
        </div>

        {/* Button */}
        <button
          className="w-full text-white font-medium transition-all duration-200 flex-shrink-0"
          style={{
            height: "46px",
            borderRadius: "55px",
            fontSize: "14px",
            fontFamily: "var(--font-hoves)",
            cursor: "pointer",
            background: hovered
              ? "linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%)"
              : "rgba(2,6,23,0.9)",
            border: hovered
              ? "none"
              : "1px solid rgba(255,255,255,0.10)",
          }}
        >
          Trade Now
        </button>
      </div>
    </div>
  );
}