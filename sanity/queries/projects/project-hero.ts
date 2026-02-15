// sanity/queries/project-hero.ts
import { groq } from "next-sanity";

export const projectHeroQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    heroImage,
    services
  }
`;