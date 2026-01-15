"use client";

import { useEffect, useRef } from "react";

export function useEnhancedBackgroundMotion() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We use a simplified handler to keep 60fps performance
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      
      const { clientX, clientY } = e;
      
      // Update CSS Variables for the entire wrapper
      // This allows the CSS to handle the masking and spotlight logic
      wrapperRef.current.style.setProperty("--mouse-x", `${clientX}px`);
      wrapperRef.current.style.setProperty("--mouse-y", `${clientY}px`);

      // Update Custom Cursor Position immediately
      if (cursorRef.current) {
        // Using transform is faster than changing top/left
        cursorRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { wrapperRef, cursorRef };
}