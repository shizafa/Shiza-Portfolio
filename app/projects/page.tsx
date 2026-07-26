import ProjectsMarquee from "@/components/ProjectsMarquee";

export default function ProjectsPage() {
  return (
    <main className="flex flex-1 flex-col pt-24 pb-6 sm:pt-28">
      <div className="px-6 sm:px-10">
        <p className="text-xs uppercase tracking-widest text-muted">
          Projects
        </p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl leading-[1.05] uppercase sm:text-5xl">
          Projects that explore design, motion, 3D, and interactive front-end
          development.
        </h1>
      </div>

      <div className="mt-8 flex-1 sm:mt-16">
        <ProjectsMarquee />
      </div>
    </main>
  );
}
