interface SectionData {
  header: string;
  paragraphs: string[];
}

interface ProjectContentProps {
  section1: SectionData;
  section2: SectionData;
}

export function ProjectContent({ section1, section2 }: ProjectContentProps) {
  return (
    <section className="w-full text-white px-6 md:px-12 py-12">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-32 md:gap-20">
        
        {/* BLOCK 1: Aligned LEFT */}
        <div className="flex flex-col items-start text-left w-full">
          <h3 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter mb-3">
            {section1.header}
          </h3>
          <div className="max-w-2xl space-y-6 text-lg md:text-xl text-white leading-relaxed font-light">
            {section1.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* BLOCK 2: Aligned RIGHT */}
        <div className="flex flex-col items-end text-right w-full">
          <h3 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter mb-3">
            {section2.header}
          </h3>
          <div className="max-w-2xl space-y-6 text-lg md:text-xl text-white leading-relaxed font-light">
            {section2.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}