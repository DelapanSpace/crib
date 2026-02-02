// components/services/service-approach.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion"; // Import Variants type
import {
  ArrowDownRight,
  Circle,
  Hexagon,
  Square,
  Triangle,
} from "lucide-react";

const principles = [
  {
    id: "01",
    title: "Clarity Over Complexity",
    description:
      "We strip away the unnecessary to reveal the essential. Every decision serves a purpose, every element earns its place.",
    icon: Circle,
  },
  {
    id: "02",
    title: "Built to Last",
    description:
      "We create systems, not just solutions. Our work is designed to evolve with your business, not expire with trends.",
    icon: Square,
  },
  {
    id: "03",
    title: "Honest Collaboration",
    description:
      "No jargon, no smoke and mirrors. We believe in transparent processes and partnerships built on mutual respect.",
    icon: Hexagon,
  },
  {
    id: "04",
    title: "Details Matter",
    description:
      "Excellence lives in the margins. We sweat the small stuff because craftsmanship shows in every pixel, every interaction.",
    icon: Triangle,
  },
];

// FIX: Explicitly type these objects as 'Variants'
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// FIX: Explicitly type these objects as 'Variants'
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut", // Now TS knows this is a valid Easing type
    },
  },
};

export function ServiceApproach() {
  return (
    <section className="w-full min-h-screen bg-black text-white px-6 md:px-12 py-24 flex items-center">
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-4"
          >
            Our Philosophy
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold uppercase tracking-tight"
          >
            How We Work
          </motion.h2>
        </div>

        {/* Grid Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {principles.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div key={index} variants={cardVariants}>
                <Card
                  className={cn(
                    "group relative flex flex-col justify-between min-h-[420px] border-white/10 bg-zinc-900/20 backdrop-blur-sm transition-all duration-500",
                    "hover:bg-zinc-900/40 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]",
                  )}
                >
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

                  <CardContent className="p-8 h-full flex flex-col justify-between relative z-10">
                    {/* Top: Icon */}
                    <div className="mb-8">
                      <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-500">
                        <Icon
                          strokeWidth={1}
                          className="w-6 h-6 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all duration-500"
                        />
                      </div>
                    </div>

                    {/* Middle: Content */}
                    <div className="flex-1 flex flex-col justify-end">
                      <h4 className="text-2xl font-medium uppercase tracking-tight mb-6 text-zinc-200 group-hover:text-white transition-colors">
                        {item.title}
                      </h4>

                      {/* Animated Divider Line */}
                      <div className="w-full h-px bg-white/10 mb-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-white/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                      </div>

                      <p className="text-zinc-500 text-base leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom: Arrow Icon */}
                    <div className="mt-8 flex justify-between items-end">
                      <span className="text-xs font-mono text-zinc-700 group-hover:text-zinc-500 transition-colors">
                        {item.id}
                      </span>
                      <ArrowDownRight className="w-6 h-6 text-zinc-600 group-hover:text-white group-hover:-rotate-45 transition-all duration-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
