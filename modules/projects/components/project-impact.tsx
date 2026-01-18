"use client";

// Define the shape of the data coming from Sanity
export type ImpactStat = {
  _key: string;
  value: string;
  label: string;
};

interface ProjectImpactProps {
  data?: ImpactStat[];
}

export function ProjectImpact({ data }: ProjectImpactProps) {
  // If no data exists in Sanity, hide this section entirely
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-6 md:px-12 py-24">
      <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24">
        {data.map((stat) => (
          <div key={stat._key} className="flex flex-col items-center text-center">
            <h3 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-2">
              {stat.value}
            </h3>
            <p className="text-zinc-400 uppercase tracking-widest text-sm font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}