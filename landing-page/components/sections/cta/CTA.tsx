"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import blog1 from "@/assets/images/blog-1.jpg";
import blog2 from "@/assets/images/blog-2.jpg";
import blog3 from "@/assets/images/blog-3.jpg";
import Link from "next/link";
import HoverFxButton from "@/components/common/HoverFxButton";
import { motion } from "framer-motion";

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
    <section className="w-full bg-transparent py-10 md:py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-15">
        <div className="flex flex-col gap-12 lg:gap-16">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[500px] mx-auto">
            {/* Badge */}
            <div className="px-3.5 py-1.5 rounded-full">
              <span className="text-[15px] font-mono tracking-widest uppercase text-vivid-cyan">
                {t("blog.title")}
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-hoves font-medium text-3xl md:text-4xl text-white leading-tight">
              {t("blog.heading")}
            </h2>

            <p
              className="font-hoves font-light text-sm md:text-base text-[#c7ccd2] leading-relaxed"
            >
              {t("blog.description")}
            </p>
          </div>

          {/* ── Cards + CTA ── */}
          <div className="flex flex-col gap-12">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-stretch">
              {posts.map((post, i) => (
                <div
                  key={i}
                  className="group flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[460/300] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/*
                    Content — flex-col + justify-between
                    Top group: title + description
                    Bottom: View more — always aligned across all cards
                  */}
                  <div
                    className="flex flex-col flex-1 pt-6 justify-between gap-4"
                  >
                    {/* Top: title + description */}
                    <div className="flex flex-col gap-3">
                      <h3
                        className="text-xl text-white leading-tight line-clamp-2 font-hoves"
                      >
                        {post.title}
                      </h3>

                      <p
                        className="text-sm md:text-base text-[#c7ccd2] leading-relaxed line-clamp-3 font-hoves"
                      >
                        {post.description}
                      </p>
                    </div>

                    {/* Bottom: View more — pinned to bottom by justify-between */}
                    <span
                      className="text-sm text-white underline underline-offset-4 decoration-white/30 group-hover:decoration-white transition-all font-hoves"
                    >
                      {t("blog.viewMore")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button — Localized */}
            <div className="flex justify-center mt-4">
              <motion.div whileTap={{ scale: 0.98 }}>
              <HoverFxButton
                href="https://crypto.tradingsignals.ai/login"
                className="px-7 py-3 rounded-full border border-white font-hoves text-white text-md font-medium tracking-widest transition-all duration-500 hover:bg-white hover:text-black inline-flex items-center justify-center"
              >
                {t("blog.cta")}
              </HoverFxButton>
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


