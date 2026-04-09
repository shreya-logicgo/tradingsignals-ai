import Image from "next/image";

const logos = [
  "/logos/barchart.png",
  "/logos/cme.png",
  "/logos/wundertrading.png",
  "/logos/binance.png",
  "/logos/traderspost.png",
];

export default function TrustedLogos() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center mt-16 px-6">
      
      {/* 🔹 Label */}
      <p className="text-sm text-gray-500 mb-6 tracking-wide uppercase">
        Integrated with top exchanges
      </p>

      {/* 🔹 Logos */}
      <div className="flex flex-wrap items-center justify-center gap-10 opacity-60">
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt="logo"
            width={120}
            height={40}
            className="object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        ))}
      </div>

    </section>
  );
}