type AboutStoryProps = {
  data: {
    storyNumber: string;
    storyTitle: string;
    storyParagraphs: string[];
  };
};
export function AboutStory({ data }: AboutStoryProps) {
  return (
    <section className="bg-white text-black w-full py-24 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        {/* Left Column: Heading & Number */}
        <div className="md:col-span-5 flex items-start gap-4">
          <span className="rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center text-xs text-gray-500 font-mono mt-2">
            {data.storyNumber}
          </span>
          <h2 className="text-6xl md:text-8xl font-medium tracking-tight leading-none">
            {data.storyTitle}
          </h2>
        </div>

        {/* Right Column: Paragraphs */}
        <div className="md:col-span-7 flex flex-col gap-8 text-lg md:text-xl leading-relaxed text-gray-800 font-light">
          {data.storyParagraphs.map((text, i) => (
            <p key={i} className={i === 0 ? "" : "text-gray-400"}>
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
