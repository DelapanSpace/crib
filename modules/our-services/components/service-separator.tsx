// components/services/service-separator.tsx
"use client";

import { motion } from "framer-motion";

export function ServiceSeparator() {
  return (
    <section className="w-full bg-black px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.04, 0.62, 0.23, 0.98] }}
          viewport={{ once: true }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center"
        />
      </div>
    </section>
  );
}