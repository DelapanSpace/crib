"use client";
import { useEffect, useRef, useState } from "react";

export function useWheelWordIndex(total: number) {
  const [index, setIndex] = useState(0);
  const direction = useRef<1 | -1>(1);
  const locked = useRef(false);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (locked.current) return;
      if (Math.abs(e.deltaY) < 25) return;

      locked.current = true;
      direction.current = e.deltaY > 0 ? 1 : -1;

      setIndex((i) =>
        direction.current === 1
          ? (i + 1) % total
          : (i - 1 + total) % total
      );

      setTimeout(() => {
        locked.current = false;
      }, 550);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [total]);

  return { index, direction };
}