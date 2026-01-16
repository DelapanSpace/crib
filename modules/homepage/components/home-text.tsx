"use client";

import { useEffect, useRef, useState } from "react";
import { useWheelWordIndex } from "@/hooks/use-scroll-word";
import { useWordGsap } from "@/hooks/use-word-gsap";
import { WORDS, getNextIndex, getPrevIndex } from "../utils";
import { ProjectsList } from "./project-list";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { Route } from "next";

export function HomeText() {
  const router = useRouter();
  const { index: currentIndex, direction } = useWheelWordIndex(WORDS.length);
  const [isOpen, setIsOpen] = useState(false);
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

  // Close popover if user scrolls away
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [currentIndex]);

  const baseTextStyle =
    "font-extrabold text-[6rem] whitespace-nowrap transform-gpu origin-left";

  const inlineStyle = {
    letterSpacing: "-0.05em",
    lineHeight: "0.9",
  };

  const highlightLine = (
    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-[60%] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] rounded-full" />
  );

  const currentWord = WORDS[currentIndex];
  const isProjectWord = currentWord === "PROJECTS";

  const handleClick = (word: string) => {
    const slug = word.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${slug}`);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-2 select-none pointer-events-none">
      
      {/* PREV WORD */}
      <div className="relative flex items-center h-[100px]">
        <span
          ref={prevRef}
          className={`${baseTextStyle} text-white/20`}
          style={inlineStyle}
        >
          {WORDS[prevIndex]}
        </span>
      </div>
      <div className="relative flex items-center h-[120px]">
        {highlightLine}
        
        {isProjectWord ? (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <span
                ref={currentRef}
                className={`${baseTextStyle} text-white pointer-events-auto cursor-pointer hover:text-white/80 transition-colors`}
                style={{
                  ...inlineStyle,
                  textShadow: "0 0 40px rgba(255,255,255,0.15)",
                }}
              >
                {currentWord}
              </span>
            </PopoverTrigger>
            <PopoverContent
              side="right"
              align="start"
              onWheel={handlePopoverScroll}
              className="pointer-events-auto bg-transparent border-none shadow-none p-0 ml-4 animate-in fade-in zoom-in-95 duration-200"
            >
              <ProjectsList />
            </PopoverContent>
          </Popover>
        ) : (
          <span
            ref={currentRef}
            className={`${baseTextStyle} text-white pointer-events-auto cursor-pointer hover:text-white/80 transition-colors`}
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

      <div className="relative flex items-center h-[100px]">
        <span
          ref={nextRef}
          className={`${baseTextStyle} text-white/20`}
          style={inlineStyle}
        >
          {WORDS[nextIndex]}
        </span>
      </div>
    </div>
  );
}