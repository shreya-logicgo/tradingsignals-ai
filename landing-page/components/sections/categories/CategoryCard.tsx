interface CategoryCardProps {
  title: string;
  description: string;
  tags: string[];
}

export default function CategoryCard({ title, description, tags }: CategoryCardProps) {
  return (
    <div
      className="rounded-[10px] p-1 w-full h-full"
      style={{
        minHeight: "196px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "linear-gradient(160deg, rgba(11,23,54,0.6), rgba(10,17,36,0.6))",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Inner layout: flex column, full height */}
      <div className="flex flex-col h-full" style={{ gap: "16px" }}>

        {/* Top content */}
        <div className="flex flex-col" style={{ gap: "10px" }}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "#FFFFFF",
              fontFamily: "var(--font-hoves)",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              lineHeight: "1.6",
              color: "rgba(255,255,255,0.65)",
              fontFamily: "var(--font-hoves)",
            }}
          >
            {description}
          </p>
        </div>

        {/* Spacer pushes tags to bottom */}
        <div style={{ flex: 1 }} />

        {/* Tags */}
        <div className="flex flex-wrap" style={{ gap: "8px" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "6px 12px",
                borderRadius: "40px",
                fontSize: "11px",
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-hoves)",
                letterSpacing: "0.02em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}