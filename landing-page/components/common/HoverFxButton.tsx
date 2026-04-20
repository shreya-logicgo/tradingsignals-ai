"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function HoverFxButton({ href, children }: { href: string, children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* ── SUBTLE OUTSIDE GLOW (Only active on hover) ── */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20 pointer-events-none"
        initial={{ opacity: 0, scale: 1 }}
        animate={isHovered ? {
          opacity: 1,
          scale: 1.3,
          filter: "blur(15px)",
        } : {
          opacity: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <Link
        href={href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative inline-flex items-center justify-center px-6 py-3 
          rounded-full border transition-all duration-500 overflow-hidden z-10 
          font-hoves tracking-widest text-md font-medium
          ${isHovered 
            ? "bg-white text-black border-white" 
            : "bg-white/5 text-white border-white/20"
          }
        `}
      >
        {/* ── THE CONTINUOUS FLASHY EFFECT ── */}
        <motion.div
  animate={{
    x: ["-180%", "180%"],
    opacity: [0, 1, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 1.2,     // speed of sweep
    repeatDelay: 7,   // pause between sweeps
    ease: "easeInOut",
  }}
  className="absolute inset-y-0 w-15 pointer-events-none z-10"
  style={{
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
    boxShadow: "0 0 25px rgba(255,255,255,0.3)",
  }}
/>

        <span className="relative z-20">
          {children}
        </span>
      </Link>
    </div>
  );
}