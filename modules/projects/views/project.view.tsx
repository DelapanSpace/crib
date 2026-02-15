import { BackgroundLayer } from "@/components/background/background-layer";
import { Navbar } from "@/components/navbar/navbar";
import { client } from "@/sanity/lib/client";
import { projectQuery } from "@/sanity/queries/projectPage";
import { Suspense } from "react";
import { ProjectContent } from "../components/project-content";
import { ProjectGallery } from "../components/project-gallery";
import { ProjectHero } from "../components/project-hero";
import { ProjectImpact } from "../components/project-impact";
import { ProjectNavigation } from "../components/project-navigation";
import { ProjectProcess } from "../components/project-process";

// The View now expects a direct string, not the params object
interface ProjectViewProps {
  slug: string;
}

export default async function ProjectView({ slug }: ProjectViewProps) {
  // Safety Check
  if (!slug) {
    return <div className="text-white p-12">Error: No slug provided</div>;
  }

  // Use the slug directly
  const data = await client.fetch(projectQuery, {
    slug: slug,
  });

  if (!data) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center text-white">
        <h1 className="text-2xl font-mono uppercase">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <BackgroundLayer />
      {/* HERO */}
      <Navbar />
      <Suspense fallback={<div className="h-screen w-full bg-zinc-950 animate-pulse" />}>
        <ProjectHero slug={slug} />
      </Suspense>

      {/* CONTENT - Only render if sections exist */}
      {data.section1 && data.section2 && (
        <ProjectContent section1={data.section1} section2={data.section2} />
      )}

      {/* GALLERY - Pass data from Sanity */}
      <Suspense fallback={<div className="h-[400px] w-full bg-zinc-900 animate-pulse" />}>
        {/* Pass the SLUG so the component can fetch its own data */}
        <ProjectGallery slug={slug} />
      </Suspense>

      {/* PROCESS - Pass data from Sanity */}
      <ProjectProcess data={data.process} />

      {/* IMPACT - (You can add data props here later if you make this dynamic) */}
      <ProjectImpact data={data.impact} />

      {/* NAVIGATION */}
      <ProjectNavigation prev={data.prev} next={data.next} />
    </div>
  );
}
