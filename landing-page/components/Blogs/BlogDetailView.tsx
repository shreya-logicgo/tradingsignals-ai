"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  createdAt: string;
}

interface Props {
  post: BlogPost;
  formattedDate: string;
}

export default function BlogDetailView({ post, formattedDate }: Props) {
  const { t } = useTranslation();

  return (
    <article className="section-py">

      {/* Author + date + Edit button */}
      <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-3 mb-7">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[linear-gradient(276deg,_rgba(0,240,255,1)_15%,_rgba(0,18,184,1)_76%)] flex items-center justify-center overflow-hidden shrink-0">
            <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
              <path d="M10 26L18 10L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 21H23" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm xl:text-base 2xl:text-lg font-medium whitespace-nowrap">TradingSignals AI</span>
            <span className="text-gray-500 text-sm xl:text-base lg:block hidden">·</span>
            <time className="text-gray-400 text-sm xl:text-base 2xl:text-lg whitespace-nowrap" dateTime={post.createdAt}>
              {formattedDate}
            </time>
          </div>
        </div>
        
        <Link
          href={`/blogs/edit/${post.slug}`}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white text-sm xl:text-base hover:bg-white/10 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span className="whitespace-nowrap">{t("blog.edit", { defaultValue: "Edit Blog" })}</span>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-white text-[32px] sm:text-[40px] xl:text-[52px] 2xl:text-[64px] font-bold leading-[1.15] tracking-tight mb-8">
        {post.title}
      </h1>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="w-full aspect-video rounded-3xl overflow-hidden  border border-white/5 shadow-2xl shadow-black/40">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Blog body - Render content string as HTML */}
      <div 
        className="blog-prose text-[#c8cdd8] text-[15px] md:text-[17px] xl:text-lg 2xl:text-xl leading-relaxed text-justify overflow-hidden break-words min-w-0"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />

      {/* Back link */}
      <div className="mt-10 pt-8 border-t border-white/10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-400 text-sm xl:text-base 2xl:text-lg hover:text-white transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("blog.backToBlog")}
        </Link>
      </div>
    </article>
  );
}
