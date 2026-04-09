import Image from "next/image";
import chart from "@/assets/images/chart.png";
import Container from "@/components/common/container/Container";

export default function HeroChart() {
  return (
    <section className="w-full relative z-10 pt-[149px]">
      <Container className="flex justify-center">

        <div className="relative w-full max-w-[1100px]">

          {/* Outer ambient glow — blue halo behind the card */}
          <div
            className="absolute -inset-4 -z-10 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(0,120,255,0.25) 0%, rgba(0,60,180,0.1) 50%, transparent 75%)",
              filter: "blur(40px)",
            }}
          />

          {/* Glass card wrapper */}
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(80,160,255,0.25)",
              background: "rgba(2, 8, 30, 0.45)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 0 0 1px rgba(100,180,255,0.08) inset, 0 32px 100px rgba(0,0,0,0.8), 0 0 60px rgba(0,80,255,0.12)",
            }}
          >

            {/* Browser chrome bar */}
            <div
              className="flex items-center gap-2 px-4 py-[10px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(80,160,255,0.12)",
              }}
            >
              {/* Traffic lights */}
              <span className="w-[11px] h-[11px]  rounded-full bg-[#ff5f57]"  />
              <span className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]" />
              <span className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />

              {/* URL bar centred */}
              <div
                className="mx-auto"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                  padding: "4px 28px",
                  color: "#FFFF",
                  minWidth: "240px",
                  textAlign: "center",
                  fontSize: "12px",
                  letterSpacing: "0.02em",
                }}
              >
                tradingsignals.ai
              </div>
            </div>

            {/* Chart image + overlays */}
            <div className="relative w-full">
              <Image
                src={chart}
                alt="Trading Chart"
                className="w-full h-auto block"
                priority
              />

              {/* Bottom fade — tall & strong to match Figma */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: "55%",
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(1,8,28,0.55) 35%, rgba(1,8,28,0.90) 65%, rgba(1,8,28,1) 100%)",
                }}
              />

              {/* Watch Demo button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="group flex items-center gap-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-100"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.20)",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
                    padding: "10px 20px 10px 10px",
                  }}
                >
                  {/* Blue play circle */}
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
                      boxShadow: "0 0 16px rgba(37,99,235,0.6)",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        width: 0,
                        height: 0,
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: "10px solid white",
                        marginLeft: "3px",
                      }}
                    />
                  </span>

                  <span className="flex flex-col leading-tight text-left">
                    <span style={{ color: "white", fontWeight: 600, fontSize: "14px" }}>
                      Watch Demo
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px" }}>
                      1:00 min
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Reflection line under the card */}
          <div
            className="absolute -bottom-px left-1/2 -translate-x-1/2 w-3/4 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(80,160,255,0.5), transparent)",
            }}
          />

        </div>
      </Container>
    </section>
  );
}