"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useWheelWordIndex } from "@/hooks/use-scroll-word";
import { useWordGsap } from "@/hooks/use-word-gsap";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WORDS, getNextIndex, getPrevIndex } from "../utils";
import { ProjectsList } from "./project-list";

export function HomeText() {
  const router = useRouter();

  const {
    index: currentIndex,
    direction,
    next,
    prev,
  } = useWheelWordIndex(WORDS.length);

  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const handlePopoverScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const prevIndex = getPrevIndex(currentIndex, WORDS.length);
  const nextIndex = getNextIndex(currentIndex, WORDS.length);

  const prevRef = useRef<HTMLSpanElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);
  const nextRef = useRef<HTMLSpanElement>(null);

  useWordGsap(
    {
      prev: prevRef,
      current: currentRef,
      next: nextRef,
    },
    currentIndex,
    direction.current
  );

  // Close popover if user changes the word
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [currentIndex]);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // [Mobile Responsive] text-4xl prevents overflow on small screens
  const baseTextStyle =
    "font-extrabold text-4xl md:text-[6rem] whitespace-nowrap transform-gpu origin-left transition-all duration-300";

  const inlineStyle = {
    letterSpacing: "-0.05em",
    lineHeight: "0.9",
  };

  const highlightLine = (
    <div className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-1 md:w-1.5 h-[60%] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] rounded-full" />
  );

  const currentWord = WORDS[currentIndex];
  const isProjectWord = currentWord === "PROJECTS";

  const handleClick = (word: string) => {
    const slug = word.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${slug}`);
  };

  return (
    <>
      <div className="flex flex-col items-start justify-center gap-2 select-none pointer-events-none">
        {/* PREV WORD */}
        <div className="relative flex items-center h-[60px] md:h-[100px]">
          <span
            ref={prevRef}
            className={`${baseTextStyle} text-white/20`}
            style={inlineStyle}
          >
            {WORDS[prevIndex]}
          </span>
        </div>

        {/* CURRENT WORD */}
        <div className="relative flex items-center h-[70px] md:h-[120px]">
          {highlightLine}

          {isProjectWord ? (
            <Popover open={isOpen} onOpenChange={setIsOpen} modal={false}>
              <PopoverTrigger asChild>
                <span
                  ref={currentRef}
                  className={`${baseTextStyle} relative z-10 text-white pointer-events-auto cursor-pointer hover:text-white/80 transition-colors touch-pan-y`}
                  style={{
                    ...inlineStyle,
                    textShadow: "0 0 40px rgba(255,255,255,0.15)",
                  }}
                >
                  {currentWord}
                </span>
              </PopoverTrigger>
              <PopoverContent
                side={isDesktop ? "right" : "top"}
                align="start"
                sideOffset={10}
                onWheel={handlePopoverScroll}
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="z-50 pointer-events-auto bg-transparent border-none shadow-none p-0 animate-in fade-in zoom-in-95 duration-200"
              >
                <ProjectsList />
              </PopoverContent>
            </Popover>
          ) : (
            <span
              ref={currentRef}
              className={`${baseTextStyle} text-white pointer-events-auto cursor-pointer hover:text-white/80 transition-colors touch-pan-y`}
              style={{
                ...inlineStyle,
                textShadow: "0 0 40px rgba(255,255,255,0.15)",
              }}
              onClick={() => handleClick(currentWord)}
            >
              {currentWord}
            </span>
          )}
        </div>

        {/* NEXT WORD */}
        <div className="relative flex items-center h-[60px] md:h-[100px]">
          <span
            ref={nextRef}
            className={`${baseTextStyle} text-white/20`}
            style={inlineStyle}
          >
            {WORDS[nextIndex]}
          </span>
        </div>
      </div>

      {/* MOBILE CONTROLS (Hidden on Desktop 'md:hidden') */}
      <div className="fixed bottom-12 right-6 flex flex-col gap-4 md:hidden z-50 pointer-events-auto">
        <button
          onClick={prev}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 active:scale-95 transition-all border border-white/10"
          aria-label="Previous Word"
        >
          <ArrowUp />
        </button>
        <button
          onClick={next}
          className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 active:scale-95 transition-all border border-white/10"
          aria-label="Next Word"
        >
          <ArrowDown />
        </button>
      </div>
    </>
  );
}
