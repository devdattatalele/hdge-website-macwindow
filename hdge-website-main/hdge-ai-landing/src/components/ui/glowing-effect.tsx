"use client";

import React, { useRef, useState, useEffect } from "react";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
}

export function GlowingEffect({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const maxDistance = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 2;

      // Set opacity based on distance
      const newOpacity = Math.max(0, 1 - distance / maxDistance / proximity * 100);
      setOpacity(newOpacity);
      setPosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setOpacity(0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [disabled, proximity]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {!disabled && (
        <div
          className="pointer-events-none absolute -inset-px z-[-1] rounded-[inherit] opacity-0 transition-opacity duration-500"
          style={{
            opacity: glow ? opacity : 0,
            background: `radial-gradient(${spread * 30}px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent ${spread}%)`,
          }}
        />
      )}
    </div>
  );
}