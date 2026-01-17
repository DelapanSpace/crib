import { FaqSection } from "../components/faq-section";

export default function FaqView() {
  return (
    // Force white background for this page
    <div className="relative w-full min-h-screen">

      <main className="w-full">
        <FaqSection />
      </main>
    </div>
  );
}