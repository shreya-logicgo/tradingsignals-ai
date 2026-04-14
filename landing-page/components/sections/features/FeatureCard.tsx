"use client";

import { type LucideIcon } from "lucide-react";
import { useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  className?: string;
}

const SP = { stiffness: 220, damping: 16, mass: 0.7 };

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  className = "",
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 0.6 });

  const smoothOpacity = useSpring(useMotionValue(0), {
    stiffness: 60,
    damping: 18,
  });

  const cardY = useSpring(useMotionValue(0), {
    stiffness: 160,
    damping: 22,
    mass: 0.8,
  });

  const cardScale = useSpring(useMotionValue(1), {
    stiffness: 160,
    damping: 22,
    mass: 0.8,
  });

  const borderOpacity = useSpring(useMotionValue(0), {
    stiffness: 100,
    damping: 22,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const spotlightBg = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(320px circle at ${x}px ${y}px, rgba(99,160,255,0.15) 0%, transparent 70%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        smoothOpacity.set(1);
        cardY.set(-6);
        cardScale.set(1.015);
        borderOpacity.set(1);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        smoothOpacity.set(0);
        cardY.set(0);
        cardScale.set(1);
        borderOpacity.set(0);
        setIsHovered(false);
      }}
      className={`group relative flex flex-col justify-between p-6 lg:p-8 rounded-xl overflow-hidden min-h-[240px] md:min-h-[260px] h-full cursor-default ${className}`}
      style={{
        backgroundImage: `url('${gradient}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        y: cardY,
        scale: cardScale,
      }}
      animate={{
        y: [0, -2, 0],
      }}
      transition={{
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Cursor light */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: spotlightBg,
          opacity: smoothOpacity,
        }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none z-20"
        style={{
          opacity: borderOpacity,
          boxShadow:
            "0 0 0 1px rgba(99,160,255,0.45), 0 12px 40px rgba(59,130,246,0.22)",
        }}
      />

      {/* Content */}
      <div className="relative z-30 flex-shrink-0">
        <IconMotion icon={Icon} isHovered={isHovered} />
      </div>

      <div className="relative z-30 mt-auto pt-8">
        <h3 className="text-lg md:text-xl font-medium text-white leading-tight mb-2 md:mb-3 font-hoves">
          {title}
        </h3>

        <p className="text-[13px] md:text-sm font-normal text-white/60 group-hover:text-white/90 transition-colors duration-500 leading-relaxed max-w-[420px] font-hoves">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function IconMotion({
  icon: Icon,
  isHovered,
}: {
  icon: LucideIcon;
  isHovered: boolean;
}) {
  const iconName = Icon.displayName || Icon.name || "";

  const glowColorMap: Record<string, string> = {
    Brain: "bg-blue-500/30",
    Link2: "bg-cyan-400/30",
    SlidersHorizontal: "bg-violet-400/30",
    LineChart: "bg-emerald-400/30",
  };

  const glowColor = glowColorMap[iconName] ?? "bg-blue-500/30";

  // Equal premium movement for all icons
  const sharedHover = isHovered
    ? {
        scale: [1, 1.22, 1.12],
        y: [0, -8, -4],
        rotate: [0, -6, 6, 0],
        x: [0, 3, -3, 0],
      }
    : {
        scale: 1,
        y: 0,
        rotate: 0,
        x: 0,
      };

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <motion.span
        className={`absolute inset-0 rounded-full blur-xl ${glowColor}`}
        animate={
          isHovered
            ? { scale: 2.1, opacity: 1 }
            : { scale: 0.6, opacity: 0 }
        }
        transition={SP}
      />

      <motion.div
        animate={sharedHover}
        transition={{
          duration: 1.8,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="text-white/90 group-hover:text-white transition-colors"
      >
        <Icon className="w-10 h-10 md:w-12 md:h-12 stroke-[1.2] relative z-10" />
      </motion.div>
    </div>
  );
}