import dynamic from "next/dynamic";
import { ProjectHero } from "../components/project-hero";
import { client } from "@/sanity/lib/client";
import { projectQuery } from "@/sanity/queries/projectPage";
import { BackgroundLayer } from "@/components/background/background-layer";
import { Navbar } from "@/components/navbar/navbar";

const ProjectContent = dynamic(() =>
  import("../components/project-content").then((mod) => mod.ProjectContent),
);

const ProjectGallery = dynamic(
  () =>
    import("../components/project-gallery").then((mod) => mod.ProjectGallery),
  {
    loading: () => <div className="h-[500px] w-full" />, // Optional: Holds space while loading
  },
);

const ProjectProcess = dynamic(() =>
  import("../components/project-process").then((mod) => mod.ProjectProcess),
);

const ProjectImpact = dynamic(() =>
  import("../components/project-impact").then((mod) => mod.ProjectImpact),
);

const ProjectNavigation = dynamic(() =>
  import("../components/project-navigation").then(
    (mod) => mod.ProjectNavigation,
  ),
);

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
      <ProjectHero
        title={data.title}
        services={data.services ?? []}
        imageSrc={data.heroImage}
      />

      {/* CONTENT - Only render if sections exist */}
      {data.section1 && data.section2 && (
        <ProjectContent section1={data.section1} section2={data.section2} />
      )}

      {/* GALLERY - Pass data from Sanity */}
      <ProjectGallery data={data.gallery} />

      {/* PROCESS - Pass data from Sanity */}
      <ProjectProcess data={data.process} />

      {/* IMPACT - (You can add data props here later if you make this dynamic) */}
      <ProjectImpact data={data.impact} />

      {/* NAVIGATION */}
      <ProjectNavigation prev={data.prev} next={data.next} />
    </div>
  );
}
