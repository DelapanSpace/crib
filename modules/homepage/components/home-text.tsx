"use client";

import { useRef } from "react";
import { useWheelWordIndex } from "@/hooks/use-scroll-word";
import { useWordGsap } from "@/hooks/use-word-gsap";
import { WORDS, getNextIndex, getPrevIndex } from "../utils";

export function HomeText() {
  const { index: currentIndex, direction } =
    useWheelWordIndex(WORDS.length);

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

  const baseTextStyle =
    "font-extrabold text-[6rem] whitespace-nowrap transform-gpu origin-left";

  const inlineStyle = {
    letterSpacing: "-0.05em",
    lineHeight: "0.9",
  };

  const highlightLine = (
    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-[60%] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] rounded-full" />
  );

  return (
    <div className="flex flex-col items-start justify-center gap-2 select-none pointer-events-none">

      <div className="relative flex items-center h-[100px]">
        <span ref={prevRef} className={`${baseTextStyle} text-white/20`} style={inlineStyle}>
          {WORDS[prevIndex]}
        </span>
      </div>

      <div className="relative flex items-center h-[120px]">
        {highlightLine}
        <span
          ref={currentRef}
          className={`${baseTextStyle} text-white`}
          style={{
            ...inlineStyle,
            textShadow: "0 0 40px rgba(255,255,255,0.15)",
          }}
        >
          {WORDS[currentIndex]}
        </span>
      </div>

      <div className="relative flex items-center h-[100px]">
        <span ref={nextRef} className={`${baseTextStyle} text-white/20`} style={inlineStyle}>
          {WORDS[nextIndex]}
        </span>
      </div>

    </div>
  );
}