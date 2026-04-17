// components/GetAccessButton.tsx
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}

export default function GetAccessButton({ children, href, onClick, icon, className = "" }: Props) {
  const inner = (
    <>
      {/* Layer 1 — blurred outer glow halo */}
      <div className="get-access-glow outter" />

      {/* Layer 2 — sharp inner glow */}
      <div className="get-access-glow inner" />

      {/* Layer 3 — dark fill, 2px inset exposes the glowing border */}
      <div className="get-access-btn-bg" />

      {/* Text */}
      <p
        className="relative z-10 m-0 text-white font-semibold text-[15px] tracking-[-0.01em] whitespace-nowrap"
        style={{ fontFamily: "var(--font-hoves)" }}
      >
        {children}
      </p>

      {/* Icon */}
      {icon && (
        <div className="relative z-10 text-white inline-flex items-center">
          {icon}
        </div>
      )}
    </>
  );

  const base = `relative flex items-center justify-center gap-2 rounded-[99px] px-7 py-5 cursor-pointer no-underline hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 ${className}`;
  const style = {} as const;

  return href
    ? <Link href={href} className={base} style={style}>{inner}</Link>
    : <button onClick={onClick} className={base} style={style}>{inner}</button>;
}