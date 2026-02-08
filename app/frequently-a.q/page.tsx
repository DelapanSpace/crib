import FaqView from "@/modules/faq/views/faq.view";

export const metadata = {
  title: "Frequently Asked Questions | 8Space",
  description: "Common questions about our white-label creative agency services.",
};

export const revalidate = 3600

export default function FaqPage() {
  return <FaqView />;
}