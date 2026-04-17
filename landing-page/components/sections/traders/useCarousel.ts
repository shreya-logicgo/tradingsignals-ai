"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

interface UseCarouselOptions {
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  speed?: number; // Higher = slower / smoother glide
  dragFree?: boolean;
}

export function useCarousel({
  loop = true,
  autoplay = true,
  autoplayDelay = 4500,
  speed = 55,
  dragFree = false,
}: UseCarouselOptions = {}) {
  /**
   * Keep plugin stable across renders
   */
  const autoplayPlugin = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      playOnInit: true,
    })
  );

  /**
   * Smoother motion settings
   */
  const options: EmblaOptionsType = useMemo(
    () => ({
      loop,
      align: "start",
      duration: speed,
      skipSnaps: false,
      dragFree,
      containScroll: "trimSnaps",
      watchDrag: true,
      watchResize: true,
    }),
    [loop, speed, dragFree]
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
   * Restart autoplay after manual navigation
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