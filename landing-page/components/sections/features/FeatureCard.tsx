import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  className?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`group relative flex flex-col justify-between p-6 lg:p-8 rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-900/10  min-h-[240px] md:min-h-[260px] h-full ${className}`}
      style={{
        backgroundImage: `url('${gradient}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-[#000514]/30 group-hover:bg-[#000514]/20 transition-colors duration-500 pointer-events-none" />

      {/* Icon — elevated via z-index */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-12 h-12 flex items-center justify-center text-white/90">
          <Icon className="w-10 h-10 md:w-12 md:h-12 stroke-[1.2]" />
        </div>
      </div>

      {/* Text Content Area */}
      <div className="relative z-10 mt-auto pt-8">
        <h3 className="text-lg md:text-xl font-medium text-white leading-tight font-hoves mb-2 md:mb-3"style={{ fontFamily: "var(--font-hoves)" }}>
          {title}
        </h3>
        <p className="text-[13px] md:text-sm font-normal text-white/70 group-hover:text-white/90 transition-colors leading-relaxed font-hoves max-w-[420px]"style={{ fontFamily: "var(--font-hoves)" }}>
          {description}
        </p>
      </div>

      {/* Subtle bottom-edge highlight on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/0 to-transparent group-hover:via-blue-500/40 transition-all duration-700" />
    </div>
  );
}
