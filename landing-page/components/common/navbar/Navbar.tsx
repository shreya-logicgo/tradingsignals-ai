"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from "@/components/common/container/Container";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-lg py-3 border-b border-white/10" : "bg-transparent py-5"
      }`}
    >
      <Container className="flex items-center px-6 lg:px-16 xl:px-24">
        
        {/* LOGO */}
        <div className="flex-none">
          <Link href="/">
            <Image
              src="/logof.png"
              alt="Trading Signals AI"
              width={150}
              height={40}
              className="w-32 md:w-40"
              priority
            />
          </Link>
        </div>

        {/* NAV LINKS - Pushed to the right using ml-auto */}
        <ul className="hidden lg:flex ml-auto items-center gap-8 xl:gap-10 mr-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">
          {/* LOGIN BUTTON with Animated Border */}
          <Link href="https://crypto.tradingsignals.ai/login" className="relative inline-flex items-center justify-center px-6 py-2 group" > {/* 1. THE MOVING BORDER (Uses mask to stay only on the edge) */} <div className="absolute inset-0 rounded-full p-[1px] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude]"> <div className="absolute inset-[-1000%] animate-spin [animation-duration:4s] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,#ffffff_100%)]" /> </div> {/* 2. THE TEXT (Fully transparent background) */} <span className="relative z-10 text-sm font-medium text-white transition-colors group-hover:text-gray-300"> {t("navbar.login")} </span> </Link>

          <Link
            href="/signup"
            className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all"
          >
            {t("navbar.signup")}
          </Link>

          {/* Language Selector */}
          <div className="relative flex items-center ml-2">
            <select
              value={i18n.language || "en"}
              onChange={handleLanguageChange}
              className="appearance-none bg-transparent text-white text-xs font-bold pr-8 pl-3 py-1.5 border border-white/20 rounded-full cursor-pointer focus:outline-none"
            >
              <option value="en" className="text-black">EN</option>
              <option value="pl" className="text-black">PL</option>
              <option value="th" className="text-black">TH</option>
            </select>
            <div className="pointer-events-none absolute right-2 text-white">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden ml-auto">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </Container>
    </nav>
  );
}