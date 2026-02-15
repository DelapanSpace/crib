// components/project-hero-async.tsx
import { client } from "@/sanity/lib/client";
import { projectHeroQuery } from "@/sanity/queries/projects/project-hero";
import { HeroComp } from "./hero-comp";

export async function ProjectHero({ slug }: { slug: string }) {
  const data = await client.fetch(projectHeroQuery, { slug });

  if (!data) return null;

  return (
    <HeroComp
      title={data.title}
      services={data.services ?? []}
      heroImage={data.heroImage}
    />
  );
}