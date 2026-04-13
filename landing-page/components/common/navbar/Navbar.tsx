"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const navLinks = [
  { label: t("navbar.features"), href: "/#features" },
  { label: t("navbar.strategies"), href: "/#strategies" },
  { label: t("navbar.testimonials"), href: "/#testimonials" },
  { label: t("navbar.faq"), href: "/#faq" },
  { label: t("navbar.blog"), href: "/blogs"  },
];



  return (
    <nav className="w-full border-b border-white/5 lg:fixed sticky top-0 z-50 py-2 bg-white/5 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">

          <Image
            src="/logof.png"
            alt="Trading Signals AI"
            width={130}
            height={130}
            className="shrink-0 sm:w-45 "
          />

        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8"style={{ fontFamily: "var(--font-hoves)" }}>
          {navLinks.map((link) => (
  <li key={link.label}>
    <Link
      href={link.href}
      className="text-sm text-gray-300 hover:text-white transition-colors duration-200 font-medium"
      onClick={() => {
        if (link.href === "/blogs") {
          window.scrollTo({ top: 0 });
        }
      }}
    >
      {link.label}
    </Link>
  </li>
))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-1.5 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-200"
            style={{ fontFamily: "var(--font-hoves)" }}

          >
            {t("navbar.login")}
          </Link>
          <Link
            href="/signup"
            className="px-5 py-1.5 rounded-full bg-white text-[#0a0e1a] text-sm font-bold hover:bg-gray-100 transition-colors duration-200"
            style={{ fontFamily: "var(--font-hoves)" }}
          >
            {t("navbar.signup")}
          </Link>
          <div className="relative flex items-center"style={{ fontFamily: "var(--font-hoves)" }}>
            <select
              value={i18n.language || "en"}
              onChange={handleLanguageChange}
              className="appearance-none bg-transparent text-white text-sm font-medium pr-6 pl-2 py-1.5 border border-white/20 rounded-lg hover:border-white/50 focus:outline-none transition-colors cursor-pointer"
            >
              <option value="en" className="text-black">EN</option>
              <option value="pl" className="text-black">PL</option>
              <option value="th" className="text-black">TH</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen ? (
              <path d="M5 5L17 17M17 5L5 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 6H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 11H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 16H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu — Semi-transparent build */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a0e1a]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
  <Link
    key={link.label}
    href={link.href}
    className="text-gray-300 hover:text-white text-sm font-medium"
    onClick={() => {
      setMobileOpen(false);
      if (link.href === "/blogs") {
        window.scrollTo({ top: 0 });
      }
    }}
  >
    {link.label}
  </Link>
))}
          <div className="flex gap-3 pt-2">
            <Link
              href="/login"
              className="flex-1 text-center px-5 py-2 rounded-full border border-white/30 text-white text-sm font-medium"
            >
              {t("navbar.login")}
            </Link>
            <Link
              href="/signup"
              className="flex-1 text-center px-5 py-2 rounded-full bg-white text-[#0a0e1a] text-sm font-bold"
            >
              {t("navbar.signup")}
            </Link>
          </div>
          <div className="relative mt-2">
            <select
              value={i18n.language || "en"}
              onChange={handleLanguageChange}
              className="w-full appearance-none bg-transparent text-white text-sm font-medium px-4 py-2 border border-white/20 rounded-lg focus:outline-none"
            >
              <option value="en" className="text-black">English (EN)</option>
              <option value="pl" className="text-black">Polski (PL)</option>
              <option value="th" className="text-black">ไทย (TH)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}