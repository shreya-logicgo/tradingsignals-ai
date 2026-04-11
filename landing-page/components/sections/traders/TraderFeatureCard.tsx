import { ReactNode } from "react";

interface TraderFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function TraderFeatureCard({ icon, title, description }: TraderFeatureCardProps) {
  return (
    <div
      style={{
        flex: "1 1 0",
        minWidth: 0,
        height: "160px",
        padding: "12px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        boxSizing: "border-box",
      }}
    >
      {/* Inner container */}
      <div style={{ display: "flex", flexDirection: "column", gap: "30px", width: "100%" }}>

        {/* Icon container */}
        <div
          style={{
            width: "43px",
            height: "45px",
            padding: "9px",
            borderRadius: "10px",
            background: "linear-gradient(90deg, #0012B8 0%, #00F0FF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
            {icon}
          </div>
        </div>

        {/* Text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
          <h3
            style={{
              fontFamily: "var(--font-hoves)",
              fontWeight: 500,
              fontSize: "16px",
              textAlign: "left",
              lineHeight: "100%",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-hoves)",
              fontWeight: 200,
              textAlign: "left",
              fontSize: "12px",
              lineHeight: "1.4",
              color: "rgba(199,204,210,1)",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}