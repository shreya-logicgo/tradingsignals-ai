"use client";

import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image as ImageIcon, ReSpin, Upload } from "../icons";

type CoverImageSelectorProps = {
  coverImage: string;
  onImageChange: (url: string) => void;
  onFileSelect?: (file: File) => void;
  onGenerate: () => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
  regenCount: number;
  maxRegen: number;
};

const CoverImageSelector = ({
  coverImage,
  onImageChange,
  onFileSelect,
  onGenerate,
  isLoading,
  disabled,
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
      if (onFileSelect) onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-6 border-t border-cosmos pt-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-titan-white font-semibold text-sm md:text-base flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-vivid-cyan" />
          {t("generateBlog.coverImage")}
        </h4>
        <span className="text-[11px] md:text-xs text-seashell-blue bg-cosmos/30 px-2 py-1 rounded-md">
          {t("generateBlog.aiTries", {
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
                disabled={isLoading || disabled}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={t("generateBlog.uploadNew")}
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
            <p className="text-seashell-blue text-sm mb-1">{t("generateBlog.noImage")}</p>
            <p className="text-seashell-blue/60 text-xs">{t("generateBlog.imageHint")}</p>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-mirage/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
            <ReSpin className="w-8 h-8 text-vivid-cyan animate-spin mb-3" />
            <p className="text-titan-white text-sm animate-pulse">{t("generateBlog.generatingImage")}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row lg:gap-3 gap-2 lg:mt-6 mt-3">
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={isLoading || disabled}
          className="flex-1 cursor-pointer flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-cosmos bg-mirage/50 text-titan-white text-sm hover:bg-cosmos/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm active:scale-[0.98]"
        >
          <Upload className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          <span className="font-medium">{t("generateBlog.upload")}</span>
        </button>

        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading || disabled || regenCount >= maxRegen}
          className="flex-1 cursor-pointer  flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-mirage/50 border border-cosmos text-vivid-cyan text-sm hover:bg-vivid-cyan/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:grayscale group shadow-sm active:scale-[0.98]"
        >
          <ReSpin className={`w-4 h-4 ${isLoading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
          <span className="font-bold whitespace-nowrap">
            {regenCount > 0 ? t("generateBlog.regenerate") : t("generateBlog.generateAI")}
          </span>
        </button>
      </div>

    </div>
  );
};

export default CoverImageSelector;
