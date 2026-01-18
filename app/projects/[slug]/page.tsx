import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProjectView from "@/modules/projects/views/project.view";

// 1. Tell Next.js which slugs to pre-build (SSG)
export async function generateStaticParams() {
  // Fetch ALL project slugs from Sanity
  const projects = await client.fetch(groq`*[_type == "project"]{ "slug": slug.current }`);

  // Return an array of objects: [{ slug: 'project-1' }, { slug: 'project-2' }]
  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

// 2. Define Page Props
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 3. The Page Component
export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProjectView slug={resolvedParams.slug} />;
}