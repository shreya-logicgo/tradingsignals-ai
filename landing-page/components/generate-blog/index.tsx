 "use client";

import React, { useState } from "react";
import PromptInputCard from "./PromptInputCard";
import BlogPreviewPanel from "./BlogPreviewPanel";

const GenerateBlog = () => {
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
        body: JSON.stringify({ prompt: selectedPrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate blog. Please try again.");
      }

      const data = await response.json();
      const generatedContent = data.content || data.blog || data.result || "";
      if (!generatedContent) {
        throw new Error("Empty content returned from API. Please try again.");
      }
      setBlogContent(generatedContent);
      setLastPrompt(selectedPrompt);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
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
