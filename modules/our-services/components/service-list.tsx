"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

// 1. Data Structure (Unchanged)
const services = [
  {
    id: "01",
    title: "WEB DEVELOPMENT",
    description:
      "Scalable, high-performance websites and web applications tailored to your business objectives, built with modern technologies for speed and reliability.",
    tags: "Front-end, Back-end, Web3",
    src: "https://images.unsplash.com/photo-1555421689-d68471e88984?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "UI/UX DESIGN",
    description:
      "Designing intuitive and engaging digital experiences that prioritize user needs while seamlessly integrating with your brand's visual identity.",
    tags: "User Research, Prototyping",
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Social Media",
    description:
      "Strategic content planning and community management designed to grow your audience, foster engagement, and build lasting brand loyalty.",
    tags: "Content Strategy, Analytics",
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Digital Marketing",
    description:
      "Data-driven performance marketing campaigns that increase visibility, drive qualified traffic, and maximize conversion rates across digital channels.",
    tags: "SEO, SEM, Paid Social",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "Brand Design",
    description:
      "Crafting distinctive visual identities and comprehensive brand systems that resonate with your target audience and stand the test of time.",
    tags: "Brand Strategy, Logo Design",
    src: "https://images.unsplash.com/photo-1626785774573-4b7993143d2d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "06",
    title: "Photography",
    description:
      "High-end commercial photography that highlights the quality and details of your products, elevating your visual assets for web and print.",
    tags: "Studio Shoots, Retouching",
    src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "07",
    title: "KOL Management",
    description:
      "Leveraging authentic voices through influencer partnerships and user-generated content to build trust and expand your brand's reach organically.",
    tags: "Influencer Outreach, PR",
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "08",
    title: "360 Campaign",
    description:
      "Integrated, omni-channel marketing campaigns that deliver a cohesive message across all touchpoints, from digital to physical.",
    tags: "Creative Strategy, Events",
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
  },
];

export function ServiceList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>(
    {},
  );

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Delapan Space Services",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      serviceType: service.tags,
      image: service.src,
    })),
  };

  // Scroll Logic
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth;
      containerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Flip Logic
  const handleCardClick = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="services"
      className="relative w-full min-h-screen bg-white text-black py-24 flex flex-col justify-center overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full h-[80vh] relative group/container">
        {/* Navigation Arrows (Visible if items > 4) */}
        {services.length > 4 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-all opacity-0 group-hover/container:opacity-100 disabled:opacity-0"
              aria-label="Scroll Left"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-all opacity-0 group-hover/container:opacity-100"
              aria-label="Scroll Right"
            >
              <ArrowRight size={24} />
            </button>
          </>
        )}

        {/* Horizontal Scroll Container */}
        <div
          ref={containerRef}
          className="flex w-full h-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-0"
        >
          {services.map((service) => {
            const isFlipped = flippedCards[service.id];

            return (
              <div
                key={service.id}
                className="relative min-w-[100vw] md:min-w-[25vw] h-full border-r border-black/10 last:border-r-0 snap-start perspective-1000 cursor-pointer group/card"
                onClick={() => handleCardClick(service.id)}
              >
                {/* INNER CARD (FLIP CONTAINER) */}
                <motion.div
                  className="w-full h-full relative preserve-3d"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* --- FRONT FACE --- */}
                  <div className="absolute inset-0 w-full h-full backface-hidden bg-white flex flex-col justify-between p-8 overflow-hidden">
                    {/* Background Image (Appears on Hover) */}
                    <div className="absolute inset-0 z-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 ease-in-out">
                      <Image
                        src={service.src}
                        alt={service.title}
                        fill
                        className="object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700"
                      />
                      {/* Dark overlay for text readability on hover */}
                      <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Content (Z-10 to sit above image) */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pointer-events-none text-black group-hover/card:text-white transition-colors duration-300">
                      {/* Top: Title */}
                      <div className="w-full text-center mt-12">
                        {/* Pill Label */}
                        <h3 className="text-3xl font-bold uppercase tracking-tighter leading-none break-words">
                          {service.title}
                        </h3>
                      </div>

                      {/* Center: Massive Number */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-[180px] md:text-[220px] font-thin leading-none tracking-tighter opacity-100 font-sans">
                          {parseInt(service.id)}
                        </span>
                      </div>

                      {/* Bottom Left: Tags */}
                      <div className="w-full flex justify-between items-end">
                        <div className="border border-black group-hover/card:border-white px-4 py-2 rounded-full uppercase text-xs font-medium tracking-wide">
                          {service.tags.split(",")[0]}
                        </div>

                        {/* Flip Indicator */}
                        <div className="w-10 h-10 rounded-full border border-black/20 group-hover/card:border-white/50 flex items-center justify-center">
                          <RotateCcw size={14} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- BACK FACE (DESCRIPTION) --- */}
                  <div
                    className="absolute inset-0 w-full h-full backface-hidden bg-black text-white p-10 flex flex-col items-center justify-center text-center"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <span className="text-sm font-mono text-zinc-500 mb-6">
                      {service.id} — DESCRIPTION
                    </span>
                    <h4 className="text-2xl font-bold uppercase mb-6 tracking-tight">
                      {service.title}
                    </h4>
                    <p className="text-lg md:text-xl leading-relaxed text-zinc-300 max-w-sm">
                      {service.description}
                    </p>

                    <div className="mt-12">
                      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                        Capabilities
                      </p>
                      <p className="text-sm">{service.tags}</p>
                    </div>

                    <button className="mt-auto flex items-center gap-2 text-xs uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
                      Click to flip back
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Utilities for 3D Flip */}
      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
