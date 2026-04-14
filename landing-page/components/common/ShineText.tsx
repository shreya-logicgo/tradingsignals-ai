// components/ShineText.tsx

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
    fontFamily: "var(--font-hoves)",
    fontWeight: 600,
    lineHeight: "1.7em",
    whiteSpace: "nowrap",
    margin: 0,
    ...style,
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-min h-min ${className}`}
      style={{ color: "#adb1b8" }}
    >
      {/* Layer 1 — base dim text, always visible, no animation */}
      <div className="select-none">
        <p style={{ ...baseStyle, color: "#adb1b8" }}>
          {children}
        </p>
      </div>

      {/* Layer 2 — blur(3px) + shine, white */}
      <div
        className="absolute select-none"
        style={{
          zIndex: 1,
          filter: "blur(3px)",
          top: "51%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p className="shine" style={{ ...baseStyle, color: "#fff" }}>
          {children}
        </p>
      </div>

      {/* Layer 3 — blur(6px) + shine, white */}
      <div
        className="absolute select-none"
        style={{
          zIndex: 1,
          filter: "blur(6px)",
          top: "51%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p className="shine" style={{ ...baseStyle, color: "#fff" }}>
          {children}
        </p>
      </div>

      {/* Layer 4 — no blur + shine, #c7c7c7 — sharpest top layer */}
      <div
        className="absolute select-none"
        style={{
          zIndex: 2,
          top: "51%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p className="shine" style={{ ...baseStyle, color: "#c7c7c7" }}>
          {children}
        </p>
      </div>
    </div>
  );
}