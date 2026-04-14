// components/ShineButton.tsx
import Link from "next/link";
import React, { ReactNode } from "react";

interface ShineButtonProps {
  children: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

function ShineTextStack({ text }: { text: string }) {
  const baseStyle: React.CSSProperties = {
    color: "#adb1b8",
    fontWeight: 500,
    lineHeight: "1.2",
    fontFamily: "var(--font-hoves)",
    margin: 0,
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  return (
    <div className="grid grid-cols-1 grid-rows-1 place-items-center z-[3] relative">
      {/* Layer 1 — dim base, always visible */}
      <div style={{ gridArea: "1/1" }} className="select-none">
        <p style={baseStyle}>{text}</p>
      </div>

      {/* Layer 2 — blur 4px + shine, white */}
      <div
        className="shine select-none pointer-events-none opacity-80"
        style={{
          gridArea: "1/1",
          filter: "blur(4px)",
        }}
      >
        <p style={{ ...baseStyle, color: "#fff" }}>{text}</p>
      </div>

      {/* Layer 3 — blur 8px + shine, white */}
      <div
        className="shine select-none pointer-events-none opacity-60"
        style={{
          gridArea: "1/1",
          filter: "blur(8px)",
        }}
      >
        <p style={{ ...baseStyle, color: "#fff" }}>{text}</p>
      </div>

      {/* Layer 4 — no blur + shine, #c7c7c7 — crisp top layer */}
      <div
        className="shine select-none pointer-events-none"
        style={{
          gridArea: "1/1",
        }}
      >
        <p style={{ ...baseStyle, color: "#c7c7c7" }}>{text}</p>
      </div>
    </div>
  );
}

export default function ShineButton({
  children,
  href,
  onClick,
  icon,
  className = "",
}: ShineButtonProps) {
  const inner = (
    <>
      {/* BG Layer 1 — dark base fill */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ backgroundColor: "#3c3f44" }}
      />

      {/* BG Layer 2 — lighter gray with shine sweep = the glowing border */}
      <div
        className="shine absolute inset-0 overflow-hidden"
        style={{ backgroundColor: "#9b9999" }}
      />

      {/* BG Layer 3 — theme inner pill, 1.5px inset → exposes border */}
      <div
        className="absolute overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: "#010B24",
          borderRadius: "99px",
          inset: "1.5px",
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-[3] flex items-center justify-center gap-2.5">
        {/* Icon */}
        {icon && (
          <div
            className="flex-shrink-0"
            style={{ color: "#b6b6b9" }}
          >
            {icon}
          </div>
        )}

        {/* 4-layer shine text */}
        <ShineTextStack text={children} />
      </div>
    </>
  );

  const sharedClass = [
    "relative flex items-center justify-center overflow-hidden",
    "rounded-full transition-all duration-200",
    "px-6 py-3.5 md:px-8 md:py-4.5",
    "cursor-pointer no-underline",
    "hover:scale-[1.03] active:scale-[0.98]",
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={sharedClass}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={sharedClass}>
      {inner}
    </button>
  );
}