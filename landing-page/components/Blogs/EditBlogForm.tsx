"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CoverImageSelector from "@/components/generate-blog/CoverImageSelector";
import {
  Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote,
  Undo, Redo, Save, X, ArrowLeft, Sparkles, Clock, Hash, Code, Image
} from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string;
}

interface EditBlogFormProps {
  post: BlogPost;
}

const MenuBar = ({ editor }: { editor: any }) => {
  const { t } = useTranslation();
  
  // Force re-render on editor state changes (selection, content, etc.)
  const [, setUpdateCount] = useState(0);
  
  useEffect(() => {
    if (!editor) return;
    
    const handler = () => {
      setUpdateCount(prev => prev + 1);
    };

    editor.on("selectionUpdate", handler);
    editor.on("transaction", handler);
    
    return () => {
      editor.off("selectionUpdate", handler);
      editor.off("transaction", handler);
    };
  }, [editor]);

  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `w-9 h-9 rounded-xl transition-all duration-200 flex items-center justify-center ${
      active
        ? "bg-cyan-400/20 text-cyan-400 ring-1 ring-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
        : "text-slate-400 hover:text-white hover:bg-white/10"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-3 border-b border-white/5 bg-[#08111f]">
      {/* Basic Formatting Group */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title={t("editBlog.tooltips.bold")}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title={t("editBlog.tooltips.italic")}
        >
          <Italic className="w-4 h-4" />
        </button>
      </div>

      <div className="w-px h-5 bg-white/10 mx-1 sm:mx-2 hidden sm:block" />

      {/* Headings Group */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={btnClass(editor.isActive("heading", { level: 1 }))}
          title={t("editBlog.tooltips.h1")}
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnClass(editor.isActive("heading", { level: 2 }))}
          title={t("editBlog.tooltips.h2")}
        >
          <Heading2 className="w-4 h-4" />
        </button>
      </div>

      <div className="w-px h-5 bg-white/10 mx-1 sm:mx-2 hidden sm:block" />

      {/* Lists & Extras Group */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
          title={t("editBlog.tooltips.list")}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}
          title={t("editBlog.tooltips.orderedList")}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={btnClass(editor.isActive("codeBlock"))}
          title={t("editBlog.tooltips.code")}
        >
          <Code className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
          title={t("editBlog.tooltips.quote")}
        >
          <Quote className="w-4 h-4" />
        </button>
      </div>

      {/* History Group (Right Aligned or Stacked) */}
      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={`${btnClass(false)} disabled:opacity-20 disabled:grayscale`}
          title={t("editBlog.tooltips.undo")}
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={`${btnClass(false)} disabled:opacity-20 disabled:grayscale`}
          title={t("editBlog.tooltips.redo")}
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function EditBlogForm({ post }: EditBlogFormProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(post.title);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [coverImage, setCoverImage] = useState(post.coverImage || "");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [regenCount, setRegenCount] = useState(0);
  const MAX_REGEN = 3;

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: post.content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm sm:prose-base max-w-none focus:outline-none min-h-[420px] p-6 sm:p-8 text-slate-300 leading-relaxed",
      },
    },
  });

  const wordCount = editor?.getText().split(/\s+/).filter(Boolean).length ?? 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const handleImageGenerate = async () => {
    if (isGeneratingImage || regenCount >= MAX_REGEN) return;
    setIsGeneratingImage(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: title }),
      });
      if (!response.ok) throw new Error("Failed to generate image");
      const data = await response.json();
      setCoverImage(data.url);
      setCoverImageFile(null); // Clear manual upload on AI generation
      setRegenCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert("Error generating image");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSave = async () => {
    const htmlContent = editor?.getHTML();
    if (!title.trim() || !htmlContent || htmlContent === "<p></p>") {
      alert("Title and Content are required");
      return;
    }
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", htmlContent);
      
      if (coverImageFile) {
        formData.append("coverImage", coverImageFile);
      } else if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const response = await fetch(`/api/blogs/${post.slug}`, {
        method: "PUT",
        body: formData, // fetch will automatically set multipart/form-data with boundary
      });
      if (!response.ok) throw new Error("Failed to update blog");
      
      // Invalidate the query for this specific blog to ensure fresh data is fetched
      queryClient.invalidateQueries({ queryKey: ["blog", post.slug] });
      queryClient.invalidateQueries({ queryKey: ["blog", post._id] });
      
      router.push(`/blogs/${post.slug}`);
      router.refresh();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-[#010B24]/90 backdrop-blur-xl border-b border-white/5">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-white hover:text-white transition-colors text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">{t("editBlog.exitEditor")}</span>
        </button>

        {/* Centre label */}
        <span className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-white tracking-widest uppercase hidden sm:block">
          {t("editBlog.editingDraft")}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            disabled={isSaving}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-white hover:text-white text-sm transition-colors hover:bg-white/5"
          >
            <X className="w-3.5 h-3.5" />
            {t("editBlog.discard")}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isSaving
                ? "bg-white/10 text-white/40 cursor-not-allowed"
                : "bg-cyan-400 text-[#010B24] hover:bg-cyan-300 active:scale-95 shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              }`}
          >
            {isSaving ? (
              <div className="w-3.5 h-3.5 border-2 border-current/30 border-t-current animate-spin rounded-full" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {isSaving ? t("editBlog.saving") : t("editBlog.publish")}
          </button>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-8 pt-8 pb-24 px-4 sm:px-0">

        {/* ── Main Content Section (Editor) ── */}
        <div className="space-y-6">

          {/* Title */}
          <div className="relative">
            <textarea
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("editBlog.titlePlaceholder")}
              rows={1}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = `${t.scrollHeight}px`;
              }}
              className="w-full bg-transparent text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight placeholder:text-white/10 focus:outline-none resize-none overflow-hidden"
            />
            {/* animated underline */}
            <span className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 opacity-0 focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-xs text-slate-200">
            <span className="flex items-center gap-1.5">
              <Hash className="w-3 h-3" />
              {t("editBlog.words", { count: wordCount })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {t("editBlog.readTime", { count: readTime })}
            </span>
          </div>

          {/* Rich-text editor */}
          <div className="rounded-2xl border border-cosmos bg-[#08111f] overflow-hidden ring-0 focus-within:ring-1 focus-within:ring-cyan-400/20 transition-all duration-300">
            <MenuBar editor={editor} />
            <div className="min-h-[500px]">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* ── Bottom Section (Cover & Actions) ── */}
        <div className="rounded-2xl bg-[#08111f] border border-white/5 overflow-hidden shadow-2xl shadow-black/40">
          <div className="p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Image Selector */}
              <div className="-mt-6 md:mt-0">
                <CoverImageSelector
                  coverImage={coverImage}
                  onImageChange={setCoverImage}
                  onFileSelect={setCoverImageFile}
                  onGenerate={handleImageGenerate}
                  isLoading={isGeneratingImage}
                  regenCount={regenCount}
                  maxRegen={MAX_REGEN}
                />
              </div>

              {/* Actions & Insights */}
              <div className="flex flex-col justify-center h-full space-y-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">{t("editBlog.finalizeUpdate")}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t("editBlog.finalizeDesc")}
                  </p>
                </div>

                <div className="space-y-4">
                  {regenCount > 0 && (
                    <div className="inline-flex items-center gap-2 text-[11px] text-slate-400 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                      <Sparkles className="w-3 h-3 text-cyan-400/60 shrink-0" />
                      <span>
                        {t("editBlog.generationsRemaining", { count: MAX_REGEN - regenCount })}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-cosmos bg-cyan-400 text-[#010B24] hover:bg-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-bold text-base active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.15)] group"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-current/30 border-t-current animate-spin rounded-full" />
                    ) : (
                      <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    )}
                    {isSaving ? t("editBlog.savingChanges") : t("editBlog.updateBlogPost")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}