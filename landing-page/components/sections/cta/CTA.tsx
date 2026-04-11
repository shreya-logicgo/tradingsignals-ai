"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import blog1 from "@/assets/images/blog-1.jpg";
import blog2 from "@/assets/images/blog-2.jpg";
import blog3 from "@/assets/images/blog-3.jpg";

interface PostData {
  title: string;
  desc: string;
}

export default function CTA() {
  const { t } = useTranslation();

  // Blog posts from common.json
  const blogPosts = t("blog.posts", { returnObjects: true }) as PostData[];
  
  const posts = [
    { image: blog1, title: blogPosts[0]?.title || "", description: blogPosts[0]?.desc || "" },
    { image: blog2, title: blogPosts[1]?.title || "", description: blogPosts[1]?.desc || "" },
    { image: blog3, title: blogPosts[2]?.title || "", description: blogPosts[2]?.desc || "" },
  ];

  return (
    <section className="w-full bg-[#010B24] py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* ── Header — Localized ── */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[500px] mx-auto">
            {/* Badge */}
            <div className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5">
              <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">
                {t("blog.title")}
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-hoves font-medium text-3xl md:text-4xl text-white leading-tight">
              {t("blog.heading")}
            </h2>

            {/* Subtext */}
            <p className="font-hoves font-light text-sm md:text-base text-[#c7ccd2] leading-relaxed">
              {t("blog.description")}
            </p>
          </div>

          {/* ── Cards + CTA ── */}
          <div className="flex flex-col gap-12">
            {/* Cards Grid — Dynamic mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {posts.map((post, i) => (
                <Link
                  key={i}
                  href="/blogs/2026-ai-trading-strategies-nvda"
                  className="group flex flex-col gap-6 cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[460/300] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Text content — Localized */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-hoves font-medium text-xl text-white leading-tight">
                      {post.title}
                    </h3>
                    <p className="font-hoves font-normal text-sm md:text-base text-[#c7ccd2] leading-relaxed">
                      {post.description}
                    </p>

                    {/* View more link — Localized */}
                    <div className="mt-auto">
                      <span className="text-sm text-white font-hoves underline underline-offset-4 decoration-white/30 group-hover:decoration-white transition-all">
                        {t("blog.viewMore")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Button — Localized */}
            <div className="flex justify-center mt-4">
              <button className="px-8 py-3 rounded-full border border-white text-white text-sm font-medium font-hoves transition-all duration-300 hover:bg-white hover:text-black cursor-pointer">
                {t("blog.cta")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}