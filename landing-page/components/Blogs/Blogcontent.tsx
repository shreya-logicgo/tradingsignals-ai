// components/BlogContent.tsx
import Image from "next/image";
import type { BlogContentBlock } from "./blog";

interface Props {
  blocks: BlogContentBlock[];
}

export default function BlogContent({ blocks }: Props) {
  return (
    <div className="blog-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-[#c8cdd8] text-[17px] leading-[1.85] mb-6"
                dangerouslySetInnerHTML={{ __html: block.text }}
              />
            );

          case "heading":
            if (block.level === 2)
              return (
                <h2
                  key={i}
                  className="text-white text-2xl font-semibold mt-10 mb-4 leading-tight"
                >
                  {block.text}
                </h2>
              );
            if (block.level === 3)
              return (
                <h3
                  key={i}
                  className="text-white text-xl font-semibold mt-8 mb-3 leading-tight"
                >
                  {block.text}
                </h3>
              );
            return (
              <h4
                key={i}
                className="text-white text-lg font-semibold mt-6 mb-2 leading-tight"
              >
                {block.text}
              </h4>
            );

          case "image":
            return (
              <figure key={i} className="my-8 rounded-xl overflow-hidden">
                <div className="relative w-full aspect-video bg-[#111827]">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-center text-gray-500 text-sm mt-3 italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "chart":
            return (
              <div
                key={i}
                className="my-8 rounded-xl overflow-hidden border border-white/10"
              >
                {block.component}
              </div>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 pl-5 border-l-2 border-blue-500"
              >
                <p className="text-[#c8cdd8] text-lg italic leading-relaxed mb-2">
                  {block.text}
                </p>
                {block.author && (
                  <cite className="text-gray-500 text-sm not-italic">
                    — {block.author}
                  </cite>
                )}
              </blockquote>
            );

          case "list":
            if (block.ordered)
              return (
                <ol
                  key={i}
                  className="list-decimal list-inside text-[#c8cdd8] text-[17px] leading-[1.85] mb-6 space-y-2 pl-2"
                >
                  {block.items.map((item, j) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ol>
              );
            return (
              <ul
                key={i}
                className="list-disc list-inside text-[#c8cdd8] text-[17px] leading-[1.85] mb-6 space-y-2 pl-2"
              >
                {block.items.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            );

          case "divider":
            return (
              <hr
                key={i}
                className="my-10 border-none h-px bg-white/10"
              />
            );

          case "callout":
            const calloutStyles = {
              info: "bg-blue-500/10 border-blue-500/30 text-blue-300",
              warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
              success: "bg-green-500/10 border-green-500/30 text-green-300",
              tip: "bg-purple-500/10 border-purple-500/30 text-purple-300",
            };
            const calloutIcons = {
              info: "ℹ️",
              warning: "⚠️",
              success: "✅",
              tip: "💡",
            };
            return (
              <div
                key={i}
                className={`my-6 flex gap-3 items-start px-5 py-4 rounded-xl border ${calloutStyles[block.variant]}`}
              >
                <span className="text-lg mt-0.5 shrink-0">
                  {calloutIcons[block.variant]}
                </span>
                <p
                  className="text-[15px] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}