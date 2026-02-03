"use client";

import { TiltCard } from "@/modules/our-services/components/utils";
import { motion } from "framer-motion";

export type ProcessStep = {
  title: string;
  desc: string;
  _key?: string;
};

interface ProjectProcessProps {
  data?: ProcessStep[];
}

export function ProjectProcess({ data }: ProjectProcessProps) {
  // If no process steps are found, hide the section entirely
  if (!data || data.length === 0) return null;

  return (
    <section className="w-full px-6 md:px-12 py-24">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="flex flex-col text-4xl md:text-6xl font-medium text-white uppercase tracking-tighter mb-16 items-center text-center md:text-left">
          The Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((step, i) => (
            <motion.div
              key={step._key || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <TiltCard className="group h-[400px] w-full">
                {/* 1. Glow Behind Card */}
                <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-md" />

                {/* 2. GLASS CARD CONTAINER */}
                <div className="relative h-full flex flex-col justify-between rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl overflow-hidden">
                  {/* Top Shine */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />

                  {/* Inner Content - Preserving Your Original Composition */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    {/* Top: Number (Your Original Position) */}
                    <div>
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors mb-2 block">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    {/* Bottom: Title & Desc (Your Original Position) */}
                    <div>
                      <h3 className="text-2xl font-medium mb-4 uppercase text-white group-hover:text-white transition-colors duration-300">
                        {step.title}
                      </h3>

                      {/* Optional: Added the divider line from the effect reference because it fits the glass style nicely */}
                      <div className="w-full h-px bg-white/10 mb-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                      </div>

                      <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Inner Blur Decoration (The subtle blob effect) */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
