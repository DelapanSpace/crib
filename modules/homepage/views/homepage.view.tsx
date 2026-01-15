import { HomeText } from "../components/home-text";
import { WORDS } from "../utils";

export default function HomepageView() {
  return (
    <div className="relative w-full bg-black min-h-screen">
      <section className="sr-only">
        <h1>Selected Projects & Brands</h1>
        <ul>
          {WORDS.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </section>

      <div className="fixed inset-0 z-10 flex items-center pl-20 pointer-events-none">
        <div className="w-full pointer-events-auto">
          <div className="flex justify-start">
            <HomeText />
          </div>
        </div>
      </div>

      {/* Scroll Spacer */}
      <div style={{ height: "800vh", position: "relative", zIndex: 1 }} />
    </div>
  );
}