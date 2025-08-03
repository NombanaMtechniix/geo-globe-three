"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [grid, setGrid] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setGrid({
        x: Math.floor(window.innerWidth / 44),
        y: Math.floor(window.innerHeight / 44),
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center px-6">
      <div className="absolute size-4 aspect-square bg-white/50 top-5 left-5" />
      <div className="absolute size-4 aspect-square bg-white/50 top-5 right-5" />
      <div className="absolute size-4 aspect-square bg-white/50 bottom-5 left-5" />
      <div className="absolute size-4 aspect-square bg-white/50 bottom-5 right-5" />
      <div className="size-full relative z-10 m-6 border border-white/30 bg-[#0B0B0D]">
        <div className="absolute inset-0 flex">
          {Array.from({ length: grid.x }).map((_, index) => (
            <div
              key={`col-${index}`}
              className="h-full border-r border-white/5"
              style={{ width: `${100 / grid.x}%` }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: grid.y }).map((_, index) => (
            <div
              key={`row-${index}`}
              className="w-full border-b border-white/5"
              style={{ height: `${100 / grid.y}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
