import { site } from "@/data/site";

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
      <p className="text-xs uppercase tracking-widest text-muted">Contact</p>

      <h1 className="mt-6 font-display text-5xl uppercase sm:text-7xl">
        Get in touch.
      </h1>

      <div className="mt-10 flex w-full max-w-sm flex-col gap-4 border-t border-border pt-8">
        <a
          href={`mailto:${site.email}`}
          className="flex items-center justify-center gap-2 text-lg hover:underline"
        >
          {site.email}
          <span aria-hidden="true">↗</span>
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-lg hover:underline"
        >
          LinkedIn
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </main>
  );
}
