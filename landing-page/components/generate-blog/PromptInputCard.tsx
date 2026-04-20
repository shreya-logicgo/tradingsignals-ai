"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { MagicStickWhite } from "../icons";
import CoverImageSelector from "./CoverImageSelector";

type PromptInputCardProps = {
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  // Image props
  coverImage: string;
  onImageChange: (url: string) => void;
  onImageGenerate: () => Promise<void>;
  isGeneratingImage: boolean;
  regenCount: number;
  maxRegen: number;
};

const PromptInputCard = ({
  prompt,
  onPromptChange,
  onGenerate,
  isLoading,
  coverImage,
  onImageChange,
  onImageGenerate,
  isGeneratingImage,
  regenCount,
  maxRegen,
}: PromptInputCardProps) => {
  const { t } = useTranslation();
  const isBtnDisbaled = isLoading || !prompt.trim();

  return (
    <div className="relative xl:sticky xl:top-22.5 max-h-fit mb-5">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          className="blog-scrollbar bg-mirage border border-cosmos min-h-52 md:min-h-54 xl:min-h-62 resize-none overflow-y-auto w-full rounded-3xl min-f-full xl:min-w-130 3xl:min-w-[580] p-5 pb-20 focus:outline-none focus:border-[#38486a] placeholder:text-[#6d7381] text-base 3xl:text-lg"
          placeholder={t("generateBlog.promptPlaceholder")}
        />

        <button
          type="button"
          disabled={isLoading || !prompt.trim()}
          onClick={onGenerate}
          className="overflow-hidden rounded-full cursor-pointer flex items-center gap-3 text-base absolute bottom-0 inset-e-0 mb-6 me-4.5 bg-dark-blue group disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative px-4 py-2.75">
            {/* Gradient Layer */}
            <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(90deg,#0012B8_0%,#00F0FF_100%)]"></span>

            {/* Content */}
            <span className="relative z-10 flex items-center gap-3 text-sm md:text-base">
              <MagicStickWhite className="w-4 md:w-5 h-4 md:h-5" />{" "}
            {isLoading ? t("generateBlog.generating") : t("generateBlog.generate")}
            </span>
          </span>
        </button>
      </div>

      <CoverImageSelector
        coverImage={coverImage}
        onImageChange={onImageChange}
        onGenerate={onImageGenerate}
        isLoading={isGeneratingImage}
        regenCount={regenCount}
        maxRegen={maxRegen}
      />
    </div>
  );
};

export default PromptInputCard;
