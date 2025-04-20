"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const size = Math.min(containerWidth, 800);
      canvas.width = size;
      canvas.height = size;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Animation variables
    const points: { 
      x: number; 
      y: number; 
      z: number; 
      originalX: number; 
      originalY: number; 
      originalZ: number;
      size: number;
      baseSize: number;
      pulseSpeed: number;
    }[] = [];
    
    const numPoints = 600; // Reduced from 1200 for better performance
    const radius = canvas.width * 0.4;
    
    // Mouse tracking
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let isMouseInCanvas = false;
    let scrollY = 0;
    let lastMouseX = canvas.width / 2;
    let lastMouseY = canvas.height / 2;
    let mouseSpeed = 0;
    
    // Create points on a sphere
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const baseSize = Math.random() * 0.5 + 1;

      points.push({ 
        x, y, z, 
        originalX: x, 
        originalY: y, 
        originalZ: z,
        size: baseSize,
        baseSize: baseSize,
        pulseSpeed: Math.random() * 0.005 + 0.002
      });
    }

    let rotation = 0;

    // Track mouse movement
    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Calculate mouse position relative to canvas with proper scaling
      const newMouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const newMouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
      
      // Calculate mouse speed for dynamic effects
      const dx = newMouseX - mouseX;
      const dy = newMouseY - mouseY;
      mouseSpeed = Math.sqrt(dx * dx + dy * dy);
      
      mouseX = newMouseX;
      mouseY = newMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      isMouseInCanvas = true;
    };
    
    const handleMouseLeave = () => {
      isMouseInCanvas = false;
    };
    
    // Track scrolling
    const handleScroll = () => {
      scrollY = window.scrollY / 500; // Normalize scroll value
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rotate points
      rotation += 0.002;
      
      // Cursor interaction parameters
      const cursorRadius = 100 + mouseSpeed * 0.5; // Dynamic radius based on mouse speed
      const repelStrength = 80 + mouseSpeed * 0.3; // Dynamic strength based on mouse speed
      const maxConnectionDistance = radius * 0.5; // Increased connection distance for denser network
      
      // First pass: calculate positions
      const projectedPoints = points.map(point => {
        // Apply rotation
        const x = point.originalX * Math.cos(rotation) - point.originalZ * Math.sin(rotation);
        const z = point.originalX * Math.sin(rotation) + point.originalZ * Math.cos(rotation);
        
        // Pulsating size effect
        point.size = point.baseSize * (1 + Math.sin(Date.now() * point.pulseSpeed) * 0.2);
        
        // Project 3D point to 2D for distance calculation
        const baseScale = 800 / (800 + z);
        const baseX = x * baseScale + canvas.width / 2;
        const baseY = point.originalY * baseScale + canvas.height / 2;
        
        // Calculate distance from cursor - direct calculation
        let distortedX = x;
        let distortedY = point.originalY;
        
        if (isMouseInCanvas) {
          const dx = baseX - mouseX;
          const dy = baseY - mouseY;
          const distanceSquared = dx * dx + dy * dy;
          const distance = Math.sqrt(distanceSquared);
          
          // Apply repulsion with immediate effect and more accurate positioning
          if (distance < cursorRadius) {
            // Use a stronger, more immediate effect
            const force = Math.pow(1 - distance / cursorRadius, 2) * repelStrength;
            
            // Apply distortion directly to the projected coordinates for more accurate cursor interaction
            distortedX = x + (dx / distance) * force;
            distortedY = point.originalY + (dy / distance) * force;
          }
        }
        
        // Apply scroll influence
        const distortedZ = z + scrollY * 0.05 * radius;
      
        // Project 3D point to 2D
        const scale = 800 / (800 + distortedZ);
        const projectedX = distortedX * scale + canvas.width / 2;
        const projectedY = distortedY * scale + canvas.height / 2;
        
        const opacity = (distortedZ + radius) / (2 * radius);
        
        return {
          x: projectedX,
          y: projectedY,
          z: distortedZ,
          opacity,
          size: point.size,
          // Store original projected position for debugging
          baseX,
          baseY
        };
      });

      // Draw a custom cursor effect
      if (isMouseInCanvas) {
        // Outer glow
        const cursorGlowRadius = 30 + mouseSpeed * 0.5;
        const cursorGradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, cursorGlowRadius
        );
        cursorGradient.addColorStop(0, 'rgba(125, 158, 141, 0.2)');
        cursorGradient.addColorStop(0.5, 'rgba(125, 158, 141, 0.1)');
        cursorGradient.addColorStop(1, 'rgba(125, 158, 141, 0)');
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, cursorGlowRadius, 0, Math.PI * 2);
        ctx.fillStyle = cursorGradient;
        ctx.fill();
        
        // Inner cursor
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(214, 239, 134, 0.8)';
        ctx.fill();
        
        // Trailing effect (similar to animation.ts)
        ctx.beginPath();
        ctx.arc(lastMouseX, lastMouseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(214, 239, 134, 0.4)';
        ctx.fill();
      }
      
      // Second pass: draw connections - enhanced to create a denser network
      ctx.globalAlpha = 0.15;
      
      // Create a more dense network of connections similar to animation.ts
      // Removed duplicate declaration of maxConnectionDistance
      
      // Draw connections between all points within range (no step skipping for density)
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const dx = projectedPoints[i].x - projectedPoints[j].x;
          const dy = projectedPoints[i].y - projectedPoints[j].y;
          const distanceSquared = dx * dx + dy * dy;
          
          if (distanceSquared < maxConnectionDistance * maxConnectionDistance) {
            const distance = Math.sqrt(distanceSquared);
            
            // Enhanced opacity calculation similar to animation.ts
            const opacity = (1 - (distance / maxConnectionDistance)) * 0.15;
            
            // Use a color palette similar to animation.ts
            const colorValue = Math.floor(180 + (distance / maxConnectionDistance) * 75);
            ctx.strokeStyle = `rgba(${colorValue}, ${colorValue + 20}, ${colorValue + 10}, ${opacity})`;
            
            ctx.beginPath();
            ctx.lineWidth = 0.5; // Match animation.ts line width
            ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y);
            ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Add special connections for visual interest (similar to animation.ts glow effects)
      ctx.globalAlpha = 0.08;
      
      // Create a few focal points for special connections
      const focalPoints = [];
      for (let i = 0; i < 3; i++) {
        focalPoints.push({
          x: canvas.width * (0.3 + Math.sin(Date.now() / 10000 + i) * 0.4 + 0.3),
          y: canvas.height * (0.3 + Math.cos(Date.now() / 12000 + i) * 0.4 + 0.3)
        });
      }
      
      // Connect some points to these focal points
      for (let i = 0; i < projectedPoints.length; i += 5) {
        const point = projectedPoints[i];
        
        // Connect to the closest focal point
        let closestFocal = focalPoints[0];
        let minDistance = Number.MAX_VALUE;
        
        for (const focal of focalPoints) {
          const dx = point.x - focal.x;
          const dy = point.y - focal.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < minDistance && distance < maxConnectionDistance * 1.5) {
            minDistance = distance;
            closestFocal = focal;
          }
        }
        
        if (minDistance < maxConnectionDistance * 1.5) {
          const opacity = (1 - (minDistance / (maxConnectionDistance * 1.5))) * 0.1;
          ctx.strokeStyle = `rgba(200, 220, 210, ${opacity})`;
          ctx.beginPath();
          ctx.lineWidth = 0.3;
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(closestFocal.x, closestFocal.y);
          ctx.stroke();
        }
      }
      
      // Third pass: draw points with glow effects
      for (let i = 0; i < projectedPoints.length; i++) {
        const point = projectedPoints[i];
        
        // Add glow effect
        const glowRadius = point.size * 3;
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, glowRadius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${point.opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        // Draw glow
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw point with pulsating size
        ctx.globalAlpha = point.opacity * 0.8;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
      
      // Reset global alpha
      ctx.globalAlpha = 1;

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-black">
      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center relative" style={{ marginTop: '-2cm' }}>
          {/* Canvas pinned to background and moved up by 4 cm - added pointer-events-none to text content */}
          <div className="absolute inset-0 flex items-center justify-center z-0 opacity-90" style={{ marginTop: '-2cm' }}>
            <canvas ref={canvasRef} width="300" height="300" className="w-full max-w-xl"></canvas>
          </div>
          
          <div className="max-w-4xl mx-auto z-10 pointer-events-none">
            <div className="mb-4 text-[#D6EF86] font-semibold">Introducing HDGE AI</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="gradient-text">Where <span className="text-white">Chatbots</span> Get Down to<br className="hidden md:block" /> Business.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              All your Team needs a Great AI
            </p>
            <div className="flex justify-center mb-12">
              <Button size="sm" className="bg-gray-800 border border-gray-400 text-gray-400 rounded-full text-lg px-4 py-2 font-serif hover:bg-gray-800 hover:text-white transition-colors duration-300 pointer-events-auto">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* New section for the text */}
      <div className="container mx-auto px-4 relative z-10 mt-20">
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl mx-auto text-white">
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light">
              AI that understands your business, tracks data, and delivers personalized support, 24/7. From handling customer inquiries to automating workflows, HdgeAI delivers intelligent, real-time responses that enhance customer satisfaction and streamline operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
