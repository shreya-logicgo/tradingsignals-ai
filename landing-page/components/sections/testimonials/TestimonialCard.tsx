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

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-left-[14px] border-left-white/90 ml-1" />
           </div>
        </div>
      </div>

      {/* Quote */}
      <p className="text-sm text-white/70 leading-relaxed m-0 font-hoves"style={{ fontFamily: "var(--font-hoves)" }}>
        {quote}
      </p>
    </div>
  );
}
