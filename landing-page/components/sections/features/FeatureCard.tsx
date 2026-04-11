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
      className={`relative flex flex-col justify-between overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${className}`}
      style={{
        height: "260px",
        borderRadius: "10px",
        padding: "24px",
        backgroundImage: `url('${gradient}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "1px solid rgba(255,255,255,0.08)",
        backgroundClip: "padding-box",
        outline: "none",
        boxShadow: "none",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(0,5,20,0.30)",
          borderRadius: "10px",
        }}
      />

      {/* Icon — top-left */}
      <div className="relative z-10">
        <Icon
          style={{
            width: "48px",
            height: "48px",
            color: "rgba(255,255,255,0.90)",
            strokeWidth: 1.4,
          }}
        />
      </div>

      {/* Text — bottom */}
      <div className="relative z-10">
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 500,
            color: "white",
            lineHeight: "1.3",
            marginBottom: "8px",
            fontFamily: "var(--font-hoves)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.60)",
            lineHeight: "1.6",
            maxWidth: "340px",
            fontFamily: "var(--font-hoves)",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}