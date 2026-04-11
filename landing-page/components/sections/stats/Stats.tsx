import Image from "next/image";
import glowBar from "@/assets/images/glowBars.png";

const stats = [
  { number: "1,250+", label: "Registered Users" },
  { number: "$4.5M", label: "Assets Under Management" },
  { number: "$12M", label: "Total Followers PNL" },
];

export default function Stats() {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        backgroundColor: "#010B24",
        height: "260px",
      }}
    >
      {/* ── GlowBar Image ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <Image
          src={glowBar}
          alt=""
          fill
          sizes="100vw" // ✅ FIXED (removes warning)
          className="object-cover object-bottom"
          style={{ mixBlendMode: "screen" }}
          priority
        />
      </div>

      {/* ── Stats Content ── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <div className="flex items-center justify-center">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              
              {/* Divider */}
              {i > 0 && (
                <div
                  style={{
                    width: "1px",
                    height: "44px",
                    background: "rgba(255,255,255,0.12)",
                    margin: "0 60px",
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Stat Block */}
              <div className="flex flex-col items-center text-center">
                <span
                  style={{
                    fontSize: "48px",
                    fontFamily: "var(--font-hoves)",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.number}
                </span>

                <span
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.50)",
                    marginTop: "10px",
                    fontFamily: "var(--font-hoves)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}