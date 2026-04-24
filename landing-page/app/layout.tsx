import Navbar from "@/components/common/navbar/Navbar";
import "./globals.css";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Footer from "@/components/common/footer/Footer";
import { I18nProvider } from "@/components/I18nProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import SmoothScrollHandler from "@/components/common/SmoothScrollHandler";

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
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial DemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-hoves",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceMono.variable} ${ttHoves.variable} ${ttHoves.className}`}
      >
        <I18nProvider>
          <QueryProvider>
            <SmoothScrollHandler />
            <Navbar />
            {children}
            <Footer />
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}