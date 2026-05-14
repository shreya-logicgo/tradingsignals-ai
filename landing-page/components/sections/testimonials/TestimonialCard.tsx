"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const FULLSCREEN_CHROME_IDLE_MS = 2800;

interface TestimonialCardProps {
  /** Public path to MP4, e.g. `/videos/1.mp4` */
  videoSrc: string;
  quote: string;
  playbackId: string;
  /** Whichever card is “active”; others are paused */
  activePlaybackId: string | null;
  onVideoPlay: (playbackId: string) => void;
}

function PlayIcon() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="translate-x-px"
      aria-hidden
    >
      <path d="M1 1L15 9L1 17V1Z" fill="white" fillOpacity="0.95" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="1" y="1" width="4" height="14" rx="1" fill="white" fillOpacity="0.95" />
      <rect x="9" y="1" width="4" height="14" rx="1" fill="white" fillOpacity="0.95" />
    </svg>
  );
}

export default function TestimonialCard({
  videoSrc,
  quote,
  playbackId,
  activePlaybackId,
  onVideoPlay,
}: TestimonialCardProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenChromeVisible, setFullscreenChromeVisible] = useState(true);
  const fullscreenIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFullscreenIdleTimer = useCallback(() => {
    if (fullscreenIdleTimerRef.current !== null) {
      clearTimeout(fullscreenIdleTimerRef.current);
      fullscreenIdleTimerRef.current = null;
    }
  }, []);

  const scheduleFullscreenChromeHide = useCallback(() => {
    clearFullscreenIdleTimer();
    fullscreenIdleTimerRef.current = setTimeout(() => {
      fullscreenIdleTimerRef.current = null;
      setFullscreenChromeVisible(false);
    }, FULLSCREEN_CHROME_IDLE_MS);
  }, [clearFullscreenIdleTimer]);

  const wakeFullscreenChrome = useCallback(() => {
    setFullscreenChromeVisible(true);
    scheduleFullscreenChromeHide();
  }, [scheduleFullscreenChromeHide]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (activePlaybackId !== playbackId) {
      el.pause();
    }
  }, [activePlaybackId, playbackId]);

  useEffect(() => {
    const sync = () => {
      const fs =
        document.fullscreenElement ??
        (document as Document & { webkitFullscreenElement?: Element | null })
          .webkitFullscreenElement;
      setIsFullscreen(fs === stageRef.current);
    };
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      clearFullscreenIdleTimer();
      setFullscreenChromeVisible(true);
      return;
    }
    wakeFullscreenChrome();
    return () => {
      clearFullscreenIdleTimer();
    };
  }, [isFullscreen, clearFullscreenIdleTimer, wakeFullscreenChrome]);

  const toggleFullscreen = useCallback(async () => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage || !video) return;

    try {
      const doc = document as Document & {
        webkitFullscreenElement?: Element | null;
        webkitExitFullscreen?: () => void;
      };
      const stageEl = stage as HTMLElement & {
        webkitRequestFullscreen?: () => void;
      };

      if (document.fullscreenElement === stage) {
        await document.exitFullscreen();
        return;
      }
      if (doc.webkitFullscreenElement === stage) {
        doc.webkitExitFullscreen?.();
        return;
      }
      if (stageEl.requestFullscreen) {
        await stageEl.requestFullscreen();
      } else if (stageEl.webkitRequestFullscreen) {
        stageEl.webkitRequestFullscreen();
      } else {
        throw new Error("no fullscreen");
      }
    } catch {
      const v = video as HTMLVideoElement & {
        webkitEnterFullscreen?: () => void;
      };
      v.webkitEnterFullscreen?.();
    }
  }, []);

  const handleToggle = () => {
    if (isFullscreen) {
      wakeFullscreenChrome();
    }
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      onVideoPlay(playbackId);
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const chromeHiddenInFs = isFullscreen && !fullscreenChromeVisible;

  return (
    <div className="w-full max-w-[440px] h-full lg:h-fit p-5 rounded-[15px] bg-white/5 border border-white/10 flex flex-col gap-5 box-border backdrop-blur-sm transition-all duration-300 hover:border-white/20 overflow-hidden shrink-0">

      <div
        ref={stageRef}
        className="group relative h-[200px] w-full shrink-0 overflow-hidden rounded-[15px] bg-black"
        onMouseMove={() => {
          if (isFullscreen) wakeFullscreenChrome();
        }}
        onTouchStart={() => {
          if (isFullscreen) wakeFullscreenChrome();
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />

        {/* Light scrim — only when paused (helps play affordance); hidden while playing for a cleaner frame */}
        <div
          className={`pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/15 to-transparent transition-opacity duration-200 ${
            chromeHiddenInFs
              ? "opacity-0"
              : playing
                ? "opacity-0 group-hover:opacity-100"
                : "opacity-100"
          }`}
          aria-hidden
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            void toggleFullscreen();
          }}
          className={`absolute bottom-2 right-2 z-20 flex cursor-pointer items-center gap-1.5 rounded-md border border-white/15 bg-black/55 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:text-white font-mono ${
            chromeHiddenInFs ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
          }`}
          aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
        >
          {isFullscreen ? (
            <Minimize2 className="size-3.5 shrink-0 opacity-90" aria-hidden />
          ) : (
            <Maximize2 className="size-3.5 shrink-0 opacity-90" aria-hidden />
          )}
          <span>{isFullscreen ? "Exit" : "Full screen"}</span>
        </button>

        <button
          type="button"
          onClick={handleToggle}
          className={`absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-transparent outline-none transition-opacity duration-200 focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/30 ${
            chromeHiddenInFs
              ? "pointer-events-none opacity-0"
              : isFullscreen
                ? "pointer-events-auto opacity-100"
                : playing
                  ? "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
                  : "opacity-100"
          }`}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          <span className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/25 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            {playing ? <PauseIcon /> : <PlayIcon />}
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <p className="card-desc-size2 m-0 font-hoves line-clamp-3 lg:line-clamp-4">
          {quote}
        </p>
      </div>
    </div>
  );
}
