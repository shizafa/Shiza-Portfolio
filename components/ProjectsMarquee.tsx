"use client";

import { useRef } from "react";
import { ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { projects } from "@/data/projects";

// One full pass through the doubled track (xPercent 0 -> -50) is exactly one
// lap of the original project list, so any two xPercent values that differ
// by a multiple of 50 render identically. Looping and stepping both lean on
// that to jump/wrap without a visible seam.
function playLoop(track: HTMLDivElement, tweenRef: React.RefObject<gsap.core.Tween | null>) {
  tweenRef.current = gsap.to(track, {
    xPercent: "-=50",
    duration: 70,
    ease: "none",
    repeat: -1,
  });
}

function stepMarquee(
  track: HTMLDivElement,
  tweenRef: React.RefObject<gsap.core.Tween | null>,
  direction: 1 | -1,
  step: number,
) {
  gsap.killTweensOf(track);

  const current = Number(gsap.getProperty(track, "xPercent"));
  const raw = current - direction * step;

  tweenRef.current = gsap.to(track, {
    xPercent: raw,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => {
      let normalized = raw;
      while (normalized <= -50) normalized += 50;
      while (normalized > 0) normalized -= 50;
      if (normalized !== raw) gsap.set(track, { xPercent: normalized });
      playLoop(track, tweenRef);
    },
  });
}

export default function ProjectsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const step = 50 / projects.length;

  useGSAP(
    () => {
      if (!trackRef.current) return;
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 70,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: trackRef },
  );

  const items = [...projects, ...projects];

  return (
    <div
      className="relative overflow-hidden py-10 sm:py-24"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <button
        type="button"
        aria-label="Previous project"
        onClick={() => {
          if (trackRef.current) stepMarquee(trackRef.current, tweenRef, -1, step);
        }}
        className="absolute top-1/2 left-2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-colors hover:bg-foreground hover:text-background sm:left-6 sm:h-11 sm:w-11"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-4 w-4 sm:h-5 sm:w-5"
        >
          <path
            d="M15 6l-6 6 6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next project"
        onClick={() => {
          if (trackRef.current) stepMarquee(trackRef.current, tweenRef, 1, step);
        }}
        className="absolute top-1/2 right-2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-colors hover:bg-foreground hover:text-background sm:right-6 sm:h-11 sm:w-11"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-4 w-4 sm:h-5 sm:w-5"
        >
          <path
            d="M9 6l6 6-6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div ref={trackRef} className="flex w-max items-center gap-4">
        {items.map((project, i) => {
          const card = (
            <Link
              href={`/projects/${project.slug}`}
              className={`group relative z-10 block shrink-0 overflow-hidden bg-zinc-100 transition-transform duration-500 ease-out hover:z-30 hover:scale-[2] ${
                project.orientation === "vertical"
                  ? "h-[260px] w-[190px] sm:h-[360px] sm:w-[250px]"
                  : "h-[170px] w-[250px] sm:h-[230px] sm:w-[340px]"
              }`}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 250px, 340px"
                className="object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="-rotate-6 rounded-full bg-black/80 px-4 py-2 font-funky text-sm text-white">
                  CLICK
                </span>
              </span>
            </Link>
          );

          // Only the original (non-duplicated) set gets a shared view-transition
          // name — the marquee doubles the list for a seamless loop, and
          // view-transition names must be unique per page.
          if (i < projects.length) {
            return (
              <ViewTransition key={project.slug} name={project.slug}>
                {card}
              </ViewTransition>
            );
          }

          return <div key={`${project.slug}-${i}`}>{card}</div>;
        })}
      </div>
    </div>
  );
}
