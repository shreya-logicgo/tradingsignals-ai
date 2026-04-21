"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import NoiseOverlay from "../NoiseOverlay";
import blog1 from "@/assets/images/blog-1.jpg";
import BlogImage from "./BlogImage";

// 1. Define your types for the multilingual fields
type MultilingualText = {
  en: string;
  pl: string;
  th: string;
};

import { useQuery } from "@tanstack/react-query";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  createdAt: string;
}

function BlogCard({ post }: { post: BlogPost }) {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col gap-3 group h-full">
      {/* Image */}
      <Link href={`/blogs/${post.slug || post._id}`}>
        <div className="w-full aspect-[17/11]">
          <BlogImage 
            src={post.coverImage || ""} 
            alt={post.title} 
            className="w-full h-full transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-grow">
        <h3 className="text-white font-semibold text-[15px] xl:text-lg 2xl:text-xl leading-snug line-clamp-2 text-justify">
          {post.title}
        </h3>
        {/* Strip HTML if content is HTML for excerpt */}
        <p className="text-gray-400 text-sm xl:text-base 2xl:text-lg leading-snug line-clamp-3 text-justify">
          {post.content.replace(/<[^>]+>/g, '')}
        </p>
        <Link
          href={`/blogs/${post.slug || post._id}`}
          className="text-white text-sm xl:text-base 2xl:text-lg font-medium underline underline-offset-2 hover:text-blue-400 transition-colors duration-200 mt-auto pt-2 w-fit inline-block"
        >
          {t("blog.viewMore")}
        </Link>
      </div>
    </div>
  );
}

export default function BlogListing() {
  const { t } = useTranslation();
  
  const { data: blogPosts, isLoading, isError } = useQuery<BlogPost[]>({
    queryKey: ["blogs"],
    queryFn: () => fetch("/api/blogs").then((res) => res.json()),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <section className="bg-[#010B24] min-h-screen py-12 lg:px-7 font-hoves">
        <NoiseOverlay />
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 bg-white/10 w-64 mx-auto rounded animate-pulse mb-4" />
            <div className="h-4 bg-white/10 w-96 mx-auto rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col gap-3 animate-pulse">
                <div className="w-full aspect-[17/11] rounded-lg bg-white/10" />
                <div className="h-6 bg-white/10 w-full rounded" />
                <div className="h-4 bg-white/10 w-2/3 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-[#010B24] min-h-screen py-12 lg:px-7 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-semibold mb-4">Oops! Failed to load blogs.</h2>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-white text-black rounded-full font-medium"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#010B24] min-h-screen py-12 lg:px-7 font-hoves">
      <NoiseOverlay />
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-white text-4xl xl:text-5xl 2xl:text-6xl font-semibold mb-3 font-hoves">
            {t("blog.title")}
          </h1>
          <p className="text-gray-400 text-sm xl:text-base 2xl:text-lg font-hoves">
            {t("blog.description")}
          </p>
        </div>

        {/* Grid — fetched blogs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {blogPosts && blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400">No blogs found. Check back later!</p>
            </div>
          )}
        </div>

        {/* View More button (optional logic could be added here) */}
        {blogPosts && blogPosts.length > 0 && (
          <div className="flex justify-center">
            <button className="px-8 py-2.5 xl:px-10 xl:py-3 h-13 xl:h-14 rounded-full border border-white text-white text-md xl:text-lg 2xl:text-xl font-medium hover:bg-white hover:text-[#000000] transition-colors duration-200 cursor-pointer">
              {t("blog.cta")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}