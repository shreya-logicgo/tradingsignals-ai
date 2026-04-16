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
    <div className="py-10 xl:flex gap-5 font-hoves px-6 md:px-12 xl:px-0">
      <PromptInputCard
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerate={handleGenerate}
        isLoading={isLoading}
      />
      <BlogPreviewPanel
        content={blogContent}
        isLoading={isLoading}
        onRegenerate={() => handleGenerate(true)}
      />
    </div>
  );
};

export default GenerateBlog;
