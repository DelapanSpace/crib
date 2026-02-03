"use client"

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseYFromCenter / 20); // Slightly stronger tilt for smaller cards
    y.set(-(mouseXFromCenter / 20));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: mouseX,
        rotateY: mouseY,
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative group cursor-pointer z-20"
    >
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-transparent shadow-lg">
        <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-white transition-all duration-300 group-hover:text-black group-hover:scale-110 group-hover:rotate-45" />
      </div>
    </motion.div>
  );
}

export function MaskedText({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.p
        initial={{ y: "100%", opacity: 0, rotate: 2 }}
        whileInView={{ y: "0%", opacity: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
        className={className}
      >
        {children}
      </motion.p>
    </div>
  );
}

export function InteractiveTitle({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <div className={cn("overflow-hidden flex flex-wrap", className)}>
      <motion.div
        initial={{ y: "100%", rotate: 2 }}
        whileInView={{ y: "0%", rotate: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
        className="flex flex-wrap"
      >
        {words.map((word, i) => (
          <span key={i} className="whitespace-nowrap mr-[0.25em]">
            {word.split("").map((char, j) => (
              <span
                key={j}
                // Interaction: Base white, hovers to dark gray (almost black), slow transition
                className="inline-block text-white transition-colors duration-[600ms] ease-out cursor-default hover:text-black"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}