"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { ServiceCard } from "./service-card";

// 1. Data Structure (Unchanged)
const services = [
  {
    id: "01",
    title: "WEB DEVELOPMENT",
    description:
      "Custom, full-stack web solutions designed for speed and scalability. From responsive corporate sites to complex e-commerce platforms, we build secure digital foundations using modern frameworks like React, Next.js, and Node.",
    tags: "Full-Stack, E-commerce, CMS Integration, API Development, PWA",
    src: "/web-dev-2.jpg",
  },
  {
    id: "02",
    title: "UI/UX DESIGN",
    description:
      "Creating user-centric interfaces that convert. We combine deep user research with high-fidelity prototyping to deliver intuitive mobile and web experiences that align perfectly with your brand identity and accessibility standards.",
    tags: "User Research, Wireframing, Mobile App Design, Design Systems, Interaction Design",
    src: "/ui-ux-design.jpg",
  },
  {
    id: "03",
    title: "Social Media",
    description:
      "End-to-end social media management that turns followers into customers. We handle content creation, community engagement, and algorithmic strategies across Instagram, TikTok, and LinkedIn to maximize organic reach.",
    tags: "Content Creation, Community Management, Reels/TikTok Production, Copywriting, Social Strategy",
    src: "/social-media.jpg",
  },
  {
    id: "04",
    title: "Digital Marketing",
    description:
      "Performance-based marketing strategies focused on ROI. We optimize your sales funnel through targeted PPC, precision SEO, and data-driven ad campaigns across Google and Meta platforms to drive qualified leads.",
    tags: "Lead Generation, SEO, Google Ads (SEM), Meta Ads, Conversion Rate Optimization (CRO)",
    src: "/digmar.jpg",
  },
  {
    id: "05",
    title: "Brand Design",
    description:
      "Building memorable brand systems that tell your story. We deliver comprehensive visual identities, including logo suites, typography, and brand guidelines that ensure consistency across all customer touchpoints.",
    tags: "Visual Identity, Logo Design, Brand Guidelines, Rebranding, Corporate Stationery",
    src: "/brand-design.jpg",
  },
  {
    id: "06",
    title: "Photography",
    description:
      "Professional commercial and lifestyle photography that elevates your brand perception. We provide full-service production, from creative direction to high-end retouching, perfect for product catalogs and marketing collateral.",
    tags: "Product Photography, Lifestyle, Editorial, Art Direction, Post-Production",
    src: "/photography.jpg",
  },
  {
    id: "07",
    title: "KOL Management",
    description:
      "Connecting your brand with authentic influencers who drive action. We handle the entire campaign lifecycle—from vetting niche talent and contract negotiation to brief creation and performance tracking.",
    tags: "Influencer Marketing, Talent Vetting, Campaign Management, PR, UGC Strategy",
    src: "/kol-mgmt.jpg",
  },
  {
    id: "08",
    title: "360 Campaign",
    description:
      "Holistic marketing activations that bridge the digital and physical worlds. We orchestrate omni-channel strategies combining OOH, digital media, and events to deliver a unified and impactful brand message.",
    tags: "Omni-channel Strategy, Media Buying, Creative Direction, OOH & Activations, Event Management",
    src: "/360camp.jpg",
  },
];

export function ServiceList() {
  const containerRef = useRef<HTMLDivElement>(null);

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "8Space Services",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      serviceType: service.tags,
      image: service.src,
    })),
  };

  // Scroll Logic
  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth;
      containerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="services"
      className="relative w-full max-h-[1000px] text-black py-0 flex flex-col justify-center overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full h-[80vh] relative group/container">
        {/* Navigation Arrows (Visible if items > 4) */}
        {services.length > 4 && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-all opacity-0 group-hover/container:opacity-100 disabled:opacity-0"
              aria-label="Scroll Left"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-all opacity-0 group-hover/container:opacity-100"
              aria-label="Scroll Right"
            >
              <ArrowRight size={24} />
            </button>
          </>
        )}

        {/* Horizontal Scroll Container */}
        <div
          ref={containerRef}
          className="flex w-full h-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-0"
        >
          {services.map((service) => (
            // Render the isolated component
            <ServiceCard key={service.id} data={service} />
          ))}
        </div>
      </div>

      {/* CSS Utilities for 3D Flip */}
      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
