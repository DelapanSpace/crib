import { ContactGrid } from "../components/contact-grid";
import { BackgroundLayer } from "@/components/background/background-layer";

export default function ContactView() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden selection:bg-stone-200 selection:text-zinc-900">
      
      {/* Visual Background */}
      <div className="fixed inset-0 z-0">
        <BackgroundLayer />
      </div>

      {/* Main Container: Centering the Grid */}
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center">
        <ContactGrid />
        
        {/* Footer info (Optional) */}
        <div>
          <p className="text-stone-600 text-[10px] font-mono uppercase tracking-widest">
            Delapan Space © 2026
          </p>
        </div>
      </main>
    </div>
  );
}