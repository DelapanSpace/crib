"use client";

import { useRef, useEffect } from "react";
import { InteractiveGrid } from "./interactive-grid";
import styles from "./background.module.css";

export function BackgroundLayer() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className={styles.enhancedBackground}>
      <div className={styles.baseGradient} />
      <InteractiveGrid />
      <div className={styles.noiseOverlay} />
      <div ref={cursorRef} className={styles.cursorFollower} />
    </div>
  );
}