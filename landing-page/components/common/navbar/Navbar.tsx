"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Container from "@/components/common/container/Container";

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

        // top state
        !scrolled && "bg-transparent py-5 border-b border-transparent",

        // only blur on scroll
        scrolled && "bg-transparent backdrop-blur-xl py-3 border-b border-transparent",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container className="h-11 flex items-center justify-between px-6 md:px-18 lg:px-32 xl:px-36 2xl:px-40">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logof.png"
            alt="Trading Signals AI"
            width={130}
            height={130}
            className="shrink-0 w-32 md:w-36 lg:w-40 xl:w-48 2xl:w-56"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center lg:gap-4 xl:gap-8 2xl:gap-12">
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

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center lg:gap-4">
          <Link
            href="/login"
            className="px-6 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-all"
          >
            {t("navbar.login")}
          </Link>

          <Link
            href="/signup"
            className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all"
          >
            {t("navbar.signup")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </Container>
    </nav>
  );
}