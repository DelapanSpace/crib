import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface AboutHeroProps {
  data?: {
    heroTitle?: string;
    heroImage?: SanityImageSource;
  };
}

export function AboutHero({ data }: AboutHeroProps) {
  const title = data?.heroTitle || "";
  return (
    <section className="relative w-full min-h-[730px] md:min-h-screen flex flex-col justify-end pb-10 md:pb-20 px-6 md:px-12 overflow-hidden">
      {/* Background Image Layer */}
      {data?.heroImage && (
        <div className="absolute inset-0 z-0">
          <Image
            // Remove .width(2000) - let Next.js handle the resizing
            src={urlFor(data.heroImage).url()}
            alt={title || "Hero Background"}
            fill
            priority={true} // CRITICAL: Preloads image for speed
            className="object-cover" // Mimics 'background-size: cover'
            sizes="100vw" // Tells browser this image is always full width
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}
      {/* Hero Content */}
      <div className="relative z-10 w-full">
        <h1 className="text-white text-[8vw] md:text-[10vw] leading-[0.85] font-bold tracking-tighter uppercase break-words flex flex-wrap pb-10 md:pb-0 select-none">
          {title.split(" ").map((word: string, i: number) => (
            // Wrap each word to prevent line breaks in the middle of a word
            <span key={i} className="whitespace-nowrap">
              {word.split("").map((char: string, j: number) => (
                <span
                  key={j}
                  // The hover effect happens per letter here
                  // duration-[900ms] creates the subtle 0.9s fade out
                  className="inline-block hover:text-black transition-colors duration-[600ms] ease-out cursor-default"
                >
                  {char}
                </span>
              ))}
              {/* Add a non-breaking space after the word to maintain spacing */}
              <span className="inline-block">&nbsp;</span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
