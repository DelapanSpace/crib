"use client";

import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // We track two mouse positions to create a "Lag" effect
  // This removes the jitter from hand movement
  const targetMouse = useRef({ x: -1000, y: -1000 });
  const currentMouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- ELEGANCE SETTINGS ---
    const spacing = 40; 
    const connectionRadius = 250; 
    const mouseForce = 50; // Weaker force = more subtle
    
    // THE SECRET SAUCE:
    // Low spring + High friction = "Liquid" feel
    const springStrength = 0.02; // Very slow return
    const friction = 0.94; // High resistance (viscosity)

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    class Point {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.ox = x;
        this.oy = y;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        // Use the SMOOTHED mouse position, not the raw one
        const dx = currentMouse.current.x - this.x;
        const dy = currentMouse.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Gentle, Cubic Repulsion
        // Instead of a linear push, we use a curve so it feels soft at the edges
        if (dist < 200) {
          const angle = Math.atan2(dy, dx);
          
          // Easing: (1 - dist/200)^3 gives a very soft edge
          const forceRatio = Math.pow(1 - dist / 200, 3); 
          const push = -forceRatio * mouseForce;

          this.vx += Math.cos(angle) * push;
          this.vy += Math.sin(angle) * push;
        }

        // Return to origin (Spring)
        const returnX = this.ox - this.x;
        const returnY = this.oy - this.y;

        this.vx += returnX * springStrength;
        this.vy += returnY * springStrength;

        // Damping (Friction)
        this.vx *= friction;
        this.vy *= friction;
        
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    let points: Point[] = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;
      points = [];

      for (let i = 0; i < cols * rows; i++) {
        const x = (i % cols) * spacing;
        const y = Math.floor(i / cols) * spacing;
        points.push(new Point(x, y));
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // SMOOTH MOUSE LERP
      // Move current mouse 10% towards target mouse every frame
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.1;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.1;

      points.forEach((p) => p.update());

      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Use currentMouse for visibility calculation too
        const dToMouse = Math.hypot(p.x - currentMouse.current.x, p.y - currentMouse.current.y);
        
        let alpha = 0;
        if (dToMouse < connectionRadius) {
            // Cubic easing for smoother light falloff
            const ratio = 1 - (dToMouse / connectionRadius);
            alpha = ratio * ratio * ratio; 
        } else {
            continue; 
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.65})`;

        // Draw connections
        if ((i + 1) % cols !== 0) {
          const right = points[i + 1];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(right.x, right.y);
          ctx.stroke();
        }

        if (i + cols < points.length) {
          const bottom = points[i + cols];
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(bottom.x, bottom.y);
          ctx.stroke();
        }

        // Draw subtle crosshairs
        if (dToMouse < 150) {
           ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
           ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
        }
      }

      requestAnimationFrame(draw);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      // We only update the TARGET here. The draw loop handles the smoothing.
      targetMouse.current.x = e.clientX;
      targetMouse.current.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    init();
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
    />
  );
}