import { Card } from "@/components/ui/card";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { PROJECTS } from "../utils";
import { useSynthClick } from "@/hooks/use-synth-click";

export function ProjectsList() {
  const itemHeight = 40; // adjust according to your li height (px)
  const visibleItems = 5;
  const maxHeight = `${itemHeight * visibleItems}px`;
  const router = useRouter();
  const { playClick } = useSynthClick();
  const handleView = (project: string) => {
    const slug = project.toLowerCase().replace(/\s+/g, "-");
    router.push(`projects/${slug}` as Route);
  };
  return (
    <Card
      className="w-[85vw] md:w-[300px] max-h-[400px] overflow-y-auto p-2 bg-white/10 border-white/20 backdrop-blur-md no-scrollbar touch-pan-y"
      style={{ maxHeight }}
    >
      <ul className="flex flex-col gap-1">
        {PROJECTS.map((project, i) => (
          <li
            key={project}
            className="group flex items-center justify-between p-3 rounded-md hover:bg-white/10 cursor-pointer transition-colors min-h-[44px]"
            onMouseEnter={() => playClick()}
            onClick={() => {
              handleView(project);
            }}
          >
            <span className="text-sm font-medium text-white/80 group-hover:text-white">
              {project}
            </span>
            <span className="text-xs text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
              ↗
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
