"use client";
import { TiltCard } from "@/modules/our-services/components/utils";
import { motion, Variants } from "framer-motion";

export type AboutProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type AboutProcessSection = {
  title: string;
  steps: AboutProcessStep[];
};

type AboutProcessProps = {
  data: AboutProcessSection;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function AboutProcess({ data }: AboutProcessProps) {
  const steps = data.steps;
  const step1 = steps[0];
  const step2 = steps[1];
  const remainingSteps = steps.slice(2, 5);
  return (
    <section className="w-full bg-black text-white py-24 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* SINGLE GRID - Guarantees perfect alignment between rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Step 01 */}
          <ProcessCard step={step1} index={0} />

          {/* 2. Step 02 */}
          <ProcessCard step={step2} index={1} />

          {/* 3. TITLE BLOCK (Placed as the 3rd item in the grid) */}
          {/* This ensures it takes exactly 1/3 width and aligns with the column below it */}
          <div className="hidden lg:flex flex-col justify-center items-end h-[500px]">
            <h2 className="text-5xl md:text-[6.5rem] font-medium leading-[0.9] tracking-tighter text-right uppercase">
              {data.title.split(" ")[0]} <br />
              {data.title.split(" ").slice(1).join(" ")}
            </h2>
          </div>

          {/* Mobile Title Fallback (Visible only on small screens) */}
          <div className="lg:hidden col-span-1 md:col-span-2 py-12">
            <h2 className="text-8xl font-medium leading-[0.9] tracking-tighter uppercase">
              {data.title}
            </h2>
          </div>

          {/* 4. Remaining Steps (Row 2) */}
          {remainingSteps.map((step, i) => (
            <ProcessCard key={step.id} step={step} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Reusable Card Component
function ProcessCard({
  step,
  index,
}: {
  step: AboutProcessStep;
  index: number;
}) {
  return (
    <motion.div variants={cardVariants} className="h-full">
      <TiltCard className="group h-[450px] w-full">
        {/* 1. Glow Behind Card */}
        <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-md" />

        {/* 2. GLASS CARD CONTAINER */}
        <div className="relative h-full flex flex-col justify-between rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl overflow-hidden">
          {/* Top Shine */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />

          {/* Inner Content - Preserving Position & Composition */}
          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Header Area */}
            <div>
              <span className="text-lg font-mono text-zinc-500 group-hover:text-white mb-4 block transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-3xl text-zinc-200 group-hover:text-white font-normal leading-tight transition-colors duration-300">
                {step.title}
              </h3>
            </div>

            {/* Bottom Content Area */}
            <div>
              {/* Animated Divider Line (Mirrored from ServiceApproach) */}
              <div className="w-full h-px bg-white/10 mb-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
              </div>

              <p className="text-zinc-500 group-hover:text-zinc-300 leading-relaxed transition-colors duration-300">
                {step.description}
              </p>
            </div>
          </div>

          {/* Inner Blur Decoration (Subtle Blob) */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
        </div>
      </TiltCard>
    </motion.div>
  );
}
