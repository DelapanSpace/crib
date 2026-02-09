import { BackgroundLayer } from "@/components/background/background-layer";
import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/queries/contactPage";
import { ContactGrid } from "../components/contact-grid";
import { Navbar } from "@/components/navbar/navbar";
import { CalendlyPopUp } from "../components/calendly-popup";

export default async function ContactView() {
  const data = await client.fetch(contactPageQuery);
  
  return (
    // 1. Changed to 'flex flex-col' so we can control vertical stacking
    <div className="relative w-full min-h-screen bg-black overflow-hidden selection:bg-stone-200 selection:text-zinc-900 flex flex-col">
      <Navbar/>
      
      {/* Visual Background */}
      <div className="fixed inset-0 z-0">
        <BackgroundLayer />
      </div>

      {/* 2. Main Content: 
         - 'flex-1': Grows to fill all empty space (pushes footer down)
         - 'flex flex-col items-center justify-center': Centers the Grid & Text vertically and horizontally
      */}
      <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10">
        
        {/* The Contact Grid */}
        <ContactGrid data={data} />

        {/* The Text Link (Added margin-top for spacing) */}
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <CalendlyPopUp />
        </div>

      </main>

      {/* 3. Footer:
         - Now sits outside the main tag, at the very bottom of the flex container
      */}
      <footer className="relative z-10 w-full py-6 text-center">
        <p className="text-stone-600 text-[10px] font-mono uppercase tracking-widest">
          8Space © 2026
        </p>
      </footer>
      
    </div>
  );
}