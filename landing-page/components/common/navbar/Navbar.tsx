"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/5">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Trading Signals"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-8 text-white">
          <Link href="#features" className="hover:text-blue-400 transition">
            Features
          </Link>
          <Link href="#strategies" className="hover:text-blue-400 transition">
            Strategies
          </Link>
          <Link href="#testimonials" className="hover:text-blue-400 transition">
            Testimonials
          </Link>
          <Link href="#faq" className="hover:text-blue-400 transition">
            FAQ
          </Link>
        </div>

        {/* CTA */}
        <button className="px-5 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition r-4">
          Start Trading Now
        </button>
      </nav>
    </header>
  );
}