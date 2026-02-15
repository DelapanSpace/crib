// components/transition/transition-link.tsx
"use client";

import { useTransition } from "@/providers/transition-context-provider";
import { useRouter } from "next/navigation";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const { navigate, isTransitioning } = useTransition();
  const router = useRouter();

  return (
    <a                                              // ← this was missing
      href={href}
      className={className}
      onMouseEnter={() => router.prefetch(href)}
      onClick={(e) => {
        e.preventDefault();
        if (!isTransitioning) navigate(href);
      }}
    >
      {children}
    </a>
  );
}