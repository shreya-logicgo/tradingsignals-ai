"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Container from "@/components/common/container/Container";
import { motion } from 'framer-motion';


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const navLinks = [
    { label: t("navbar.features"), href: "/#features" },
    { label: t("navbar.strategies"), href: "/#strategies" },
    { label: t("navbar.testimonials"), href: "/#testimonials" },
    { label: t("navbar.faq"), href: "/#faq" },
    { label: t("navbar.blog"), href: "/blogs" },
  ];

  return (
    <nav
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
        !scrolled && "bg-transparent py-5 border-b border-transparent",
        scrolled && "bg-transparent/70 backdrop-blur-xl py-3 border-b border-white/10",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* 1. Use flex items-center and a consistent max-width */}
      <Container className="h-11 flex items-center px-6 md:px-18 lg:px-32 xl:px-30 2xl:px-40">

        {/* LOGO - Wrapped in a div to control width if needed */}
        <div className="flex-none">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logof.png"
              alt="Trading Signals AI"
              width={130}
              height={130}
              className="shrink-0 w-32 md:w-36 lg:w-40 xl:w-48 2xl:w-56"
            />
          </Link>
        </div>

        {/* 2. NAVIGATION LINKS - Using flex-1 and justify-center to force the center */}
        <ul className="hidden lg:flex flex-1 items-center justify-center gap-3 xl:gap-8 2xl:gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 3. ACTIONS - Using flex-none so it doesn't grow and stays on the right */}
        <div className="hidden lg:flex items-center flex-none gap-4">
          {/* <Link
            href="/login"
            className="px-6 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-all"
          >
            {t("navbar.login")}
          </Link> */}


          <Link
            href="/"
            className="relative inline-block overflow-hidden rounded-full p-[1.5px] group outline-none transition-transform duration-200 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
            style={{ fontFamily: "var(--font-hoves)" }}
          >
            {/* 1. The Moving Gradient Layer */}
            <motion.div
              className="absolute top-0 bottom-0 w-[200%] z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ left: '-150%' }}
              animate={{ left: '100%' }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 2.5,
              }}
            />

            {/* 2. Inner Container (The Mask) */}
            <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-[#010B24] group-hover:bg-white/10 transition-colors duration-200 px-4 py-1 xl:px-5 xl:py-1.5 2xl:px-6 2xl:py-2">
              <span className="text-[12px] xl:text-sm 2xl:text-base font-medium whitespace-nowrap">
                {t("navbar.login")}
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="px-4 py-1.5 xl:px-5 xl:py-1 2xl:px-6 2xl:py-2 rounded-full bg-white text-black text-[12px] xl:text-sm 2xl:text-base font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {t("navbar.signup")}
          </Link>

          {/* Language Selector */}
          <div className="relative flex items-center" style={{ fontFamily: "var(--font-hoves)" }}>
            <select
              value={i18n.language || "en"}
              onChange={handleLanguageChange}
              className="appearance-none bg-transparent text-white text-sm xl:text-base 2xl:text-lg font-medium pr-8 pl-3 py-1.5 xl:py-2 border border-white/20 rounded-lg focus:outline-none transition-colors cursor-pointer"
            >
              <option value="en" className="text-black">EN</option>
              <option value="pl" className="text-black">PL</option>
              <option value="th" className="text-black">TH</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden ml-auto">
          <button className="text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 6H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Menu Content */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#010B24]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-white text-lg font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <Link
              href="/login"
              className="w-full text-center px-6 py-3 rounded-full border border-white/20 text-white font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {t("navbar.login")}
            </Link>
            <Link
              href="/signup"
              className="w-full text-center px-6 py-3 rounded-full bg-white text-black font-bold"
              onClick={() => setMobileOpen(false)}
            >
              {t("navbar.signup")}
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
