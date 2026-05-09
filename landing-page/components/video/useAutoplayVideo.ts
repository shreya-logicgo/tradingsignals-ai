"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useVideoAutoplayCoordinator } from "./VideoAutoplayContext";

export type UseAutoplayVideoOptions = {
  /** Unique id for coordination (only one registered video should play at a time). */
  videoId: string;
  /**
   * Minimum visible ratio before autoplay is allowed (0–1).
   * Browsers fire IntersectionObserver with discrete steps; we include `threshold` in the
   * observer list so callbacks run when crossing this visibility.
   */
  threshold?: number;
  rootMargin?: string;
  /**
   * Runs right before a visibility-driven `play()` attempt. Defaults to forcing
   * `video.muted = true` so autoplay succeeds on mobile/desktop. Override when the host
   * UI keeps its own mute state in React (see `HeroChart`).
   */
  beforeVisibilityPlay?: (video: HTMLVideoElement) => void;
};

export type UseAutoplayVideoResult = {
  containerRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  /**
   * True after the user pauses via native controls (or any non-programmatic pause).
   * While true, visibility alone will not restart playback.
   */
  userDismissedAutoplay: boolean;
  /**
   * Call immediately before a deliberate user play (custom button, video click, etc.)
   * so other landing videos pause first.
   */
  beforeManualPlay: () => void;
};

/**
 * Core autoplay behavior: IntersectionObserver (~50% visible), muted-friendly play,
 * programmatic pause when off-screen, coordination with other videos, and “sticky”
 * user opt-out until they press play again.
 */
export function useAutoplayVideo(
  options: UseAutoplayVideoOptions
): UseAutoplayVideoResult {
  const {
    videoId,
    threshold = 0.5,
    rootMargin = "0px",
    beforeVisibilityPlay,
  } = options;
  const { register, pauseOthers } = useVideoAutoplayCoordinator();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /** Distinguishes our pause/play calls from user-driven media events. */
  const programmaticActionRef = useRef(false);
  const programmaticResetTimerRef = useRef<number | null>(null);

  const userDismissedRef = useRef(false);
  const [userDismissedAutoplay, setUserDismissedAutoplay] = useState(false);

  const markProgrammatic = useCallback(() => {
    programmaticActionRef.current = true;
    if (programmaticResetTimerRef.current !== null) {
      window.clearTimeout(programmaticResetTimerRef.current);
    }
    // Use a macrotask (not a microtask) so media events triggered by `pause()`/`play()`
    // in the same tick are still treated as programmatic.
    programmaticResetTimerRef.current = window.setTimeout(() => {
      programmaticActionRef.current = false;
      programmaticResetTimerRef.current = null;
    }, 0);
  }, []);

  const safePause = useCallback((video: HTMLVideoElement) => {
    markProgrammatic();
    video.pause();
  }, [markProgrammatic]);

  const safePlay = useCallback(async (video: HTMLVideoElement) => {
    markProgrammatic();
    try {
      await video.play();
    } catch {
      /* Autoplay or decode failures are ignored; user can still tap play. */
    }
    // Keep programmatic flag through the `play` event tick.
    markProgrammatic();
  }, [markProgrammatic]);

  const beforeManualPlay = useCallback(() => {
    // Always reset opt-out on an explicit user play gesture, not only when `play` fires.
    // Otherwise a race with `programmaticActionRef` (after safePlay/safePause) can leave
    // `userDismissedRef` stuck true so scroll autoplay never resumes after “pause → play”.
    userDismissedRef.current = false;
    setUserDismissedAutoplay(false);
    pauseOthers(videoId);
  }, [pauseOthers, videoId]);

  /** Register this instance’s pause handler so other clips can pause us safely. */
  useEffect(() => {
    const unregister = register(videoId, () => {
      const el = videoRef.current;
      if (el && !el.paused) {
        safePause(el);
      }
    });
    return unregister;
  }, [register, safePause, videoId]);

  /** User pause/play semantics: only non-programmatic events change dismissal state. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPause = () => {
      if (programmaticActionRef.current) return;
      userDismissedRef.current = true;
      setUserDismissedAutoplay(true);
    };

    const onPlay = () => {
      if (programmaticActionRef.current) return;
      userDismissedRef.current = false;
      setUserDismissedAutoplay(false);
    };

    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);
    return () => {
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (programmaticResetTimerRef.current !== null) {
        window.clearTimeout(programmaticResetTimerRef.current);
      }
    };
  }, []);

  /** Visibility-driven autoplay / pause */
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const video = videoRef.current;
        // Require ~50% visibility so brief peeks don’t start audio-heavy work.
        const shouldPlay =
          entry.isIntersecting && entry.intersectionRatio >= threshold;

        if (shouldPlay) {
          pauseOthers(videoId);
          // Respect manual pause: `userDismissedRef` flips on non-programmatic `pause` events.
          if (!userDismissedRef.current && video) {
            if (beforeVisibilityPlay) {
              beforeVisibilityPlay(video);
            } else {
              video.muted = true;
            }
            void safePlay(video);
          }
        } else if (video) {
          // You requested: manual pause should not “stick” forever.
          // If the section fully leaves the viewport, reset the manual-pause lock so
          // it can autoplay again on re-enter.
          if (!entry.isIntersecting) {
            userDismissedRef.current = false;
            setUserDismissedAutoplay(false);
          }
          // Leaving view: always pause, but use the safe path so we don’t look like a user opt-out.
          safePause(video);
        }
      },
      {
        root: null,
        rootMargin,
        /**
         * Include 0 so we reliably get updates when leaving the viewport, and include
         * `threshold` so we detect crossing the “half visible” requirement.
         */
        threshold: [0, threshold],
      }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [
    beforeVisibilityPlay,
    pauseOthers,
    safePause,
    safePlay,
    threshold,
    rootMargin,
    videoId,
  ]);

  return {
    containerRef,
    videoRef,
    userDismissedAutoplay,
    beforeManualPlay,
  };
}
