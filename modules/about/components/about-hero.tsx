import { urlFor } from "@/sanity/lib/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AboutHero({ data }: any) {
  const title = data?.heroTitle || "";
  return (
    <section className="relative w-full h-screen flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: data?.heroImage
            ? `url(${urlFor(data.heroImage).width(2000).url()})`
            : undefined,
        }}
      >
        {/* Overlay to ensure text readability if needed, though design is clear */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <Link
        href="/"
        aria-label="Back to home"
        className="
    absolute
    top-4 left-4
    md:top-8 md:left-8
    z-20
    w-10 h-10 md:w-12 md:h-12
    rounded-full
    border border-white/60
    flex items-center justify-center
    backdrop-blur-sm
    hover:border-white
    hover:bg-white/10
    transition
  "
      >
        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </Link>

      {/* Hero Content */}
      <div className="relative z-10 w-full">
        <h1 className="text-white text-[10vw] leading-[0.85] font-bold tracking-tighter uppercase break-words flex flex-wrap select-none">
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
