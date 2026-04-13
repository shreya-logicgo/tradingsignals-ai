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
    <div className="relative w-full">
      {/* The Glow Effect: Placed outside so it isn't clipped by overflow-hidden. top-0, left-1/2, and -translate-y-1/2 centers it exactly on the top border. */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-3/4 max-w-3xl z-0 bg-[#0057FF] blur-[100px] rounded-full opacity-60 pointer-events-none"></div>

      <footer className="bg-[#010B24] border-t border-white/5 relative overflow-hidden">
        {/* Main Content: 
        Needs 'relative z-10' to ensure it renders on top of the z-0 glow. 
      */}
        <div className="max-w-7xl max-h-fit mx-auto px-6 py-14 relative z-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-12 lg:gap-10">
            {/* Brand Column */}
            <div className="flex flex-col gap-6 max-w-xs sm:mx-0 mx-auto items-center sm:items-start">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <Image
                  src="/logof.png"
                  alt="Trading Signals AI"
                  width={130}
                  height={130}
                  className="shrink-0 sm:w-45"
                />
              </Link>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed text-center sm:text-start">
                {t("footer.description")}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-5">
                {/* Telegram */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors duration-200"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
                
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors duration-200"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="flex gap-16 md:gap-24 lg:gap-24 lg:justify-start justify-center">
              {/* Product */}
              <div className="flex flex-col gap-5">
                <h4 className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase opacity-90">
                  {t("footer.sections.product")}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {productLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-[13.5px] hover:text-white transition-all duration-200"
                      >
                        {t(`footer.links.${link.key}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="flex flex-col gap-5">
                <h4 className="text-white text-[11px] font-semibold tracking-[0.2em] uppercase opacity-90">
                  {t("footer.sections.legal")}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {legalLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="text-gray-400 text-[13.5px] hover:text-white transition-all duration-200"
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
        <div className="border-t max-w-7xl mx-auto border-[#343445] border-dashed relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-gray-500 text-xs">
              {t("footer.copyright")}
            </p>
            <p className="text-gray-500 text-xs sm:text-right  leading-relaxed">
              {t("footer.disclaimer")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}