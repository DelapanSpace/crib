// sanity/queries/project-gallery.ts
import { groq } from "next-sanity";

export const galleryQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    // We ONLY want the gallery here
    gallery[]{
      title,
      image, // The full image object
      _key
    }
  }
`;