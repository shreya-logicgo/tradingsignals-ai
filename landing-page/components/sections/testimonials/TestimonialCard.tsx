import Image, { StaticImageData } from "next/image";

interface TestimonialCardProps {
  image: StaticImageData;
  quote: string;
}

export default function TestimonialCard({ image, quote }: TestimonialCardProps) {
  return (
    <div className="w-full max-w-[440px] h-[352px] p-5 rounded-[15px] bg-white/5 border border-white/10 flex flex-col gap-5 box-border backdrop-blur-sm transition-all duration-300 hover:border-white/20 overflow-hidden shrink-0">

      {/* Video thumbnail */}
      <div className="w-full h-[200px] rounded-[15px] overflow-hidden relative flex-shrink-0 group cursor-pointer">
        <Image
          src={image}
          alt="Testimonial thumbnail"
          fill
          sizes="(max-width: 440px) 100vw, 440px"
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
      <div className="flex-1 overflow-hidden">
        <p className="text-[18px] text-white/70 leading-[100%] font-normal m-0 font-hoves line-clamp-4">
          {quote}
        </p>
      </div>
    </div>
  );
}