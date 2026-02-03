import { AboutCTA } from "@/modules/about/components/about-cta";
import { ServiceApproach } from "./service-approach";
import { ServiceIntro } from "./service-intro";
import { ServiceList } from "./service-list";
import { ServiceCTA } from "./service-cta";

export function ServiceFlow() {
  return (
    <>
      <ServiceIntro />
      <ServiceApproach />
      <ServiceList />
      <ServiceCTA />
    </>
  );
}