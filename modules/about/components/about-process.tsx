import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type AboutProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type AboutProcessSection = {
  title: string;
  steps: AboutProcessStep[];
};

type AboutProcessProps = {
  data: AboutProcessSection;
};

// const STEPS = [
//   {
//     id: "01",
//     title: "Context Before Craft",
//     description:
//       "Every engagement begins with understanding the full context. We study business objectives, audiences, constraints, and existing systems to ensure the work is grounded in real operational needs.",
//   },
//   {
//     id: "02",
//     title: "Direction With Intent",
//     description:
//       "Insights are translated into a clear creative and strategic direction. Scope, priorities, and boundaries are defined early to maintain alignment and focus throughout execution.",
//   },
//   {
//     id: "03",
//     title: "Ideas Into Systems",
//     description:
//       "Concepts are developed as scalable systems rather than isolated outputs. This approach ensures consistency, efficiency, and adaptability across platforms and long-term use.",
//   },
//   {
//     id: "04",
//     title: "Execution With Precision",
//     description:
//       "Creative direction becomes tangible output through disciplined execution. We focus on clarity, performance, and craft to ensure every deliverable meets professional and technical standards.",
//   },
//   {
//     id: "05",
//     title: "Delivery With Continuity",
//     description:
//       "Delivery is handled as a structured handover, not a conclusion. Assets, documentation, and context are prepared to support seamless integration, scaling, or ongoing collaboration.",
//   },
// ];

export function AboutProcess({data}: AboutProcessProps) {
  const steps = data.steps;
  const step1 = steps[0];
  const step2 = steps[1];
  const remainingSteps = steps.slice(2, 5);
  return (
    <section className="w-full bg-black text-white py-24 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* SINGLE GRID - Guarantees perfect alignment between rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Step 01 */}
          <ProcessCard step={step1} index={0} />

          {/* 2. Step 02 */}
          <ProcessCard step={step2} index={1} />

          {/* 3. TITLE BLOCK (Placed as the 3rd item in the grid) */}
          {/* This ensures it takes exactly 1/3 width and aligns with the column below it */}
          <div className="hidden lg:flex flex-col justify-center items-end h-[500px]">
            <h2 className="text-5xl md:text-[6.5rem] font-medium leading-[0.9] tracking-tighter text-right uppercase">
              {data.title.split(" ")[0]} <br />
              {data.title.split(" ").slice(1).join(" ")}
            </h2>
          </div>

          {/* Mobile Title Fallback (Visible only on small screens) */}
          <div className="lg:hidden col-span-1 md:col-span-2 py-12">
            <h2 className="text-8xl font-medium leading-[0.9] tracking-tighter uppercase">
              {data.title}
            </h2>
          </div>

          {/* 4. Remaining Steps (Row 2) */}
          {remainingSteps.map((step, i) => (
            <ProcessCard key={step.id} step={step} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Reusable Card Component
function ProcessCard({
  step,
  index,
}: {
  step: AboutProcessStep;
  index: number;
}) {
  return (
    <Card className="group bg-zinc-800 border-zinc-800 h-[500px] w-full flex flex-col justify-between hover:bg-stone-300 transition-colors duration-850 ease-out">
      <CardHeader className="p-8">
        <span className="text-lg font-mono text-zinc-800 group-hover:text-zinc-800 mb-4 block transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <CardTitle className="text-3xl text-zinc-800 group-hover:text-zinc-800 font-normal leading-tight transition-colors duration-300">
          {step.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8 pt-0">
        <p className="text-zinc-800 group-hover:text-zinc-800 leading-relaxed transition-colors duration-300">
          {step.description}
        </p>
      </CardContent>
    </Card>
  );
}
