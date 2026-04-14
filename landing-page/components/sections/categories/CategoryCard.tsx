"use client";

import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  tags: string[];
  index: number;
}

export default function CategoryCard({ title, description, tags, index }: CategoryCardProps) {
  return (
    <motion.div
      // Entry reveal: delayed and slower
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      
      // Idle "Breath": Slower 8-second cycle
      animate={{
        y: [0, -5, 0],
      }}

      // MERGED TRANSITION OBJECT
      transition={{
        // Default transition (for opacity and initial y entrance)
        duration: 1.0,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
        
        // Specific transition for the repeating "y" breath effect
        y: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        }
      }}

      // Hover Physics: Deliberate and heavy
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="relative group rounded-[10px] p-5 w-full h-full min-h-[170px] border border-white/10 bg-gradient-to-br from-[#0b173699] to-[#0a112499] backdrop-blur-md overflow-hidden transition-all duration-700 hover:border-white/30"
    >
      {/* 🌟 SLOW PREMIUM GLASS SHINE 🌟 */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[-150%] left-[-150%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-[35deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]" 
        />
      </div>

      <div className="relative z-10 flex flex-col h-full gap-2">
        <div className="flex flex-col gap-2.5">
          <h3 className="text-base font-medium text-white font-hoves leading-tight" style={{ fontFamily: "var(--font-hoves)" }}>
            {title}
          </h3>
          <p className="text-sm font-normal text-white/65 font-hoves leading-tight" style={{ fontFamily: "var(--font-hoves)" }}>
            {description}
          </p>
        </div>

        <div className="flex-1" />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-white/5 text-white/70 font-hoves tracking-wide border border-white/5 group-hover:bg-white/10 group-hover:text-white transition-colors duration-500"
              style={{ fontFamily: "var(--font-hoves)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}