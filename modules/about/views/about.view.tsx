import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/queries/aboutPage";
import { AboutCTA } from "../components/about-cta";
import { AboutHero } from "../components/about-hero";
import { AboutProcess } from "../components/about-process";
import { AboutStory } from "../components/about-story";
import { SpaceAudio } from "@/components/background/space-audio";

export default async function AboutView() {
  const data = await client.fetch(aboutPageQuery)
  return (
    <div className="relative w-full min-h-screen bg-black">

      <main className="w-full">
        {/* Hero Section */}
        <AboutHero data={data} />
        <SpaceAudio/>
        {/* Content Section */}
        <AboutStory data={data} />
        <AboutProcess data={data.process}/>
        <AboutCTA/>
      </main>
    </div>
  );
}
