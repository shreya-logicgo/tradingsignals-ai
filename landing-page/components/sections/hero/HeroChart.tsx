"use client";

import { useRef, useState, useEffect } from "react"; // Added useEffect
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView, // Added useInView
} from "framer-motion";
import Container from "@/components/common/container/Container";

export default function HeroChart() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if user is currently looking at the hero section
  const isInView = useInView(cardRef, { amount: 0.4 });

  // ── AUTOPLAY LOGIC ──
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isInView && !isPlaying) {
      // Start 3s countdown if in view and not already playing
      timer = setTimeout(() => {
        handlePlay();
      }, 3000);
    }

    return () => clearTimeout(timer); // Cleanup if they scroll away before 3s
  }, [isInView]);

  // ── Raw mouse values ──
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springConfig = { stiffness: 25, damping: 32, mass: 1.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const videoX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const videoY = useTransform(springY, [-0.5, 0.5], [-6, 6]);
  const playX  = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const playY  = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  const barX   = useTransform(springX, [-0.5, 0.5], [-3, 3]);

  const glowSpring = { stiffness: 30, damping: 35, mass: 2 };
  const glowXSpring = useSpring(glowX, glowSpring);
  const glowYSpring = useSpring(glowY, glowSpring);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  };

  const handlePlay = () => { 
    videoRef.current?.play().catch(err => console.log("Autoplay blocked by browser", err));
    setIsPlaying(true); 
  };
  const handlePause = () => { videoRef.current?.pause(); setIsPlaying(false); };

  return (
    <section className="w-full relative z-10 pt-2 lg:pt-[10px] mx-auto">
      <Container className="flex justify-center">
        <div className="relative w-full max-w-[1100px]">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_50%_40%,_rgba(0,120,255,0.25)_0%,_rgba(0,60,180,0.1)_50%,_transparent_75%)] blur-[40px] pointer-events-none" />

          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              transformPerspective: 1200,
              willChange: "transform",
            }}
          >
            <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#02081e]/45 backdrop-blur-2xl border border-transparent/10">
              
              <motion.div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  pointerEvents: "none",
                  zIndex: 20,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.8s ease",
                  background: useTransform(
                    [glowXSpring, glowYSpring],
                    ([x, y]: number[]) =>
                      `radial-gradient(circle at ${x}% ${y}%, rgba(59,130,246,0.12) 0%, transparent 60%)`
                  ),
                }}
              />

              <motion.div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  pointerEvents: "none",
                  zIndex: 19,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 1s ease",
                  background: useTransform(
                    [glowXSpring, glowYSpring],
                    ([x, y]: number[]) =>
                      `radial-gradient(ellipse at ${x}% ${y}%, rgba(255,255,255,0.04) 0%, transparent 55%)`
                  ),
                }}
              />

              <motion.div
                style={{ x: barX }}
                className="flex items-center gap-2 px-4 py-3 md:py-3.5 bg-white/[0.03] border-b border-white/[0.06]"
              >
                <div className="flex gap-1.5 flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-80" />
                </div>
                <div className="flex-grow flex justify-center">
                  <div className="bg-white/5 border border-white/5 rounded-md px-4 md:px-12 py-1.5 md:py-1 text-white text-[11px] md:text-xs font-mono tracking-normal md:tracking-wider min-w-[120px] md:min-w-[240px] text-center opacity-60">
                    tradingsignals.ai
                  </div>
                </div>
                <div className="w-12 hidden md:block" />
              </motion.div>

              <div className="relative w-full overflow-hidden">
                <motion.div style={{ x: videoX, y: videoY }}>
                  <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    className="w-full h-auto block cursor-pointer"
                    onEnded={() => setIsPlaying(false)}
                    onClick={isPlaying ? handlePause : handlePlay}
                  >
                    <source src="/videos/hero-video.mp4" type="video/mp4" />
                  </video>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 h-[70%] pointer-events-none bg-gradient-to-t from-[#01081c] via-[#01081c]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#01081c] pointer-events-none" />

                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <motion.div style={{ x: playX, y: playY }}>
                      <motion.button
                        onClick={handlePlay}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="group flex items-center gap-4 px-4 py-2.5 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/20 active:scale-95"
                      >
                        <div className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 shadow-[0_0_25px_rgba(37,99,235,0.6)] group-hover:shadow-[0_0_35px_rgba(37,99,235,0.8)] transition-all duration-500">
                          <div className="w-0 h-0 border-y-[5px] md:border-y-[7px] border-l-[10px] md:border-l-[13px] border-transparent border-l-white ml-1" />
                        </div>
                        <div className="flex flex-col text-left leading-none">
                          <span className="text-white font-medium text-sm md:text-base tracking-tight font-hoves">
                            Watch Demo
                          </span>
                          <span className="text-white/40 text-[10px] md:text-[11px] mt-1 uppercase tracking-widest font-hoves">
                            0:58 min
                          </span>
                        </div>
                      </motion.button>
                    </motion.div>
                  </div>
                )}

                {isPlaying && (
                  <button
                    onClick={handlePause}
                    className="absolute bottom-6 right-6 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 transition-all duration-200"
                    aria-label="Pause video"
                  >
                    <div className="flex gap-[3px]">
                      <div className="w-[3px] h-[12px] bg-white rounded-full" />
                      <div className="w-[3px] h-[12px] bg-white rounded-full" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

         <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-4/5 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-sm" />

          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#010B24] via-[#010B24]/50 to-transparent pointer-events-none rounded-b-3xl z-20" />
        </div>
      </Container>
    </section>
  );
}