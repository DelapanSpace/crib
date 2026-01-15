"use client";

import { useState } from "react";
import { WORDS, getPrevIndex, getNextIndex } from "../utils"

export function HomeText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevIndex = getPrevIndex(currentIndex, WORDS.length);
  const nextIndex = getNextIndex(currentIndex, WORDS.length);

  const baseStyle =
    "font-extrabold text-[6rem] whitespace-nowrap transition-colors";
  const inlineStyle = {
    letterSpacing: "-0.05em",
    lineHeight: "0.9",
  };

  return (
    <div className="flex flex-col items-start gap-8">
      {/* Previous */}
      <div className="overflow-x-auto no-scrollbar">
        <button
          onClick={() => setCurrentIndex(prevIndex)}
          className={`${baseStyle} text-white/30 hover:text-white/50`}
          style={inlineStyle}
        >
          {WORDS[prevIndex]}
        </button>
      </div>

      {/* Current */}
      <div className="overflow-x-auto no-scrollbar">
        <span className={`${baseStyle} text-white`} style={inlineStyle}>
          {WORDS[currentIndex]}
        </span>
      </div>

      {/* Next */}
      <div className="overflow-x-auto no-scrollbar">
        <button
          onClick={() => setCurrentIndex(nextIndex)}
          className={`${baseStyle} text-white/30 hover:text-white/50`}
          style={inlineStyle}
        >
          {WORDS[nextIndex]}
        </button>
      </div>
    </div>
  );
}