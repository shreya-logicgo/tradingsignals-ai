// components/ShineText.tsx
import React from "react";

interface ShineTextProps {
  children: string;
  className?: string;        // font-size, font-weight, etc.
  style?: React.CSSProperties;
}

export default function ShineText({
  children,
  className = "",
  style,
}: ShineTextProps) {
  const baseStyle: React.CSSProperties = {
    fontFamily: "inherit",
    fontWeight: 600,
    lineHeight: "1.3",         // Balanced line height for wrapped titles
    textAlign: "center",
    margin: 0,
    ...style,
  };

  return (
    <div 
      className={`grid grid-cols-1 grid-rows-1 place-items-center w-full font-hoves ${className}`}
      style={{ color: "#adb1b8" }}
    >
      {/* Layer 1 — base dim text, always visible, no animation */}
      <div className="select-none" style={{ gridArea: "1/1" }}>
        <p style={{ ...baseStyle, color: "#f9f9f9" }}>
          {children}
        </p>
      </div>

      {/* Layer 2 — blur(3px) + shine, white */}
      <div
        className="select-none pointer-events-none"
        style={{
          gridArea: "1/1",
          zIndex: 1,
          filter: "blur(4px)",
        }}
      >
        <p className="shine" style={{ ...baseStyle, color: "#f9f9f9" }}>
          {children}
        </p>
      </div>

      {/* Layer 3 — blur(8px) + shine, white */}
      <div
        className="select-none pointer-events-none"
        style={{
          gridArea: "1/1",
          zIndex: 1,
          filter: "blur(8px)",
        }}
      >
        <p className="shine" style={{ ...baseStyle, color: "#c7c7c7" }}>
          {children}
        </p>
      </div>

      {/* Layer 4 — no blur + shine, #c7c7c7 — sharpest top layer */}
      <div
        className="select-none pointer-events-none"
        style={{
          gridArea: "1/1",
          zIndex: 2,
        }}
      >
        <p className="shine" style={{ ...baseStyle, color: "#c7c7c7" }}>
          {children}
        </p>
      </div>
    </div>
  );
}