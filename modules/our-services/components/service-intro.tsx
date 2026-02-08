"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  InteractiveTitle,
  MagneticButton,
  MaskedText,
  TiltCard,
} from "./utils";

export function ServiceIntro() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full max-h-[800px] flex items-start justify-center text-white px-6 md:px-12 pt-25 pb-10 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT COLUMN (7 Cols) - Typography Anchor */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div style={{ y }} className="relative">
              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-8"
              ></motion.div>

              {/* Main Heading */}
              <div className="text-7xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter leading-[0.85] select-none">
                {/* Line 1: Delapan */}
                <InteractiveTitle text="8Space" delay={0.1} />

                {/* Line 2: Services */}
                <div className="pl-2">
                  <InteractiveTitle text="Services" delay={0.2} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (5 Cols) - Glass Composition */}
          <div className="lg:col-span-5 perspective-1000 w-full">
            <TiltCard className="relative group w-full">
              {/* Glow Behind Card */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-xl" />

              {/* GLASS CARD CONTAINER */}
              <div className="relative w-full rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-10 shadow-2xl overflow-hidden">
                {/* Top Shine */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />

                {/* Card Header: Badge & Button */}
                <div className="flex justify-between items-start mb-12">
                  <div className="flex items-center gap-2 px-10 py-1.5 rounded-full border border-white/10 bg-black/30 text-[10px] font-mono font-medium text-white/70 tracking-wide uppercase shadow-inner"></div>
                  <MagneticButton />
                </div>

                {/* Card Body: Text Content */}
                <div className="space-y-6 relative z-10">
                  <div className="space-y-1">
                    <MaskedText
                      className="text-3xl md:text-4xl leading-tight font-light text-white drop-shadow-sm"
                      delay={0.3}
                    >
                      We unite strategic design, high-impact content,
                    </MaskedText>
                    <MaskedText
                      className="text-3xl md:text-4xl leading-tight font-light text-white drop-shadow-sm"
                      delay={0.4}
                    >
                      and active community management
                    </MaskedText>
                  </div>

                  <div className="space-y-1">
                    <MaskedText
                      className="text-3xl md:text-4xl leading-tight font-light text-white/60 drop-shadow-sm"
                      delay={0.5}
                    >
                      To build a cohesive and
                    </MaskedText>
                    <MaskedText
                      className="text-3xl md:text-4xl leading-tight font-light text-white/60 drop-shadow-sm"
                      delay={0.6}
                    >
                      powerful brand experience.
                    </MaskedText>
                  </div>
                </div>

                {/* Card Footer: Metrics */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="mt-14 pt-8 border-t border-white/5 grid grid-cols-2 gap-8"
                >
                  <div>
                    <h4 className="text-[10px] text-white/30 font-mono mb-2 uppercase tracking-widest">
                      Shipped
                    </h4>
                    <p className="text-2xl font-medium text-white/90 font-mono">
                      20+
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] text-white/30 font-mono mb-2 uppercase tracking-widest">
                      Since
                    </h4>
                    <p className="text-2xl font-medium text-white/90 font-mono">
                      2021
                    </p>
                  </div>
                </motion.div>

                {/* Inner Blur Decoration */}
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
