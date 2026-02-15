"use client";

import { useEffect, useState } from "react";

interface CalendlyWindow extends Window {
  Calendly: {
    initPopupWidget: (options: { url: string }) => void;
  };
}

export function CalendlyPopUp() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Load the Calendly CSS (Required for the popup to look right)
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // 2. Load the Calendly JS
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    
    // 3. Mark as loaded so the button becomes active
    script.onload = () => setIsLoaded(true);
    
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const handleBookCall = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // We use (window as any) because Typescript doesn't know 'Calendly' exists globally
    if (isLoaded && (window as unknown as CalendlyWindow).Calendly) {
      (window as unknown as CalendlyWindow).Calendly.initPopupWidget({
        url: 'https://calendly.com/team-delapanspace/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=ffffff' 
      });
    }
  };

  return (
    <div className="w-full flex justify-center mt-5 mb-10">
      <button 
        onClick={handleBookCall}
        disabled={!isLoaded}
        className="
            group relative
            text-sm font-mono uppercase tracking-widest 
            text-zinc-500 hover:text-white 
            transition-all duration-500 ease-out
            disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        <span className="relative z-10">[ Click here to book a quick call ]</span>
        
        {/* Optional: Subtle underline animation on hover */}
        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
      </button>
    </div>
  );
}