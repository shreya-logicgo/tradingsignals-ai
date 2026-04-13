import Image, { StaticImageData } from "next/image";

interface TestimonialCardProps {
  image: StaticImageData;
  quote: string;
}

export default function TestimonialCard({ image, quote }: TestimonialCardProps) {
  return (
    <div className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-5 box-border backdrop-blur-sm transition-all duration-300 hover:border-white/20">

      {/* Video thumbnail */}
      <div className="w-full aspect-[2/1] rounded-xl overflow-hidden relative flex-shrink-0 group cursor-pointer">
        <Image
          src={image}
          alt="Testimonial thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark overlay — always visible so play button is always readable */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Play button — always visible, scales on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {/* SVG play triangle — reliable across all browsers */}
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginLeft: "3px" }}
            >
              <path d="M1 1L15 9L1 17V1Z" fill="white" fillOpacity="0.95" />
            </svg>
          </div>
        </div>
      </div>

      {/* Quote */}
      <p
        className="text-sm text-white/70 leading-relaxed m-0"
        style={{ fontFamily: "var(--font-hoves)" }}
      >
        {quote}
      </p>
    </div>
  );
}