"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const productLinks = [
  { key: "features", href: "#features" },
  { key: "strategies", href: "#strategies" },
  { key: "testimonials", href: "#testimonials" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
];

const legalLinks = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
  { key: "risk", href: "/risk" },
  { key: "cookie", href: "/cookies" },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full"
    style={{fontFamily: "var(--font-hoves)"}}
    >
      {/* The Glow Effect: Placed outside so it isn't clipped by overflow-hidden. top-0, left-1/2, and -translate-y-1/2 centers it exactly on the top border. */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-3/4 max-w-3xl z-0 bg-[#0057FF] blur-[100px] rounded-full opacity-60 pointer-events-none"></div>

      <footer className="bg-[#010B24] border-t border-white/5 relative overflow-hidden">
        {/* Main Content: 
        Needs 'relative z-10' to ensure it renders on top of the z-0 glow. 
      */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">

            {/* Brand Block */}
            <div className="md:col-span-2 flex flex-col gap-6 sm:justify-start sm:items-start justify-center items-center">
              <Link href="/" className="inline-block transition-transform hover:scale-[1.02] duration-300">
                <Image
                  src="/logof.png"
                  alt="Trading Signals AI"
                  width={130}
                  height={130}
                  className="h-auto w-32 md:w-36"
                  priority
                />
              </Link>
              <p className="text-gray-400 text-[14px] leading-relaxed max-w-sm">
                {t("footer.description")}
              </p>

              <div className="flex items-center gap-3">
                {[
                  { icon: "telegram", href: "https://t.me" },
                  { icon: "instagram", href: "https://instagram.com" }
                ].map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-all duration-300 shadow-lg"
                  >
                    {social.icon === "telegram" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.53.26l.204-3.13 5.385-4.86c.234-.208-.05-.325-.36-.12l-6.656 4.19-3.036-.95c-.66-.206-.67-.66.14-.97l11.85-4.57c.55-.2 1.03.13.89.78z" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="flex justify-around w-90">

              <div className="flex flex-col gap-6">
                <h4 className="text-white text-[13px] font-bold tracking-[0.1em] uppercase">
                  {t("footer.sections.product")}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {productLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-sm hover:text-[#00F0FF] transition-colors duration-200"
                      >
                        {t(`footer.links.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-6">
                <h4 className="text-white text-[13px] font-bold tracking-[0.1em] uppercase">
                  {t("footer.sections.legal")}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {legalLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-sm hover:text-[#00F0FF] transition-colors duration-200"
                      >
                        {t(`footer.links.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-gray-400 text-sm font-medium">
                {t("footer.copyright")}
              </p>
              <p className="text-gray-600 text-[11px] leading-relaxed max-w-2xl opacity-80">
                {t("footer.disclaimer")}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono font-bold">
                Operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}