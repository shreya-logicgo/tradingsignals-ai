"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Copy, GradientMagicStick, Plane, ReSpin, Save } from "../icons";

type BlogPreviewPanelProps = {
  content: string;
  isLoading: boolean;
  onRegenerate: () => void;
  coverImage?: string;
};

const   BlogPreviewPanel = ({
  content,
  isLoading,
  onRegenerate,
  coverImage,
}: BlogPreviewPanelProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const hasContent = Boolean(content.trim());
  const controlsDisabled = isLoading || !hasContent || isSaving;

  const renderedHtml = useMemo(() => {
    const fencedBlockMatch = content.match(/```(?:html)?\s*([\s\S]*?)```/i);
    const rawHtml = (fencedBlockMatch?.[1] || content).trim();

    // Do not decode &lt; / &gt; etc. on the whole string: that turns
    // <code>&lt;header&gt;</code> into real <header> nodes and breaks layout.
    return rawHtml
      .replace(/<!doctype[\s\S]*?>/gi, "")
      .replace(/<head[\s\S]*?<\/head>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<\/?(html|body)[^>]*>/gi, "")
      .trim();
  }, [content]);

  const handleSave = async () => {
    if (controlsDisabled) return;

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("content", renderedHtml);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const response = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save blog");
      }

      // Redirect to blog listing on success
      window.location.href = "/blogs";
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save blog. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

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
    <div className="bg-mirage border border-cosmos min-h-100 sm:min-h-200 resize-none w-full rounded-3xl h-[calc(100vh-175px)] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <GradientMagicStick className="mb-5 animate-pulse" />
            <h3 className="text-lg 3xl:text-[22px]">
              {t("generateBlog.loadingTitle")}
            </h3>
            <p className="text-seashell-blue text-sm md:text-base">
              {t("generateBlog.loadingHint")}
            </p>
          </div>
        ) : hasContent ? (
          <div className="blog-scrollbar h-full overflow-y-auto">
            <article className="max-w-none">
              <div className="p-6">
                <div
                  className="generated-blog-content rounded-2xl text-titan-white leading-relaxed [&_a]:text-vivid-cyan [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-[#00F0FF4D] [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-[#0F1F3D] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[#7DD3FC] [&_code]:font-semibold [&_figure]:my-6 [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-[#AAB3C5] [&_h1]:mb-4 [&_h1]:mt-1 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[#FFFFFF] [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#FFFFFF] [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#FFFFFF] [&_img]:my-4 [&_img]:rounded-lg [&_img]:border [&_img]:border-[#00F0FF26] [&_img]:w-full [&_li]:mb-2 [&_li]:text-titan-white [&_mark]:rounded [&_mark]:bg-[#10b981] [&_mark]:px-1 [&_mark]:py-0.5 [&_mark]:font-semibold [&_mark]:text-white [&_ol]:my-4 [&_ol]:ml-6 [&_p]:my-4 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-mirage [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-mono [&_pre_code]:font-normal [&_pre_code]:text-[#d1d5db] [&_strong]:text-[#FFFFFF] [&_table]:my-4 [&_table]:w-full [&_td]:border [&_td]:border-[#00F0FF26] [&_td]:p-2 [&_th]:border [&_th]:border-[#00F0FF26] [&_th]:bg-mirage [&_th]:p-2 [&_ul]:my-4 [&_ul]:ml-6"
                  dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />
              </div>
            </article>
          </div>
        ) : (
          <div className="h-full text-center flex flex-col items-center justify-center px-6">
            <GradientMagicStick className="mb-5" />
            <h3 className="text-lg 3xl:text-[22px]">
              {t("generateBlog.emptyTitle")}
            </h3>
            <p className="text-seashell-blue text-sm md:text-base">
              {t("generateBlog.emptyHint")}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-cosmos py-4 px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-5">
        <div
          className={`flex items-center gap-8 md:ms-2 ${controlsDisabled ? "opacity-50" : ""
            }`}
        >
          <div className="relative group ">
            <button
              type="button"
              onClick={handleCopy}
              disabled={controlsDisabled}
              className="disabled:cursor-not-allowed cursor-pointer hover:opacity-90 transition-colors duration-300"
              aria-label={t("generateBlog.copyAria")}
            >
              <Copy className="w-5 md:w-5 h-5 md:h-5" />
            </button>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-black border border-cosmos px-2 py-1 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {t("generateBlog.copy")}
            </span>
          </div>
          <div className="relative group">
            <button
              type="button"
              onClick={handleRegenerate}
              disabled={controlsDisabled}
              className="disabled:cursor-not-allowed cursor-pointer hover:opacity-90 transition-colors duration-300"
              aria-label={t("generateBlog.regenerateAria")}
            >
              <ReSpin className="w-5 md:w-5 h-5 md:h-5" />
            </button>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-black border border-cosmos px-2 py-1 text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {t("generateBlog.regenerate")}
            </span>
          </div>
          {copied && (
            <span className="text-xs text-seashell-blue">
              {t("generateBlog.copied")}
            </span>
          )}
        </div>

        <div
          className="flex flex-col md:flex-row items-center gap-3 w-full justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={controlsDisabled}
            className={`w-full md:w-auto bg-white text-sm md:text-base text-mirage font-bold flex items-center justify-center gap-2 px-8 py-3 rounded-full transition-all duration-300 shadow-lg shadow-white/5 whitespace-nowrap ${controlsDisabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:bg-white/90 active:scale-[0.98]"
              }`}
          >
            <Plane className={`w-4 md:w-5 h-4 md:h-5 ${isSaving ? "animate-pulse" : ""}`} />{" "}
            {isSaving ? "Publishing..." : t("generateBlog.publish")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPreviewPanel;
