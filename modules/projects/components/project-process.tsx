import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ProcessStep = {
  title: string;
  desc: string;
  _key?: string;
};

interface ProjectProcessProps {
  data?: ProcessStep[];
}

export function ProjectProcess({ data }: ProjectProcessProps) {
  // If no process steps are found, hide the section entirely
  if (!data || data.length === 0) return null;

  return (
    <section className="w-full px-6 md:px-12 py-24">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="flex flex-col text-4xl md:text-6xl font-medium text-white uppercase tracking-tighter mb-16 items-center text-center md:text-left">
          The Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((step, i) => (
            <Card
              key={step._key || i}
              className="
                group h-[400px] flex flex-col justify-between 
                bg-black border border-zinc-800 
                hover:bg-zinc-900 hover:border-zinc-600 
                transition-all duration-500 rounded-none
              "
            >
              <CardHeader>
                <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors mb-2">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
              </CardHeader>
              <CardContent className="pb-8">
                <CardTitle className="text-2xl font-medium mb-4 uppercase text-white">
                  {step.title}
                </CardTitle>
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                  {step.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}