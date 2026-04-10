"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import BlogContent from "@/components/Blogs/Blogcontent";
import { BlogPostDetail } from "./blog";

interface Props {
  post: BlogPostDetail;
  formattedDate: string;
  enrichedContent: any[];
}

export default function BlogDetailView({ post, formattedDate, enrichedContent }: Props) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0] as keyof BlogPostDetail["title"];

  const currentTitle = post.title[lang] || post.title.en;

  // Localize content blocks that have multilingual text objects
  const localizedContent = enrichedContent.map((block) => {
    if (block.text && typeof block.text === "object" && block.text.en) {
      return { ...block, text: block.text[lang] || block.text.en };
    }
    return block;
  });

  return (
    <article className="max-w-4xl mx-auto px-7 sm:px-6 py-10 sm:py-14">

      {/* Author + date */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-8 h-8 rounded-full bg-[#0057FF] flex items-center justify-center overflow-hidden shrink-0">
          {post.author.avatar ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          ) : (
            <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
              <path d="M10 26L18 10L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 21H23" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <span className="text-white text-sm font-medium">{post.author.name}</span>
        <span className="text-gray-500 text-sm">·</span>
        <time className="text-gray-400 text-sm" dateTime={post.publishedAt}>
          {formattedDate}
        </time>
        {post.readingTime && (
          <>
            <span className="text-gray-600 text-sm hidden sm:inline">·</span>
            <span className="text-gray-500 text-sm hidden sm:inline">
              {post.readingTime} min read
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="text-white text-[32px] sm:text-[40px] font-bold leading-[1.15] tracking-tight mb-8">
        {currentTitle}
      </h1>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag: any, idx) => {
            const currentTag = tag[lang] || tag.en;
            return (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium"
              >
                {currentTag}
              </span>
            );
          })}
        </div>
      )}

      {/* Blog body */}
      <BlogContent blocks={localizedContent} />

      {/* Back link */}
      <div className="mt-14 pt-8 border-t border-white/10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("blog.viewMore", { defaultValue: "Back to Blog" })}
        </Link>
      </div>
    </article>
  );
}
