"use client";
import { useEffect } from "react";
import gsap from "gsap";

type WordRefs = {
  prev: React.RefObject<HTMLElement | null>;
  current: React.RefObject<HTMLElement | null>;
  next: React.RefObject<HTMLElement | null>;
};

export function useWordGsap(
  refs: WordRefs,
  index: number,
  direction: 1 | -1
) {
  useEffect(() => {
    const { prev, current, next } = refs;
    if (!prev.current || !current.current || !next.current) return;

    const travel = 22 * direction;

    // PRE-POSITION (this is CRITICAL)
    gsap.set(prev.current, { y: -travel, opacity: 0.15, filter: "blur(6px)" });
    gsap.set(next.current, { y: travel, opacity: 0.15, filter: "blur(6px)" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Previous settles upward
    tl.to(prev.current, {
      y: -12,
      opacity: 0.25,
      filter: "blur(4px)",
      duration: 0.6,
    }, 0);

    // Current FLOATS IN (overshoot → settle)
    tl.fromTo(
      current.current,
      {
        y: travel * 0.6,
        opacity: 0,
        filter: "blur(8px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.85,
        ease: "power4.out",
      },
      0
    );

    // Next settles downward
    tl.to(next.current, {
      y: 12,
      opacity: 0.25,
      filter: "blur(4px)",
      duration: 0.6,
    }, 0);

    return () => {
      tl.kill();
    };
  }, [index, direction]);
}