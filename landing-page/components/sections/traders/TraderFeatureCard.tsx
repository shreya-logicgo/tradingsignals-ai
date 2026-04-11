import { ReactNode } from "react";

interface TraderFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function TraderFeatureCard({ icon, title, description }: TraderFeatureCardProps) {
  return (
    <div className="flex-1 min-w-0 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-6 box-border transition-all duration-300 hover:border-white/20 min-h-45">
      {/* Inner container */}
      <div className="flex flex-col gap-6 w-full h-full">

        {/* Icon container */}
        <div className="w-11 h-11 p-2.5 rounded-xl bg-gradient-to-r from-[#0012B8] to-[#00F0FF] flex items-center justify-center flex-shrink-0">
          <div className="w-6 h-6 flex items-center justify-center text-white">
            {icon}
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-hoves font-medium text-base text-left leading-none text-white m-0">
            {title}
          </h3>
          <p className="font-hoves font-extralight text-left text-xs leading-relaxed text-[#c7ccd2]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
