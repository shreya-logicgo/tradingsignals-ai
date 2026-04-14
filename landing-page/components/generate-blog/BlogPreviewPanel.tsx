import { useMemo, useState } from "react";
import { Copy, GradientMagicStick, Plane, ReSpin } from "../icons";

type BlogPreviewPanelProps = {
  content: string;
  isLoading: boolean;
  onRegenerate: () => void;
};

const BlogPreviewPanel = ({ content, isLoading, onRegenerate }: BlogPreviewPanelProps) => {
  const [copied, setCopied] = useState(false);
  const hasContent = Boolean(content.trim());
  const controlsDisabled = isLoading || !hasContent;

  const renderedHtml = useMemo(() => {
    const fencedBlockMatch = content.match(/```(?:html)?\s*([\s\S]*?)```/i);
    const rawHtml = (fencedBlockMatch?.[1] || content).trim();

    const decodedHtml = rawHtml
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");

    return decodedHtml
      .replace(/<!doctype[\s\S]*?>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<\/?(html|body)[^>]*>/gi, "")
      .trim();
  }, [content]);

  const handleCopy = async () => {
    if (controlsDisabled) {
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleRegenerate = () => {
    if (controlsDisabled) {
      return;
    }

    const scrollBodyToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, behavior: "smooth" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollBodyToTop();
    setTimeout(scrollBodyToTop, 50);
    onRegenerate();
  };

  return (
    <div className="bg-[#0B152D] border border-[#1C263C] min-h-100 sm:min-h-200 resize-none w-full rounded-3xl h-[calc(100vh-175px)] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <GradientMagicStick className="mb-5 animate-pulse" />
            <h3 className="text-lg 3xl:text-[22px]">Generating your blog...</h3>
            <p className="text-[#C7CCD2] text-sm md:text-base">This can take a few seconds.</p>
          </div>
        ) : hasContent ? (
          <div className="blog-scrollbar h-full overflow-y-auto">
            <article className="max-w-none">
              <div className="p-6">
                <div
                  className="generated-blog-content rounded-2xl  p-6 text-[#E6EEFF] leading-relaxed [&_a]:text-[#00F0FF] [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-[#00F0FF4D] [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-[#0B152D] [&_code]:px-1.5 [&_code]:py-0.5 [&_figure]:my-6 [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-[#AAB3C5] [&_h1]:mb-4 [&_h1]:mt-1 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[#FFFFFF] [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#FFFFFF] [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#FFFFFF] [&_img]:my-4 [&_img]:rounded-lg [&_img]:border [&_img]:border-[#00F0FF26] [&_img]:w-full [&_li]:mb-2 [&_ol]:my-4 [&_ol]:ml-6 [&_p]:my-4 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-[#0B152D] [&_pre]:p-4 [&_strong]:text-[#FFFFFF] [&_table]:my-4 [&_table]:w-full [&_td]:border [&_td]:border-[#00F0FF26] [&_td]:p-2 [&_th]:border [&_th]:border-[#00F0FF26] [&_th]:bg-[#0B152D] [&_th]:p-2 [&_ul]:my-4 [&_ul]:ml-6"
                  dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />
              </div>
            </article>
          </div>
        ) : (
          <div className="h-full text-center flex flex-col items-center justify-center px-6">
            <GradientMagicStick className="mb-5" />
            <h3 className="text-lg 3xl:text-[22px]">Your AI Blog Will Appear Here</h3>
            <p className="text-[#C7CCD2] text-sm md:text-base">Enter a topic or idea in the prompt box and click Generate Blog.</p>
          </div>
        )}
      </div>

      <div className="border-t border-[#1C263C] py-3.5 px-3.5 flex items-center justify-between gap-5">
        <div className={`flex items-center gap-6 ms-2 ${controlsDisabled ? "opacity-50" : ""}`}>
          <div className="relative group">
            <button
              type="button"
              onClick={handleCopy}
              disabled={controlsDisabled}
              className="disabled:cursor-not-allowed cursor-pointer hover:opacity-90 transition-colors duration-300"
              aria-label="Copy blog"
            >
              <Copy className="w-4 md:w-5 h-4 md:h-5" />
            </button>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-black border border-[#1C263C] px-2 py-1 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Copy
            </span>
          </div>
          <div className="relative group">
            <button
              type="button"
              onClick={handleRegenerate}
              disabled={controlsDisabled}
              className="disabled:cursor-not-allowed cursor-pointer hover:opacity-90 transition-colors duration-300"
              aria-label="Regenerate blog"
            >
              <ReSpin className="w-4 md:w-5 h-4 md:h-5" />
            </button>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-black border border-[#1C263C] px-2 py-1 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Regenerate
            </span>
          </div>
          {copied && <span className="text-xs text-[#C7CCD2]">Copied!</span>}
        </div>
        <div>
          <button
            type="button"
            disabled={controlsDisabled}
            className={`bg-white text-sm md:text-base text-[#0B152D] flex items-center gap-2 px-3.5 py-2.75 rounded-full transition-colors duration-300 ${
              controlsDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-white/90"
            }`}
          >
            <Plane className="w-4 md:w-5 h-4 md:h-5" /> Publish blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPreviewPanel;
