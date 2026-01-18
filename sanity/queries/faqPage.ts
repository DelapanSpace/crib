import { groq } from "next-sanity";

export const faqPageQuery = groq`
*[_type == "faqPage"][0]{
  pageTitle,
  faqItems[] {
    question,
    answer
  }
}
`;