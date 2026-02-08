"use client";

import { useSynthClick } from "@/hooks/use-synth-click";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/modules/homepage/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Changed to named imports
import AnimatedLogo from "../animatedLogo";

export function Navbar() {
  const router = useRouter();
  const { playClick } = useSynthClick();
  const [isScrolled, setIsScrolled] = useState(false);

  // PERFORMANCE FIX: Optimized Scroll Listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only update state if the value actually changes to prevent re-renders
          const shouldBeScrolled = window.scrollY > 20;
          setIsScrolled((prev) => {
            if (prev !== shouldBeScrolled) {
              return shouldBeScrolled;
            }
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProjectClick = (project: string) => {
    const slug = project.toLowerCase().replace(/\s+/g, "-");
    router.push(`/projects/${slug}`);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // Removed 'href' so it is purely a dropdown trigger
    { name: "Projects", isDropdown: true },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b will-change-transform", // will-change helps browser optimization
        isScrolled
          ? "bg-black/40 backdrop-blur-xl border-white/5 py-5"
          : "bg-transparent border-transparent py-8",
      )}
    >
      <div className="w-full px-8 md:px-12 flex items-center justify-between">
        {/* LOGO (Left) */}
        <Link href="/" className="relative z-50 group">
          <div className="flex items-center gap-3">
            <span className="text-white text-mono font-extrabold text-lg tracking-widest uppercase opacity-90 group-hover:opacity-100 transition-opacity">
              8Space
            </span>
            <div className="rotate-90 h-12 w-12">
            <AnimatedLogo/>
            </div>
          </div>
        </Link>

        {/* CUSTOM NAVIGATION (Right) */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-10">
            {navItems.map((item) => {
              // --- DROPDOWN ITEM (PROJECTS) ---
              if (item.isDropdown) {
                return (
                  <li
                    key={item.name}
                    className="group relative h-full flex items-center"
                  >
                    {/* Trigger: Changed to <span> with cursor-default. 
                       No onClick, no router.push. 
                    */}
                    <span className="relative py-2 text-[15px] font-medium tracking-wide text-white/80 hover:text-white transition-colors uppercase cursor-default">
                      {item.name}
                      {/* Active Dot indicator on hover */}
                      <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-white group-hover:w-1/2 transition-all duration-300 -translate-x-1/2" />
                    </span>

                    {/* DROPDOWN CONTAINER */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top z-50">
                      {/* THE CARD */}
                      <div
                        className="w-[450px] rounded-xl overflow-hidden p-2
                        bg-black/40 backdrop-blur-3xl backdrop-saturate-150
                        border border-white/20 shadow-2xl"
                      >
                        <ul className="grid grid-cols-2 gap-2 p-1">
                          {PROJECTS.map((project) => (
                            <li
                              key={project}
                              className="group/item flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200"
                              onMouseEnter={() => playClick()}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProjectClick(project);
                              }}
                            >
                              <span className="text-sm font-medium text-white/80 group-hover/item:text-white transition-colors truncate">
                                {project}
                              </span>
                              <span className="text-[10px] text-white/30 opacity-0 group-hover/item:opacity-100 transition-all transform translate-x-[-10px] group-hover/item:translate-x-0 duration-300">
                                ↗
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              }

              // --- STANDARD ITEM ---
              return (
                <li key={item.name}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="relative py-2 text-[15px] font-medium tracking-wide text-white/80 hover:text-white transition-colors uppercase group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-white group-hover:w-1/2 transition-all duration-300 -translate-x-1/2" />
                    </Link>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
