"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PromptInputCard from "./PromptInputCard";
import BlogPreviewPanel from "./BlogPreviewPanel";

const GenerateBlog = () => {
  const { t, i18n } = useTranslation();
  const [prompt, setPrompt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");
  
  // Cover Image State
  const [coverImage, setCoverImage] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [regenCount, setRegenCount] = useState(0);
  const MAX_REGEN = 3;

  const handleImageGenerate = async () => {
    if (isGeneratingImage || regenCount >= MAX_REGEN) return;
    if (!prompt.trim()) {
      window.alert("Please enter a blog topic or prompt first.");
      return;
    }

    setIsGeneratingImage(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate image.");
      }

      const data = await response.json();
      setCoverImage(data.url);
      setRegenCount((prev) => prev + 1);
    } catch (error) {
      console.error("Image generation error:", error);
      window.alert(error instanceof Error ? error.message : "Failed to generate AI image.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGenerate = async (useLastPrompt = false) => {
    if (isLoading) {
      return;
    }

    const selectedPrompt = useLastPrompt ? prompt.trim() || lastPrompt.trim() : prompt.trim();
    if (!selectedPrompt) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: selectedPrompt, locale: i18n.language }),
      });

      if (!response.ok) {
        await response.json().catch(() => ({}));
        throw new Error(t("generateBlog.errors.generateFailed"));
      }

      const data = await response.json();
      const generatedContent = data.content || data.blog || data.result || "";
      if (!generatedContent) {
        throw new Error(t("generateBlog.errors.emptyResponse"));
      }
      setBlogContent(generatedContent);
      setLastPrompt(selectedPrompt);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("generateBlog.errors.generic");
      window.alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-18 lg:py-10 xl:flex gap-5 font-hoves px-6 md:px-12 3xl:px-0">
      <PromptInputCard
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerate={handleGenerate}
        isLoading={isLoading}
        coverImage={coverImage}
        onImageChange={setCoverImage}
        onImageGenerate={handleImageGenerate}
        isGeneratingImage={isGeneratingImage}
        regenCount={regenCount}
        maxRegen={MAX_REGEN}
      />
      <BlogPreviewPanel
        content={blogContent}
        isLoading={isLoading}
        onRegenerate={() => handleGenerate(true)}
        coverImage={coverImage}
      />
    </div>
  );
};

export default GenerateBlog;
