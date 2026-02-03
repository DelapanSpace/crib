"use client";

import dynamic from "next/dynamic";

// 1. EAGER LOAD (Normal Import)
// We want this to show up instantly for SEO and speed (LCP)
import { ServiceIntro } from "./service-intro"; 

// 2. LAZY LOAD (Dynamic Imports)
// These are heavy or off-screen, so we load them later
const ServiceApproach = dynamic(() => 
  import("./service-approach").then((mod) => mod.ServiceApproach), {
    loading: () => <div className="min-h-[50vh] bg-black" /> // Optional placeholder prevents layout shift
});

const ServiceList = dynamic(() => 
  import("./service-list").then((mod) => mod.ServiceList));

const ServiceCTA = dynamic(() => 
  import("./service-cta").then((mod) => mod.ServiceCTA));

export function ServiceFlow() {
  return (
    <>
      <ServiceIntro />      {/* Starts downloading immediately */}
      <ServiceApproach />   {/* Downloads separately */}
      <ServiceList />       {/* Downloads separately */}
      <ServiceCTA />        {/* Downloads separately */}
    </>
  );
}