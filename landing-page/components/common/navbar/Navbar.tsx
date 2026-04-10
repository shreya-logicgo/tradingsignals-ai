// components/common/navbar/Navbar.tsx
import Link from "next/link";
import Container from "../container/Container";
import Image from "next/image";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Strategies", href: "#strategies" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[transparent] backdrop-blur-md py-4">
      <Container className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            {/* Replace with your actual SVG/Image logo */}
            <div className="relative w-40 h-10">
               <span className="font-hoves font-bold text-xl tracking-tighter italic">
                TRADING <span className="text-blue-500">SIGNALS</span>
               </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="px-6 py-2 text-sm font-medium border border-white/20 rounded-full hover:bg-white/10 transition-all"
          >
            Log in
          </Link>
          <Link 
            href="/signup" 
            className="px-6 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-all"
          >
            Sign up
          </Link>
        </div>
      </Container>
    </nav>
  );
}