"use client";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSynthClick } from "@/hooks/use-synth-click";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

// 1. MAP: Keys are lowercase so we can match any casing coming from DB
const ICON_MAP: Record<string, React.ElementType> = {
  whatsapp: IoLogoWhatsapp,
  instagram: AiFillInstagram,
  email: MdEmail,
  linkedin: FaLinkedin,
};

// 2. TYPES: Removed 'iconName' since we don't need it from DB anymore
type ContactDetail = {
  label: string;
  href: string;
};

type ContactMethod = {
  name: string;
  details: ContactDetail[];
};

type ContactPageData = {
  pageTitle: string;
  contactMethods: ContactMethod[];
};

type ContactGridProps = {
  data?: ContactPageData;
};

// 3. MOCK DATA: Removed 'iconName' here too
const MOCK_DATA: ContactPageData = {
  pageTitle: "Contact Us",
  contactMethods: [
    {
      name: "WhatsApp",
      details: [{ label: "+62-811-8889-2224", href: "#" }],
    },
    {
      name: "Instagram",
      details: [{ label: "@delapan.space", href: "#" }],
    },
    {
      name: "Email",
      details: [{ label: "team@delapan.space", href: "mailto:..." }],
    },
  ],
};

export function ContactGrid({ data = MOCK_DATA }: ContactGridProps) {
  const { playClick } = useSynthClick();

  // Safety check if data is null/undefined
  if (!data?.contactMethods) return null;

  return (
    <TooltipProvider delayDuration={500}>
      <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
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

        <Card className="bg-black/10 border border-white/10 hover:border-white/30 transition-all duration-1000 ease-out p-6 w-fit">
          <div className="grid grid-cols-4 gap-6">
            {data.contactMethods.map((item) => {
              // 4. LOGIC: Use 'item.name' to find the icon
              // We lowercase it so "WhatsApp" matches "whatsapp" in our map
              const key = item.name.toLowerCase().trim();
              const IconComponent = ICON_MAP[key] || HelpCircle;

              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <div
                      className="text-white hover:text-zinc-300 cursor-pointer transition-all duration-1000 ease-out hover:scale-105"
                      onMouseEnter={() => playClick()}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </TooltipTrigger>

                  <TooltipContent
                    side="top"
                    className="bg-black text-white p-3 rounded-lg border-white/10"
                    onMouseEnter={() => playClick()}
                  >
                    <div className="flex flex-col gap-2">
                      {/* <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
                        {item.name}
                      </p> */}
                      {item.details.map((detail, idx) => (
                        <Link
                          key={idx}
                          href={detail.href}
                          target="_blank"
                          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300"
                        >
                          {detail.label}
                        </Link>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </Card>
      </section>
    </TooltipProvider>
  );
}
