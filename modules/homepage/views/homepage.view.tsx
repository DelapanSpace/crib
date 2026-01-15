import { HomeText } from "../components/home-text";
// import { HomeCard } from "../components/home-card";

export default function HomepageView() {
  return (
    <div className="min-h-screen bg-black flex items-center p-8">
      <div className="w-full">
        <div className="flex justify-start">
          <HomeText />
        </div>
      </div>
    </div>
  );
}