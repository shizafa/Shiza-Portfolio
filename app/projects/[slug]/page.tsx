import Image from "next/image";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";
import MetaRow from "@/components/MetaRow";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col pt-24 pb-16 sm:pt-28">
      <div className="px-6 sm:px-10">
        <p className="text-xs uppercase tracking-widest text-muted">
          {project.category}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl leading-[1.05] uppercase sm:text-6xl">
          {project.title}
        </h1>

        <div className="mt-8 max-w-2xl">
          <MetaRow
            items={[
              { label: "Category", value: project.category },
              { label: "Description", value: project.description },
            ]}
          />
        </div>

        <ViewTransition name={project.slug}>
          <div className="relative mt-12 aspect-video w-full overflow-hidden bg-zinc-100">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </ViewTransition>
      </div>
    </main>
  );
}
