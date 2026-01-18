"use client";

import { motion } from "framer-motion";

// Type matching your Sanity Query
export type GalleryItem = {
  title?: string;
  imageUrl?: string;
  _key?: string; // Sanity adds unique keys to array items
};

interface ProjectGalleryProps {
  data?: GalleryItem[];
}

export function ProjectGallery({ data = [] }: ProjectGalleryProps) {
  // 1. Prepare Data:
  // If data exists, duplicate it for the loop.
  // If not, create 6 placeholders so the UI still looks good.
  const hasData = data && data.length > 0;

  const placeholders = Array.from({ length: 6 }).map((_, i) => ({
    title: `Process Shot ${i + 1}`,
    imageUrl: undefined,
    _key: `placeholder-${i}`,
  }));

  const baseItems = hasData ? data : placeholders;

  // 2. Create the seamless loop array (duplicate the list)
  // We repeat it enough times to ensure it fills the screen width for the animation
  // If you have very few items (like 2), you might want to repeat it 4 times.
  const loopItems = [...baseItems, ...baseItems, ...baseItems, ...baseItems];

  return (
    <section className="w-full py-20 overflow-hidden border-white/10">
      {/* Header / Context Bar */}
      <div className="mt-12 px-6 md:px-12 mb-12 flex justify-between items-end">
        <div>
          <p className="text-zinc-600 text-xs uppercase tracking-widest">
            Continuous Stream
          </p>
          <h2 className="text-white text-2xl font-bold uppercase tracking-tighter">
            The Production Pipeline
          </h2>
        </div>
        <div className="h-[1px] flex-1 bg-zinc-800 mx-8 mb-2 hidden md:block" />
        <p className="text-zinc-500 font-mono text-[10px] uppercase">
          Loop_Active: True
        </p>
      </div>

      {/* The Moving Carousel */}
      <div className="relative flex w-full">
        <motion.div
          className="flex gap-4 md:gap-6 px-3 md:px-3"
          // We animate x from 0 to -50% because we doubled the content.
          // Ideally, we calculate the exact width, but for a "stream" look,
          // a large negative percentage usually creates the infinite effect if the array is long enough.
          animate={{
            x: ["0%", "-25%"],
          }}
          transition={{
            duration: 30, // Speed of the scroll
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {loopItems.map((item, index) => (
            <div
              key={`${item._key}-${index}`}
              className="
                flex-shrink-0 
                w-[250px] md:w-[700px] aspect-[16/9] 
                bg-zinc-900 border border-white/10 
                flex flex-col items-center justify-center 
                group relative overflow-hidden 
                transition-colors duration-500 hover:bg-zinc-800
              "
            >
              {/* Image Layer */}
              <div className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title || "Gallery Image"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black" />
                )}
              </div>

              {/* Text Label Overlay */}
              <div className="z-10 text-center px-6 relative translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {/* {String(index + 1).padStart(2, "0")} */}
                </span>
                <h3 className="text-white text-lg font-medium uppercase tracking-tighter drop-shadow-md">
                  {/* {item.title || ""} */}
                </h3>
              </div>

              {/* Border Glow Effect */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
