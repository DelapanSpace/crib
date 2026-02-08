"use client";

import { motion, Variants } from "framer-motion";
import {
  ArrowDownRight,
  Circle,
  Hexagon,
  Square,
  Triangle,
} from "lucide-react";
import { TiltCard } from "./utils";

const principles = [
  {
    id: "01",
    title: "Simplifying Complexity for Impact",
    description:
      "We believe that the most effective digital solutions are often the simplest. We cut through the noise to deliver clear, intuitive, and user-friendly experiences that solve real business problems without unnecessary clutter.",
    icon: Circle,
  },
  {
    id: "02",
    title: "Scalable, Future-Proof Foundations",
    description:
      "We don't just build for today; we engineer for your tomorrow. Our solutions use robust, adaptable architectures designed to grow alongside your business, ensuring long-term ROI and minimizing technical debt.",
    icon: Square,
  },
  {
    id: "03",
    title: "Transparent, Agile Partnership",
    description:
      "We operate as an extension of your team, not just a vendor. You get full visibility into our process with open communication lines, regular updates, and honest advice that prioritizes your success over our convenience.",
    icon: Hexagon,
  },
  {
    id: "04",
    title: "Precision & Uncompromising Quality",
    description:
      "True excellence lies in the details others overlook. From pixel-perfect design to optimized code, we refine every micro-interaction to ensure your brand projects professionalism and earns immediate user trust.",
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
    <section className="w-full max-h-[1000px] text-white px-6 md:px-12 flex items-start pt-10 pb-15">
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Header */}
        <div className="mb-16 md:mb-8">
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
              <motion.div
                key={index}
                variants={cardVariants}
                className="h-full"
              >
                <TiltCard className="group h-full">
                  {/* 1. Glow Behind Card (From ServiceIntro) */}
                  <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-md" />

                  {/* 2. GLASS CARD CONTAINER */}
                  <div className="relative h-full flex flex-col justify-between rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl overflow-hidden">
                    {/* Top Shine (From ServiceIntro) */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />

                    {/* Inner Content */}
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      {/* Top: Icon */}
                      <div className="mb-8">
                        <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-black/20 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-500">
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
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
