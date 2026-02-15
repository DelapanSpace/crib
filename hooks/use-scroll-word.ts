"use client";
import { useEffect, useRef, useState, useCallback} from "react";
import { useSynthClick } from "./use-synth-click";
export function useWheelWordIndex(total: number) {
  const [index, setIndex] = useState(0);
  const direction = useRef<1 | -1>(1);
  const locked = useRef(false);
  const { playClick } = useSynthClick();

  // Helper to safely change index with debounce (locking)
  const changeIndex = useCallback((dir: 1 | -1) => {
    if (locked.current) return;
    playClick();
    locked.current = true;
    direction.current = dir;

    setIndex((i) => (dir === 1 ? (i + 1) % total : (i - 1 + total) % total));

    setTimeout(() => {
      locked.current = false;
    }, 550);
  }, [total, playClick]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 25) return;
      // 1 for down (next), -1 for up (prev)
      changeIndex(e.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [changeIndex]);

  return {
    index,
    direction,
    // Expose these for manual button control
    next: () => changeIndex(1),
    prev: () => changeIndex(-1),
  };
}
