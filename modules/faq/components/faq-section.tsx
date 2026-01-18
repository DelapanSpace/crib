"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSectionData = {
  pageTitle: string;
  faqItems: FaqItem[];
};

type FaqSectionProps = {
  data: FaqSectionData;
};

export function FaqSection({ data }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  return (
    <section className="w-full min-h-screen text-white bg-black px-6 md:px-12 py-24">
      <Link
        href="/"
        aria-label="Back to home"
        className="
        absolute
        top-4 left-4
        md:top-8 md:left-8
        z-20
        w-10 h-10 md:w-12 md:h-12
        rounded-full
        border border-white/60
        flex items-center justify-center
        backdrop-blur-sm
        hover:border-white
        hover:bg-white/10
        transition
      "
      >
        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </Link>
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 md:mb-10">
          <div className="max-w-xs" />

          <div className="mt-8 md:mt-0">
            <h1 className="text-6xl md:text-8xl flex items-start gap-4">
              {data.pageTitle}
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16 stroke-[1.5]" />
            </h1>
          </div>
        </div>

        {/* Accordion List */}
        <div className="border-t border-gray-200">
          {data.faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b border-gray-200 group cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="py-8 md:py-10 flex justify-between items-center">
                  <h3 className="text-xl md:text-3xl font-medium uppercase tracking-tight">
                    {item.question}
                  </h3>
                  <div className="pl-4">
                    {isOpen ? (
                      <X className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 rotate-90" />
                    ) : (
                      <Plus className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-90" />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 md:pb-12 flex flex-col md:flex-row">
                        {/* Empty left spacer to push content to the right (50% width) */}
                        <div className="hidden md:block w-1/2" />

                        {/* Content on the right */}
                        <div className="w-full md:w-1/2">
                          <p className="text-white text-lg md:text-xl leading-relaxed max-w-xl">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
