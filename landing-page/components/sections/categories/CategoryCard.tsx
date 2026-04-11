"use client";

interface CategoryCardProps {
  title: string;
  description: string;
  tags: string[];
}

export default function CategoryCard({ title, description, tags }: CategoryCardProps) {
  return (
    <div className="group rounded-[10px] p-7 w-full h-full min-h-[196px] border border-white/10 bg-gradient-to-br from-[#0b173699] to-[#0a112499] backdrop-blur-md hover:border-white/20 transition-colors duration-300">
      {/* Inner layout: flex column, full height */}
      <div className="flex flex-col h-full gap-4">
        {/* Top content */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-base font-medium text-white font-hoves leading-tight"style={{ fontFamily: "var(--font-hoves)" }}>
            {title}
          </h3>
          <p className="text-sm font-normal text-white/65 font-hoves leading-relaxed"style={{ fontFamily: "var(--font-hoves)" }}>
            {description}
          </p>
        </div>

        {/* Spacer pushes tags to bottom */}
        <div className="flex-1" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/5 text-white/70 font-hoves tracking-wide border border-white/5 group-hover:bg-white/10 transition-colors duration-300"
              style={{ fontFamily: "var(--font-hoves)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
