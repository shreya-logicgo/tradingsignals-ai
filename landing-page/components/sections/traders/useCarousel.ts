"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

interface UseCarouselOptions {
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  /**
   * Embla duration controls scroll animation speed.
   * Lower values = faster. Range 20–60 works well for premium feel.
   * Default: 28 (smooth but snappy — luxury SaaS feel)
   */
  duration?: number;
  dragFree?: boolean;
}

export function useCarousel({
  loop = true,
  autoplay = true,
  autoplayDelay = 4500,
  duration = 28,
  dragFree = false,
}: UseCarouselOptions = {}) {
  /**
   * Stable autoplay plugin ref — recreating this on render causes jitter
   * and breaks the stopOnMouseEnter / resume cycle.
   */
  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,   // don't kill autoplay on drag; resume after
      stopOnMouseEnter: true,     // pause on hover
      stopOnFocusIn: true,        // pause on keyboard focus
      playOnInit: true,
    })
  );

  /**
   * KEY FIX — Options that produce clean horizontal-only looping:
   *
   * ✅ loop: true              — enables seamless infinite scroll
   * ✅ align: "start"          — slides anchor left; avoids centering math
   *                              that can cause fractional-pixel drift
   * ✅ duration                — controls easing speed (not CSS transition)
   * ✅ skipSnaps: false        — always snap to a defined slide position;
   *                              prevents momentum overshooting to wrong index
   * ✅ dragFree: false         — free-drag + loop = vertical drift on mobile
   * ❌ containScroll removed   — "trimSnaps" / "keepSnaps" conflict with loop
   *                              mode and cause the bottom-merge artifact:
   *                              Embla shifts cloned slides on the Y axis when
   *                              containScroll tries to trim the scroll bounds
   *                              but loop has already repositioned the clone.
   * ❌ watchSlides removed     — not a valid EmblaOptionsType key; harmless but
   *                              noisy; watchResize handles DOM changes.
   */
  const options: EmblaOptionsType = useMemo(
    () => ({
      loop,
      align: "start",
      duration,
      skipSnaps: false,
      dragFree,
      watchDrag: true,
      watchResize: true,
    }),
    [loop, duration, dragFree]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoplay ? [autoplayPlugin.current] : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelected = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateSelected(emblaApi);
    emblaApi.on("select", updateSelected);
    emblaApi.on("reInit", updateSelected);

    return () => {
      emblaApi.off("select", updateSelected);
      emblaApi.off("reInit", updateSelected);
    };
  }, [emblaApi, updateSelected]);

  /**
   * After manual navigation, reset the autoplay timer so the card the user
   * just navigated to gets its full dwell time before advancing.
   */
  const restartAutoplay = useCallback(() => {
    if (!autoplay) return;
    autoplayPlugin.current?.reset();
  }, [autoplay]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    restartAutoplay();
  }, [emblaApi, restartAutoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    restartAutoplay();
  }, [emblaApi, restartAutoplay]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      restartAutoplay();
    },
    [emblaApi, restartAutoplay]
  );

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}