"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Container from "@/components/common/container/Container";
import { AnimatePresence, motion } from 'framer-motion';


const languages = [
  { code: "en", flag: "https://flagcdn.com/us.svg" },
  { code: "th", flag: "https://flagcdn.com/th.svg" },
  { code: "pl", flag: "https://flagcdn.com/pl.svg" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <Container className="h-16 flex items-center px-6 md:px-10  2xl:px-32">
        {/* lg:px-22 xl:px-15 */}
        {/* LOGO - Wrapped in a div to control width if needed */}
        <div className="flex-none">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logof.png"
              alt="Trading Signals AI"
              width={120}
              height={120}
              className=" w-35 md:w-36 lg:w-40 xl:w-48 "
            />
          </Link>
        </div>

        {/* 2. NAVIGATION LINKS - Desktop */}
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

        {/* 3. ACTIONS - Desktop */}
        <div className="hidden lg:flex items-center flex-none gap-4">
          <Link
            href="https://crypto.tradingsignals.ai/login"
            className="relative inline-flex items-center justify-center px-6 py-2 rounded-full group"
          >
            {/* The Masked Border Container */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none p-[1px]"
              style={{
                // This CSS mask subtracts the inner area from the outer area, creating a perfect 1px transparent hollow ring.
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
            >
              {/* The Moving Border (The "Snake") */}
              <div className="absolute inset-[-1000%] animate-spin [animation-duration:4s] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,#ffffff_100%)]" />
            </div>

            {/* Button Content */}
            <span className="relative z-10 text-sm font-medium text-white transition-all">
              {t("navbar.login")}
            </span>
          </Link>

          {/* Language Selector Desktop */}
          <div className="relative flex items-center" ref={langRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-2 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Select Language"
            >
              <img
                src={languages.find(l => l.code === (i18n.language?.split('-')[0] || "en"))?.flag || "https://flagcdn.com/us.svg"}
                alt="flag"
                className="w-6 h-4 object-cover rounded-sm shadow-sm"
              />
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 right-0 bg-[#0A1129]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col min-w-[70px] z-[60]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`px-4 py-3 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer ${(i18n.language?.split('-')[0] || "en") === lang.code ? "bg-white/5" : ""
                        }`}
                    >
                      <img
                        src={lang.flag}
                        alt={lang.code}
                        className="w-8 h-5 object-cover rounded shadow-sm"
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden ml-auto">
          <button
            className="text-white p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
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
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[64px] lg:hidden bg-[#010B24]/98 backdrop-blur-2xl z-40 flex flex-col h-[calc(100vh-64px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-white text-xl font-medium py-3 border-b border-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Link
                  href="https://crypto.tradingsignals.ai/login"
                  className="w-full text-center px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("navbar.login")}
                </Link>
                <Link
                  href="/"
                  className="w-full text-center px-6 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("navbar.signup")}
                </Link>
              </div>

              {/* Mobile Language Selector */}
              <div className="flex justify-center gap-6 py-6 border-t border-white/10">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setMobileOpen(false);
                    }}
                    className={`transition-all duration-300 active:scale-110 p-1 rounded-lg ${(i18n.language?.split('-')[0] || "en") === lang.code
                        ? "bg-white/10 scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                        : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                      }`}
                  >
                    <img
                      src={lang.flag}
                      alt={lang.code}
                      className="w-12 h-8 object-cover rounded shadow-sm"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}