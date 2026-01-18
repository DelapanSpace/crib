import { client } from "@/sanity/lib/client";
import { faqPageQuery } from "@/sanity/queries/faqPage";
import { FaqSection } from "../components/faq-section";

export default async function FaqView() {
  const data = await client.fetch(faqPageQuery);
  return (
    // Force white background for this page
    <div className="relative w-full min-h-screen">
      <main className="w-full">
        <FaqSection data={data} />
      </main>
    </div>
  );
}
