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
        height: "340px",
        borderRadius: "10px",
        padding: "28px",
        backgroundImage: `url('${gradient}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Dark overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(0,5,20,0.35)",
          borderRadius: "10px",
        }}
      />

      {/* Icon — large, no box, top-left */}
      <div className="relative z-10">
        <Icon
          style={{
            width: "44px",
            height: "44px",
            color: "rgba(255,255,255,0.90)",
            strokeWidth: 1.5,
          }}
        />
      </div>

      {/* Text block — bottom */}
      <div className="relative z-10">
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "white",
            lineHeight: "1.3",
            marginBottom: "10px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.65)",
            lineHeight: "1.6",
            maxWidth: "360px",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}