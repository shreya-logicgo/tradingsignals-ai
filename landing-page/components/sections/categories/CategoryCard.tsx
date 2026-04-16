"use client";

interface CategoryCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
}

export default function CategoryCard({ title, description, tags, index }: CategoryCardProps) {
  return (
    <div className="relative group rounded-[10px] p-5 w-full h-full min-h-[170px] border border-white/10 bg-gradient-to-br from-[#0b173699] to-[#0a112499] backdrop-blur-md overflow-hidden transition-[border-color] duration-700 hover:border-white/30">

      {/* Glass Shine Sweep */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-150%] left-[-150%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-[35deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
      </div>

      <div className="relative z-10 flex flex-col h-full gap-2">
        <div className="flex flex-col gap-2.5">
          <h3
            className="text-base font-medium text-white leading-tight font-hoves"
          >
            {title}
          </h3>
          <p
            className="text-sm font-normal text-white/65 leading-tight font-hoves"
          >
            {description}
          </p>
        </div>

        <div className="flex-1" />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/5 text-white/70 tracking-wide border border-white/5 group-hover:bg-white/10 group-hover:text-white transition-colors duration-500 font-hoves"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}