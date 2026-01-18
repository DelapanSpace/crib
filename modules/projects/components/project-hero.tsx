import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProjectHeroProps {
  title: string;
  services: string[];
  imageSrc?: string;
}

export function ProjectHero({ title, services, imageSrc }: ProjectHeroProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover opacity-90"
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <span className="text-zinc-700 font-mono uppercase tracking-widest">
              Image Placeholder
            </span>
          </div>
        )}
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 2. Navigation (Top Left) */}
      <Link
        href="/"
        className="
          absolute top-8 left-6 md:top-12 md:left-12 
          z-30 w-12 h-12 
          rounded-full border border-white/30 
          flex items-center justify-center 
          backdrop-blur-md bg-white/10
          hover:bg-white hover:text-black hover:border-white
          transition-all duration-300
        "
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      {/* 3. Main Title (Centered) */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-[12vw] md:text-[10vw] font-bold uppercase tracking-tighter leading-[0.8] text-center select-none mix-blend-overlay opacity-90 flex flex-wrap justify-center">
          {title.split(" ").map((word, i) => (
            // Wrap each word to keep characters together
            <span key={i} className="whitespace-nowrap">
              {word.split("").map((char, j) => (
                <span
                  key={j}
                  // The hover effect: White -> Black
                  className="inline-block hover:text-black transition-colors duration-[600ms] ease-out cursor-default"
                >
                  {char}
                </span>
              ))}
              {/* Non-breaking space to maintain gaps between words */}
              <span className="inline-block">&nbsp;</span>
            </span>
          ))}
        </h1>
      </div>

      {/* 4. Services List (Bottom Left) */}
      <div className="absolute bottom-12 left-6 md:bottom-16 md:left-12 z-20">
        <h3 className="text-xs font-mono uppercase text-white/60 mb-4 tracking-widest">
          Services
        </h3>
        <ul className="flex flex-col gap-1">
          {services.map((service, i) => (
            <li
              key={i}
              className="text-lg md:text-xl font-medium tracking-tight text-white"
            >
              {service}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}