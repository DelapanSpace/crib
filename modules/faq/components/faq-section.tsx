"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Are you a white-label or whitelist creative agency?",
    answer:
      "Yes. We operate as a whitelist creative agency, supporting agencies, companies, and enterprises behind the scenes. Our role is to strengthen your delivery without taking visibility or ownership away from your brand. We adapt to your workflows, communication style, and brand standards, acting as a seamless extension of your internal or client-facing team.",
  },
  {
    question: "Where is your agency based?",
    answer:
      "We are a Jakarta-based creative agency with experience working on both local and international projects. Being based in Jakarta allows us to offer strong regional insight while maintaining global delivery standards expected by international agencies and enterprise clients.",
  },
  {
    question: "Do you work with international or overseas clients?",
    answer:
      "Yes. We regularly collaborate with international agencies, overseas companies, and cross-border teams. Our processes are built for international collaboration, including remote workflows, structured documentation, and clear time zone coordination. This allows us to deliver consistent quality regardless of geographic location.",
  },
  {
    question: "What industries and clients do you typically support?",
    answer:
      "We work with creative agencies, corporate teams, startups preparing to scale, and enterprise-level organizations. Many of our clients engage us as a whitelist partner to handle design, development, and marketing execution while they focus on strategy, sales, or client management.",
  },
  {
    question:
      "Can your services be fully white-labeled under our agency brand?",
    answer:
      "Absolutely. All of our services can be delivered under your agency or company name. We do not appear in client-facing communication unless requested. This makes us an ideal whitelist partner for agencies looking to scale capacity, enter new service areas, or handle international projects without expanding internal teams.",
  },
  {
    question: "Do you support long-term or retainer-based collaborations?",
    answer:
      "Yes. Many agencies and enterprises work with us on long-term retainers. This model enables deeper brand understanding, faster turnaround times, and consistent execution across multiple projects. Retainer partnerships are especially effective for agencies managing recurring client workloads or international campaigns.",
  },
  {
    question: "How do we start a collaboration with your agency?",
    answer:
      "We begin with a strategic discussion to understand your goals, scope, and preferred collaboration model. From there, we recommend a project-based or retainer engagement tailored to your needs. Our onboarding process is structured, efficient, and designed to integrate quickly into your existing systems.",
  },
  {
    question: "How do you handle confidentiality and NDAs?",
    answer:
      "Confidentiality is a standard part of our operation. We are experienced in working under NDAs, whitelist agreements, and restricted disclosure arrangements. All project assets, strategies, and communications are handled with strict confidentiality, which is essential for agency and enterprise partnerships.",
  },
  {
    question: "Can you collaborate with our internal team or other vendors?",
    answer:
      "Yes. We are designed to collaborate smoothly with internal teams, external vendors, and third-party partners. Whether we work alongside your designers, developers, marketers, or project managers, our goal is alignment, efficiency, and consistent output across all stakeholders.",
  },
  {
    question: "What makes your agency different from other creative agencies?",
    answer:
      "Unlike many traditional creative agencies, we specialize in whitelist and white-label collaboration. Our focus is not self-promotion, but scalable execution, strategic alignment, and reliability. Combined with our Jakarta base and international project experience, we bridge local expertise with global delivery expectations.",
  },
];

export function FaqSection() {
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
              Frequently A.Q
              <ArrowUpRight className="w-12 h-12 md:w-16 md:h-16 stroke-[1.5]" />
            </h1>
          </div>
        </div>

        {/* Accordion List */}
        <div className="border-t border-gray-200">
          {FAQ_ITEMS.map((item, index) => {
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
