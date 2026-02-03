"use client";

import Link from "next/link";

export function ServiceHero() {
  return (
    <div className="absolute top-12 left-8 md:left-12 z-10 select-none pointer-events-none">
      <Link href="/" className="inline-block pointer-events-auto">
        <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-2 hover:opacity-80 transition cursor-pointer">
          Services
        </h1>
      </Link>
      <p className="text-zinc-500 text-sm md:text-base uppercase tracking-[0.2em] flex items-center gap-2">
        What We Do
      </p>
    </div>
  );
}