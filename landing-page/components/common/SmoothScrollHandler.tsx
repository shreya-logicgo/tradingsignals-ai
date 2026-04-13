"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScrollHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // On initial mount (page load/refresh), always start at the top
    if (isFirstMount.current) {
      window.scrollTo(0, 0);
      isFirstMount.current = false;
      
      // If there's a hash, we clear it to prevent the browser/effect from jumping down
      if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
      }
      return;
    }

    // Handle hash scrolling for subsequent navigations
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");

      const timeoutId = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, searchParams]);

  // Handle smooth scrolling for hash link clicks on the same page
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.hash &&
        anchor.origin === window.location.origin &&
        anchor.pathname === window.location.pathname
      ) {
        const id = anchor.hash.replace("#", "");
        const el = document.getElementById(id);
        
        if (el) {
          e.preventDefault();
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          // Update the URL hash without triggering a full navigation
          window.history.pushState(null, "", anchor.hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return null;
}
