import Image, { StaticImageData } from "next/image";

interface TestimonialCardProps {
  image: StaticImageData;
  quote: string;
}

export default function TestimonialCard({ image, quote }: TestimonialCardProps) {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        borderRadius: "15px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Video thumbnail */}
      <div
        style={{
          width: "100%",
          aspectRatio: "2 / 1",
          borderRadius: "15px",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <Image
          src={image}
          alt="Testimonial thumbnail"
          fill
          className="object-cover"
        />

        {/* Play button */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.20)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: "14px solid rgba(255,255,255,0.9)",
              marginLeft: "3px",
            }}
          />
        </div>
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: "14px",
          color: "rgba(255,255,255,0.70)",
          lineHeight: "1.6",
          margin: 0,
          fontFamily: "var(--font-hoves)",
        }}
      >
        {quote}
      </p>
    </div>
  );
}