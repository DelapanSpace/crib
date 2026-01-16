import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="w-full h-[100vh] flex items-center justify-center bg-white">
      <Link 
        href="/contact" 
        className="group relative inline-flex items-center gap-3 px-8 py-4 text-2xl md:text-4xl font-medium uppercase tracking-tight text-black border border-black hover:bg-black hover:text-white transition-all duration-500 ease-out"
      >
        <span>Click here</span>
        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform duration-500" />
      </Link>
    </section>
  );
}