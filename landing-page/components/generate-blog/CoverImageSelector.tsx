"use client";

import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image as ImageIcon, ReSpin, Upload } from "../icons";

type CoverImageSelectorProps = {
  coverImage: string;
  onImageChange: (url: string) => void;
  onGenerate: () => Promise<void>;
  isLoading: boolean;
  regenCount: number;
  maxRegen: number;
};

const CoverImageSelector = ({
  coverImage,
  onImageChange,
  onGenerate,
  isLoading,
  regenCount,
  maxRegen,
}: CoverImageSelectorProps) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-6 border-t border-cosmos pt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-titan-white font-semibold text-sm md:text-base flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-vivid-cyan" />
          {t("generateBlog.coverImage", { defaultValue: "Cover Image" })}
        </h4>
        <span className="text-[11px] md:text-xs text-seashell-blue bg-cosmos/30 px-2 py-1 rounded-md">
          {t("generateBlog.aiTries", {
            defaultValue: `AI Regenerations: ${regenCount}/${maxRegen}`,
            count: regenCount,
            max: maxRegen
          })}
        </span>
      </div>

      <div className="relative group aspect-video w-full rounded-2xl  bg-mirage border border-cosmos overflow-hidden flex flex-col items-center justify-center transition-all duration-300 hover:border-vivid-cyan/50">
        {coverImage ? (
          <>
            <img
              src={coverImage}
              alt="Cover preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full hover:bg-white/20 transition-colors"
                title={t("generateBlog.uploadNew", { defaultValue: "Upload New" })}
              >
                <Upload className="w-5 h-5 text-white" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-cosmos/40 rounded-full flex items-center justify-center mx-auto mb-3">
              <ImageIcon className="w-6 h-6 text-seashell-blue/50" />
            </div>
            <p className="text-seashell-blue text-sm mb-1">{t("generateBlog.noImage", { defaultValue: "No cover image selected" })}</p>
            <p className="text-seashell-blue/60 text-xs">{t("generateBlog.imageHint", { defaultValue: "Upload your own or generate one with AI" })}</p>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-mirage/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
            <ReSpin className="w-8 h-8 text-vivid-cyan animate-spin mb-3" />
            <p className="text-titan-white text-sm animate-pulse">{t("generateBlog.generatingImage", { defaultValue: "Creating your masterpiece..." })}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-cosmos bg-mirage text-titan-white text-sm hover:bg-cosmos/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          {t("generateBlog.upload", { defaultValue: "Upload" })}
        </button>

        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading || regenCount >= maxRegen}
          className="flex w-full items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-mirage border border-cosmos text-vivid-cyan text-sm hover:bg-vivid-cyan/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:grayscale cursor-pointer"
        >
          <ReSpin className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          {regenCount > 0 ? t("generateBlog.regenerate", { defaultValue: "Regenerate" }) : t("generateBlog.generateAI", { defaultValue: "AI Generate" })}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default CoverImageSelector;
