import { groq } from "next-sanity";

export const aboutPageQuery = groq`
*[_type == "aboutPage"][0]{
heroTitle,
heroImage,
storyNumber,
storyTitle,
storyParagraphs,
process {
      title,
      steps[] {
        id,
        title,
        description
      }
    }
}
`;
