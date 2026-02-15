"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface TransitionContextType {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
  isTransitioning: false,
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);       // ← controls scaleY
  const [overlayOrigin, setOverlayOrigin] = useState<"bottom" | "top">("bottom"); // ← controls origin

  const navigate = (href: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    router.prefetch(href);

    // 1. Animate IN (scale up from bottom)
    setOverlayOrigin("bottom");
    setOverlayVisible(true);

    // 2. After cover, push route
    setTimeout(() => {
      router.push(href);

      // 3. Animate OUT (scale down from top)
      setTimeout(() => {
        setOverlayOrigin("top");
        setOverlayVisible(false);

        setTimeout(() => {
          setIsTransitioning(false);
          setOverlayOrigin("bottom"); // reset for next use
        }, 500);
      }, 100);
    }, 400);
  };

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      <div
        style={{
          // React controls this — no ref conflict
          transform: overlayVisible ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: overlayOrigin,
          transition: "transform 400ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
        className="fixed inset-0 z-[9999] bg-black pointer-events-none"
      />
      {children}
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);