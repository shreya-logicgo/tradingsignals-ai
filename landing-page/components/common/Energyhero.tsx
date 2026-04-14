"use client";

// ─────────────────────────────────────────────────────────────────────────────
// EnergyHero.tsx
// Full-screen hero section with the 3D energy streams background.
// Usage: drop <EnergyHero /> anywhere you need that Montfort-style visual.
// ─────────────────────────────────────────────────────────────────────────────

import dynamic from "next/dynamic";

// Load the 3D canvas only on client (no SSR)
const EnergyStreams3D = dynamic(() => import("./EnergyStreams3D"), {
  ssr: false,
  loading: () => null,
});

export default function EnergyHero() {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(180deg, #020b18 0%, #030f22 50%, #010810 100%)" }}
    >
      {/* ── Atmospheric radial glow at convergence point ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "35vh",
          background:
            "radial-gradient(ellipse at center bottom, rgba(0,160,255,0.18) 0%, rgba(0,60,180,0.10) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* ── Subtle star field ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.55 }}>
        <StarField />
      </div>

      {/* ── 3D Energy Streams — fills the whole section ── */}
      <div className="absolute inset-0">
        <EnergyStreams3D />
      </div>

      {/* ── Hero text ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-32">
        <p
          className="text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: "rgba(0,220,255,0.6)", fontFamily: "var(--font-hoves)" }}
        >
          Next Generation Trading
        </p>
        <h1
          className="font-semibold leading-[1.08] tracking-tight text-white"
          style={{
            fontFamily: "var(--font-hoves)",
            fontSize: "clamp(48px, 7vw, 96px)",
            textShadow:
              "0 0 60px rgba(0,180,255,0.25), 0 0 120px rgba(0,80,200,0.15)",
          }}
        >
          Trade with Ease
        </h1>
        <p
          className="mt-6 max-w-xl text-base md:text-lg"
          style={{
            color: "rgba(180,210,240,0.65)",
            fontFamily: "var(--font-hoves)",
          }}
        >
          Institutional-grade execution. Zero compromise on speed or clarity.
        </p>
      </div>

      {/* ── Horizon edge vignette ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "30%",
          background:
            "linear-gradient(to top, rgba(1,8,16,0.95) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}

// ─── Simple CSS star field ────────────────────────────────────────────────────
function StarField() {
  // 80 random stars via inline style array
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    top:  `${Math.random() * 65}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() < 0.2 ? 2 : 1,
    opacity: 0.2 + Math.random() * 0.5,
    delay: `${Math.random() * 4}s`,
  }));

  return (
    <>
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: var(--op); }
          50% { opacity: calc(var(--op) * 0.3); }
        }
      `}</style>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            "--op": s.opacity,
            opacity: s.opacity,
            animation: `star-twinkle ${2 + Math.random() * 3}s ease-in-out ${s.delay} infinite`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}