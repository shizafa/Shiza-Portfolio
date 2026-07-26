"use client";

import { useRef } from "react";
import { ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { projects } from "@/data/projects";

export default function ProjectsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

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
      className="overflow-hidden py-10 sm:py-24"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
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
