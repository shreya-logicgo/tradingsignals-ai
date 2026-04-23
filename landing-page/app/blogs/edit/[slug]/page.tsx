"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import EditBlogForm from "@/components/Blogs/EditBlogForm";
import NoiseOverlay from "@/components/NoiseOverlay";
import { PenLine } from "lucide-react";
import Container from "@/components/common/container/Container";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
  createdAt: string;
}

/* ── Skeleton shimmer ── */
function EditorSkeleton() {
  return (
    <div className="animate-pulse space-y-6 pt-8">
      {/* Title skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-3/4 rounded-xl bg-white/5" />
        <div className="h-10 w-1/2 rounded-xl bg-white/5" />
      </div>
      {/* Toolbar skeleton */}
      <div className="h-10 rounded-xl bg-white/5" />
      {/* Body skeleton */}
      <div className="rounded-2xl border border-white/5 bg-[#08111f] p-8 space-y-4 min-h-[400px]">
        {[90, 75, 82, 60, 78].map((w, i) => (
          <div key={i} className="h-4 rounded-lg bg-white/5" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { data: post, isLoading, isError } = useQuery<BlogPost>({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blogs/${slug}`);
      if (!res.ok) throw new Error("Blog not found");
      return res.json();
    },
    enabled: !!slug,
  });

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="bg-[#010B24] min-h-screen font-hoves">
        <NoiseOverlay />
        {/* Fake top bar */}
        <div className="sticky top-0 z-40 h-12 border-b border-white/5 bg-[#010B24]/90 backdrop-blur-xl" />
        <main className="max-w-6xl mx-auto w-full px-4 sm:px-6">
          <EditorSkeleton />
        </main>
      </div>
    );
  }

  /* ── Error / not found ── */
  if (isError || !post) {
    return (
      <div className="bg-[#010B24] min-h-screen flex flex-col items-center justify-center gap-4 font-hoves px-6">
        <NoiseOverlay />
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
          <PenLine className="w-5 h-5 text-slate-500" />
        </div>
        <p className="text-slate-300 text-lg font-semibold">Post not found</p>
        <p className="text-slate-600 text-sm text-center max-w-xs">
          We couldn't find a blog post with that slug. It may have been deleted or moved.
        </p>
        <button
          onClick={() => router.push("/blogs")}
          className="mt-2 px-5 py-2 rounded-xl text-sm font-medium text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10 transition-colors"
        >
          ← Back to Blogs
        </button>
      </div>
    );
  }

  /* ── Success ── */
  return (
    <div className="bg-[#010B24] min-h-screen font-hoves pt-30">
      <NoiseOverlay />
      {/* <main className="max-w-6xl mx-auto w-full px-4 sm:px-6"> */}
      <main className=" mx-auto px-6 sm:px-10 lg:px-0 ">
        <Container>
          
          
        <EditBlogForm post={post} />
        </Container>
      </main>
    </div>
  );
}