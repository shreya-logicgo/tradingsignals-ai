import Navbar from "@/components/common/navbar/Navbar";
import "./globals.css";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Footer from "@/components/common/footer/Footer";
import { I18nProvider } from "@/components/I18nProvider";
import SmoothScrollHandler from "@/components/common/SmoothScrollHandler";
import NoiseOverlay from "@/components/NoiseOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const ttHoves = localFont({
  src: [
    {
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-hoves",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable} ${ttHoves.variable}`}>
        <NoiseOverlay />
        <I18nProvider>
          <SmoothScrollHandler />
          <Navbar />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}