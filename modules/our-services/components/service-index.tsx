// components/services/service-flow.tsx
"use client";

import { ServiceHero } from "./service-hero";
import { ServiceIntro } from "./service-intro";
import { ServiceList } from "./service-list";
import { ServiceSeparator } from "./service-separator";
import { ServiceApproach } from "./service-approach";
import { AboutCTA } from "@/modules/about/components/about-cta";

export function ServiceFlow() {
  return (
    <>
      <ServiceHero />
      <ServiceIntro />
      <ServiceApproach />
      <ServiceList />
      <AboutCTA />
    </>
  );
}