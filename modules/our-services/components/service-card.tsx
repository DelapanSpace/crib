"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Types
type ServiceProps = {
  id: string;
  title: string;
  description: string;
  tags: string;
  src: string;
};

export function ServiceCard({ data }: { data: ServiceProps }) {
  // 1. STATE ISOLATION: Only this component updates when clicked
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative min-w-[100vw] md:min-w-[25vw] h-full border-r border-black/10 last:border-r-0 snap-start perspective-1000 cursor-pointer group/card"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* --- FRONT FACE --- */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white flex flex-col justify-between p-8 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 md:opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 ease-in-out">
            <Image
              src={data.src}
              alt={data.title}
              fill
              priority={true}
              className="object-cover md:grayscale group-hover/card:grayscale-0 transition-all duration-1000"
              // 2. IMAGE OPTIMIZATION: Tell browser this is only 25% of screen width on desktop
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pointer-events-none text-white md:text-black group-hover/card:text-white transition-colors duration-300">
            <div className="w-full text-center mt-12">
              <h3 className="text-3xl font-bold uppercase tracking-tighter leading-none break-words">
                {data.title}
              </h3>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-[180px] md:text-[220px] font-thin leading-none tracking-tighter opacity-100 font-sans">
                {parseInt(data.id)}
              </span>
            </div>

            <div className="w-full flex justify-between items-end">
              <div className="border md:border-black group-hover/card:border-white px-4 py-2 rounded-full uppercase text-xs font-medium tracking-wide">
                {data.tags.split(",")[0]}
              </div>
              <div className="w-10 h-10 rounded-full border md:border-black/20 group-hover/card:border-white/50 flex items-center justify-center">
                <RotateCcw size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* --- BACK FACE --- */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden bg-black text-white p-10 flex flex-col items-center justify-center text-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="text-sm font-mono text-zinc-500 mb-6">
            {data.id} — DESCRIPTION
          </span>
          <h4 className="text-2xl font-bold uppercase mb-6 tracking-tight">
            {data.title}
          </h4>
          <p className="text-lg md:text-xl leading-relaxed text-zinc-300 max-w-sm">
            {data.description}
          </p>
          <div className="mt-12">
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Capabilities
            </p>
            <p className="text-sm">{data.tags}</p>
          </div>
          <button className="mt-auto flex items-center gap-2 text-xs uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
            Click to flip back
          </button>
        </div>
      </motion.div>
    </div>
  );
}