import Navbar from "@/components/common/navbar/Navbar";
import "./globals.css";
import { Inter, Space_Mono } from "next/font/google";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceMono.variable}`}>
        <I18nProvider>
          <Navbar/>
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}