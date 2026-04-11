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
      className="w-full relative lg:py-30 "

    >
      <div
  className="absolute inset-0 pointer-events-none"
  style={{
    zIndex: 0,
    background: `radial-gradient(
  ellipse 27% 52% at 50% 50%,
  rgba(0, 18, 184, 0.50) 0%,
  rgba(0, 18, 184, 0.25) 30%,
  rgba(0, 18, 184, 0.08) 55%,
  transparent 70%
)`,
  }}
/>
      {/* ── GlowBar Image ── */}
      <div
        className="absolute -top-90 mx-auto inset-0 pointer-events-none lg:h-250 lg:max-w-300"
        style={{ zIndex: 1 }}
      >
        <Image
          src={glowBar}
          alt=""
          fill
          sizes="100vw" // ✅ FIXED (removes warning)
          className=""
          style={{ mixBlendMode: "screen" }}
          priority
        />
      </div>

      {/* ── Stats Content ── */}
      {/* <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 2 }}
      > */}
      <div className="flex flex-col md:flex-row items-center justify-center" style={{ zIndex: 2, position: "relative" }}>
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col md:flex-row items-center">

            {/* Divider */}
            {i > 0 && (
              <div
                className="w-16 h-[1px] md:w-[1px] md:h-[44px] my-6 md:my-0 md:mx-[60px] shrink-0"
            
              />
            )}

            {/* Stat Block */}
            <div className="flex flex-col items-center text-center">
              <span
                className="text-4xl md:text-[50px] text-white tracking-[-0.5px] leading-[1.1]"
                style={{
                  fontFamily: "var(--font-hoves)",
                }}
              >
                {stat.number}
              </span>

              <span
                className="text-xs md:text-[14px] text-white/70 mt-2 md:mt-[10px] whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-hoves)",
                }}
              >
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </section>
  );
}