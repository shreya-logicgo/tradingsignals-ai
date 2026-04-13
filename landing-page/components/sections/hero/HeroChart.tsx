"use client";

import { useRef, useState } from "react";
import Container from "@/components/common/container/Container";

export default function HeroChart() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <section className="w-full relative z-10 pt-2 lg:pt-[10px]">
      <Container className="flex justify-center px-4 md:px-0">
        <div className="relative w-full max-w-[1100px]">

          {/* Outer ambient glow */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_50%_40%,_rgba(0,120,255,0.25)_0%,_rgba(0,60,180,0.1)_50%,_transparent_75%)] blur-[40px] pointer-events-none" />

          {/* Glass card */}
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#02081e]/45 backdrop-blur-2xl border border-transparent/10 shadow-[0_32px_100px_rgba(0,0,0,0.8),_0_0_60px_rgba(0,80,255,0.12)]">

            {/* Browser top-bar */}
            <div className="flex items-center gap-2 px-4 py-3 md:py-3.5 bg-white/[0.03] border-b border-white/[0.06]">
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
            </div>

            {/* Video area */}
            <div className="relative w-full overflow-hidden">
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

              {/* Bottom depth gradient */}
              {/* Bottom depth gradient — extend higher to cover edge glitch */}
              <div className="absolute bottom-0 left-0 right-0 h-[70%] pointer-events-none bg-gradient-to-t from-[#01081c] via-[#01081c]/50 to-transparent" />

              {/* Add this — solid 1px cover at the very bottom edge */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#01081c] pointer-events-none" />

              {/* Play button — shown when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <button
                    onClick={handlePlay}
                    className="group flex items-center gap-4 px-4 py-2.5 md:px-6 md:py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/20 active:scale-95"
                  >
                    <div className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 shadow-[0_0_25px_rgba(37,99,235,0.6)] group-hover:shadow-[0_0_35px_rgba(37,99,235,0.8)] transition-all duration-500">
                      <div className="w-0 h-0 border-y-[5px] md:border-y-[7px] border-l-[10px] md:border-l-[13px] border-transparent border-l-white ml-1" />
                    </div>

                    <div className="flex flex-col text-left leading-none">
                      <span className="text-white font-medium text-sm md:text-base tracking-tight"style={{ fontFamily: "var(--font-hoves)" }}>
                        Watch Demo
                      </span>
                      <span className="text-white/40 text-[10px] md:text-[11px] mt-1 uppercase tracking-widest"style={{ fontFamily: "var(--font-hoves)" }}>
                        0:58 min
                      </span>
                    </div>
                  </button>
                </div>
              )}

              {/* Pause button — shown when playing */}
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

          {/* Bottom horizon reflection */}
          <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-4/5 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-sm" />
        </div>
      </Container>
    </section>
  );
}