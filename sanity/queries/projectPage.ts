import { groq } from "next-sanity";

export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    "heroImage": heroImage.asset->url,
    services,
    section1,
    section2,
    // Fetch gallery images properly
    gallery[]{
      title,
      "imageUrl": image.asset->url
    },
    process,
    impact[]{
      value,
      label,
      _key
      },
    publishedAt,
    "prev": coalesce(
      *[_type == "project" && title < ^.title] | order(title desc)[0]{ 
        title, 
        "slug": slug.current 
      },
      *[_type == "project"] | order(title desc)[0]{ 
        title, 
        "slug": slug.current 
      }
    ),

    "next": coalesce(
      *[_type == "project" && title > ^.title] | order(title asc)[0]{ 
        title, 
        "slug": slug.current 
      },
      *[_type == "project"] | order(title asc)[0]{ 
        title, 
        "slug": slug.current
}
    )
  }
`;
