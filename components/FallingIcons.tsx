"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";

const ICONS = [
  "/images/falling/1.png",
  "/images/falling/2.png",
  "/images/falling/3.png",
  "/images/falling/4.png",
  "/images/falling/5.png",
  "/images/falling/6.png",
  "/images/falling/7.png",
  "/images/falling/8.png",
  "/images/falling/9.png",
  "/images/falling/10.png",
];

const MIN_SPAWN_DISTANCE = 130;
const MAX_CONCURRENT = 10;

export default function FallingIcons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnPos = useRef<{ x: number; y: number } | null>(null);
  const activeCount = useRef(0);

  const spawnIcon = useCallback((x: number, y: number, containerHeight: number) => {
    const container = containerRef.current;
    if (!container || activeCount.current >= MAX_CONCURRENT) return;

    const icon = document.createElement("img");
    icon.src = ICONS[Math.floor(Math.random() * ICONS.length)];
    icon.alt = "";
    const size = 24 + Math.random() * 20;
    icon.style.position = "absolute";
    icon.style.left = `${x - size / 2}px`;
    icon.style.top = `${y - size / 2}px`;
    icon.style.width = `${size}px`;
    icon.style.height = `${size}px`;
    icon.style.pointerEvents = "none";
    icon.style.willChange = "transform, opacity";

    container.appendChild(icon);
    activeCount.current += 1;

    const landingY = containerHeight - size - 12;
    const fallDistance = Math.max(0, landingY - y);
    const rotation = (Math.random() - 0.5) * 200;
    const drift = (Math.random() - 0.5) * 50;

    const tl = gsap.timeline({
      onComplete: () => {
        icon.remove();
        activeCount.current -= 1;
      },
    });

    tl.to(icon, {
      y: fallDistance,
      x: drift,
      rotation,
      duration: 0.9 + Math.random() * 0.4,
      ease: "power1.in",
    })
      .to(icon, { duration: 0.4 })
      .to(icon, { opacity: 0, duration: 0.5, ease: "power1.out" });
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const last = lastSpawnPos.current;
      if (last && Math.hypot(x - last.x, y - last.y) < MIN_SPAWN_DISTANCE) return;

      lastSpawnPos.current = { x, y };
      spawnIcon(x, y, rect.height);
    },
    [spawnIcon],
  );

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="absolute inset-0 z-20 overflow-hidden"
    />
  );
}
