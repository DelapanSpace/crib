"use client";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useSynthClick } from "@/hooks/use-synth-click";

const CONTACT_DATA = [
  {
    name: "WhatsApp",
    icon: <IoLogoWhatsapp className="w-5 h-5" />,
    details: [
      {
        label: "+62-811-8889-2224",
        href: "https://wa.me/6281188892224?text=Let%27s%20discuss%21",
      },
      {
        label: "+62-877-8421-1834",
        href: "https://wa.me/6287784211834?text=Let%27s%20discuss%21",
      },
    ],
  },
  {
    name: "Instagram",
    icon: <AiFillInstagram className="w-5 h-5" />,
    details: [
      {
        label: "@delapan.space",
        href: "https://www.instagram.com/delapan.space/",
      },
    ],
  },
  {
    name: "Email",
    icon: <MdEmail className="w-5 h-5" />,
    details: [
      {
        label: "team.delapanspace@gmail.com",
        href: "mailto:team.delapanspace@gmail.com?subject=Potential%20Collaboration&body=Hello%20Delapan%20Space%2C%0A%0AI%20am%20interested%20in%20exploring%20potential%20collaboration%20opportunities%20with%20your%20team.",
      },
    ],
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="w-5 h-5" />,
    details: [{ label: "Delapan Space", href: "#" }],
  },
];

export function ContactGrid() {
  const { playClick } = useSynthClick();
  return (
    <TooltipProvider delayDuration={500}>
      <section className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
        <Card className="bg-black/10 border border-white/10 hover:border-white/30 transition-all duration-1000 ease-out p-6 w-fit">
          <div className="grid grid-cols-4 gap-6">
            {CONTACT_DATA.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <div
                    className="text-white hover:text-zinc-300 cursor-pointer transition-all duration-1000 ease-out hover:scale-105"
                    onMouseEnter={() => playClick()}
                  >
                    {item.icon}
                  </div>
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  className="bg-black text-white p-3 rounded-lg"
                  onMouseEnter={() => playClick()}
                >
                  <div className="flex flex-col gap-2">
                    {item.details.map((detail, idx) => (
                      <Link
                        key={idx}
                        href={detail.href}
                        target="_blank"
                        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-1000 ease-out"
                      >
                        {detail.label}
                      </Link>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </Card>
      </section>
    </TooltipProvider>
  );
}
