"use client";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSynthClick } from "@/hooks/use-synth-click";
import { HelpCircle } from "lucide-react";
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
      <section className="w-full flex flex-col items-center justify-center px-6 relative">

        <Card className="bg-black/10 border border-white/10 hover:border-white/30 transition-all duration-1000 ease-out p-6 w-fit">
          <div className="grid grid-cols-4 gap-6">
            {data.contactMethods.map((item) => {
              // 4. LOGIC: Use 'item.name' to find the icon
              // We lowercase it so "WhatsApp" matches "whatsapp" in our map
              const key = item.name.toLowerCase().trim();
              const IconComponent = ICON_MAP[key] || HelpCircle;
              
              const primaryLink = item.details[0]?.href || "#"

              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={primaryLink}
                      target="_blank"
                      className="text-white hover:text-zinc-300 cursor-pointer transition-all duration-1000 ease-out hover:scale-105 flex items-center justify-center" 
                      onMouseEnter={() => playClick()}
                    >
                      <IconComponent className="w-5 h-5" />
                    </Link>
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
