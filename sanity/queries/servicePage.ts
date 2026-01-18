import { groq } from "next-sanity";

export const servicePageQuery = groq`
*[_type == "servicePage"][0]{
  pageTitle,
  pageSubtitle,
  services[]{
    label,
    type,
    description
  }
}
`;