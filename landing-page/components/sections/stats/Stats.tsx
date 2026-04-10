

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
        background: "radial-gradient(circle at center, #020B2A 0%, #01061A 100%)",
        minHeight: "400px",
        padding: "120px 0",
      }}
    >
      {/* Glow Bar — single image spanning full width, anchored to bottom */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/glowBars.png"
          alt=""
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "auto",
            objectFit: "cover",
            objectPosition: "bottom center",
          }}
        />
      </div>

      {/* Center atmosphere glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      {/* Stats content */}
      <div
        className="w-full mx-auto px-5 relative"
        style={{ maxWidth: "1420px", zIndex: 2 }}
      >
        <div
          className="mx-auto flex justify-between items-center text-center"
          style={{ maxWidth: "823px", gap: "100px" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: "var(--font-hoves)",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                }}
              >
                {stat.number}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.6)",
                  marginTop: "8px",
                  fontFamily: "var(--font-hoves)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}