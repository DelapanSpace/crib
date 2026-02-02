// components/services/service-intro.tsx
"use client";

import { ArrowUpRight } from "lucide-react";

export function ServiceIntro() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black text-white px-6 md:px-12 py-24">
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-xs">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
              Delapan's Services
            </h2>
          </div>

          <div className="flex-1 max-w-3xl">
            <div className="flex items-start gap-4 mb-8">
              <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 stroke-[1.5] flex-shrink-0" />
            </div>
            <p className="text-xl md:text-3xl leading-relaxed text-white/90">
              We craft digital experiences that connect brands with their audiences through strategic design and purposeful execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}