import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Define the shape of the nav item
type NavItem = {
  title: string;
  slug: string;
};

interface ProjectNavigationProps {
  prev?: NavItem;
  next?: NavItem;
}

export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  // If there is only 1 project in the whole DB, hide navigation
  if (!prev || !next) return null;

  return (
    <section className="w-full px-6 md:px-12 py-24 flex justify-between items-center text-white">
      {/* PREVIOUS PROJECT */}
      {prev && (
        <Link
          href={`/projects/${prev.slug}`}
          className="
            group 
            flex flex-col items-start gap-1 
            px-6 py-4 
            border border-zinc-800 
            hover:border-white hover:bg-white/5 
            transition-all duration-300
          "
        >
          <div className="flex items-center gap-3 text-zinc-500 group-hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider">
              Prev Project
            </span>
          </div>
          <span className="text-lg md:text-xl font-medium text-white">
            {prev.title}
          </span>
        </Link>
      )}

      {/* NEXT PROJECT */}
      {next && (
        <Link
          href={`/projects/${next.slug}`}
          className="
            group 
            flex flex-col items-end gap-1 
            px-6 py-4 
            border border-zinc-800 
            hover:border-white hover:bg-white/5 
            transition-all duration-300
          "
        >
          <div className="flex items-center gap-3 text-zinc-500 group-hover:text-white transition-colors">
            <span className="text-xs font-mono uppercase tracking-wider">
              Next Project
            </span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <span className="text-lg md:text-xl font-medium text-white">
            {next.title}
          </span>
        </Link>
      )}
    </section>
  );
}