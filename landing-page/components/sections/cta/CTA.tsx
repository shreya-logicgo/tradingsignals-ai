"use client";
import blog1 from "@/assets/images/blog-1.jpg";
import blog2 from "@/assets/images/blog-2.jpg";
import blog3 from "@/assets/images/blog-3.jpg";

const posts = [
  {
    image: blog1,
    title: "2026 AI Trading Strategies for NVDA: Chart & AI Analytics Guide",
    description:
      "Discover how AI-powered analytics are reshaping trading strategies for NVDA in 2026, with real chart breakdowns and signal analysis.",
  },
  {
    image: blog2,
    title: "How to Trade XAUUSD Breakouts Using ATR and AI-empowered Tr...",
    description:
      "Learn how to identify high-probability XAUUSD breakout setups using ATR volatility filters combined with AI signal confirmation.",
  },
  {
    image: blog3,
    title: "PR News: Automate Trading Ideas in Seconds: TradeOS Launches...",
    description:
      "TradeOS introduces a new automation layer that converts raw trading ideas into executable strategies in seconds using AI.",
  },
];

export default function CTA() {
  return (
    <section
      className="w-full relative overflow-hidden py-5"
      style={{ backgroundColor: "#010B24"}}
    >
      <div
        className="w-full mx-auto"
        style={{
          paddingLeft: "clamp(20px, 13vw, 250px)",
          paddingRight: "clamp(20px, 13vw, 250px)",
        }}
      >
        <div
          style={{
            maxWidth: "1420px",
            display: "flex",
            flexDirection: "column",
            gap: "60px",
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              maxWidth: "497px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "30px",
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
                Blogs
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "var(--font-hoves)",
                fontWeight: 500,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                lineHeight: "1.2",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Latest News & Insights
            </h2>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "var(--font-hoves)",
                fontSize: "16px",
                color: "rgba(199,204,210,1)",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              Everything you've ever wanted to know about business insurance.
            </p>
          </div>

          {/* ── Cards + CTA ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            {/* Cards row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                width: "100%",
              }}
            >
              {posts.map((post, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(0)")
                  }
                >
                  {/* Image */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "460 / 300",
                      borderRadius: "15px",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image.src}
                      alt={post.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Text content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-hoves)",
                        fontWeight: 500,
                        fontSize: "20px",
                        color: "#FFFFFF",
                        margin: 0,
                        lineHeight: "1.3",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-hoves)",
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "rgba(199,204,210,1)",
                        lineHeight: "1.5",
                        margin: 0,
                      }}
                    >
                      {post.description}
                    </p>

                    {/* View more link */}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-hoves)",
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        cursor: "pointer",
                      }}
                    >
                      View more
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Learn More button */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <button
                style={{
                  width: "132px",
                  height: "52px",
                  padding: "19px 24px",
                  borderRadius: "40px",
                  background: "transparent",
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontFamily: "var(--font-hoves)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "#FFFFFF";
                  btn.style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.background = "transparent";
                  btn.style.color = "#FFFFFF";
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}