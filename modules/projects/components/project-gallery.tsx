import { client } from "@/sanity/lib/client";
import { galleryQuery } from "@/sanity/queries/projects/project-gallery";
import { ProjectGalleryAnimate } from "./gallery-animate";

// Server Component
export async function ProjectGallery({ slug }: { slug: string }) {
  // 4. SLOW FETCH: Happens independently without blocking the hero
  const data = await client.fetch(galleryQuery, { slug });
  
  // Guard clause: If no gallery, return nothing
  if (!data?.gallery) return null;

  // 5. Pass data to the Client Component that handles the Framer Motion stuff
  return <ProjectGalleryAnimate data={data.gallery} />;
}