"use client";

import React from "react";
import noiseTexture from "@/assets/images/texture.png"; 

export default function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 w-full h-full z-[9999] pointer-events-none opacity-[0.05] mix-blend-overlay"
      style={{ 
        backgroundImage: `url(${noiseTexture.src})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px' 
      }}
    />
  );
}