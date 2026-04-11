import Navbar from "@/components/common/navbar/Navbar";
import "./globals.css";
import { Inter, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Footer from "@/components/common/footer/Footer";
import { I18nProvider } from "@/components/I18nProvider";

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
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial Medium.ttf",
      weight: "500",
    },
    {
      path: "../assets/fonts/tt-hoves/TT Hoves Pro Trial Bold.ttf",
      weight: "700",
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
        <I18nProvider>
          <Navbar/>
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}