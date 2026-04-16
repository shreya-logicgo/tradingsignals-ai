"use client";

import { ReactNode, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface TraderFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number; // Added to stagger the idle float animation
}

export default function TraderFeatureCard({ icon, title, description, index = 0 }: TraderFeatureCardProps) {
  // Mouse position values for the spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative flex-1 min-w-0 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-6 box-border transition-colors duration-300 hover:border-white/20 min-h-45 overflow-hidden"
    >
      {/* 3. Cursor Reactive Light (Spotlight) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 18, 184, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* 4. Animated Border Glow Overlay */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-dark-blue/30 group-hover:shadow-[0_0_20px_rgba(0,18,184,0.1)] transition-all duration-300 pointer-events-none" />

      {/* Inner container (relative z-10 to stay above spotlight) */}
      <div className="relative z-10 flex flex-col gap-6 w-full h-full">

        {/* Icon container */}
        <div className="w-11 h-11 p-2.5 rounded-xl bg-gradient-to-r from-dark-blue to-vivid-cyan flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:rotate-[360deg]">
          <div className="w-6 h-6 flex items-center justify-center text-white">
            {icon}
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-hoves font-medium text-base text-left leading-none text-white m-0 group-hover:text-vivid-cyan transition-colors duration-300">
            {title}
          </h3>
          <p className="font-hoves font-extralight text-left text-xs leading-relaxed text-[#c7ccd2]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}