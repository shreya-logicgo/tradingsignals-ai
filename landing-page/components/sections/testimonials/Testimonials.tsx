import TestimonialCard from "./TestimonialCard";
import img1 from "@/assets/images/testimonial-1.jpg";
import img2 from "@/assets/images/testimonial-2.jpg";
import img3 from "@/assets/images/testimonial-3.jpg";
import img4 from "@/assets/images/testimonial-4.jpg";
import img5 from "@/assets/images/testimonial-5.jpg";

// Note: replace img3 below with testimonial-4.jpg once you add it to assets/images/
const leftCards = [
  {
    image: img1,
    quote:
      '"Trading Signals AI has been a game-changer for me as a beginner in the world of crypto trading. Before joining, I was hesitant to explore into the market, fearing I\'d make costly mistakes."',
  },
  {
    image: img2,
    quote:
      '"Their platform is intuitive and user-friendly, and their signals provide clear entry and exit points, making it easy for beginners like me to follow."',
  },
];

const rightCards = [
  {
    image: img4,
    quote:
      '"With Trading Signals AI, I found a welcoming community and a wealth of resources to guide me on my trading journey."',
  },
  {
    image: img5, // ← swap to img4 once testimonial-4.jpg is added
    quote:
      '"Trading Signals AI has been a game-changer for me as a beginner in the world of crypto trading. Before joining, I was hesitant to explore into the market, fearing I\'d make costly mistakes."',
  },
];

export default function Testimonials() {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,40,255,0.25) 0%, rgba(0,18,184,0.15) 30%, rgba(0,10,80,0.08) 55%, rgba(1,6,26,0) 100%)",
        padding: "120px 0",
      }}
    >
      {/* Radial depth glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1000px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(37,99,235,0.15) 40%, rgba(1,6,26,0) 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="w-full mx-auto relative"
        style={{
          paddingLeft: "clamp(20px, 13vw, 250px)",
          paddingRight: "clamp(20px, 13vw, 250px)",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "1420px",
            display: "grid",
            gridTemplateColumns: "31% 1fr 31%",
            gap: "clamp(20px, 3vw, 50px)",
            alignItems: "start",
          }}
        >
          {/* ── Left Column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 3vw, 50px)" }}>
            {leftCards.map((card, i) => (
              <TestimonialCard key={i} {...card} />
            ))}
          </div>

          {/* ── Center Content ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "30px",
              marginTop: "40px",
            }}
          >
            {/* Badge */}
            <div
              style={{
                padding: "5px 14px",
                borderRadius: "40px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Testimonials
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                lineHeight: "1.2",
                fontWeight: 500,
                color: "#FFFFFF",
                fontFamily: "var(--font-hoves)",
                margin: 0,
              }}
            >
              Trusted by 1k+
              <br />
              Traders
            </h2>

            {/* Subtext */}
            <p
              style={{
                fontSize: "clamp(13px, 1.2vw, 16px)",
                color: "rgba(255,255,255,0.65)",
                lineHeight: "1.6",
                margin: 0,
                fontFamily: "var(--font-hoves)",
              }}
            >
              Real results from real traders using Trading Signals AI
            </p>

            {/* 5th card */}
            <div style={{ width: "100%", marginTop: "10px" }}>
              <TestimonialCard
                image={img3}
                quote="Trading Signals AI has transformed my trading experience. The platform is user-friendly, and the signals are accurate and timely. I've seen a significant improvement in my trading performance since I started using it."
              />
            </div>
          </div>

          {/* ── Right Column ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 3vw, 50px)" }}>
            {rightCards.map((card, i) => (
              <TestimonialCard key={i} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}