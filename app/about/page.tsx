import MetaRow from "@/components/MetaRow";
import { site } from "@/data/site";

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 pt-24 pb-16 text-center sm:pt-28">
      <p className="text-xs uppercase tracking-widest text-muted">About</p>

      <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.05] uppercase sm:text-6xl">
        {site.tagline}
      </h1>

      <p className="mt-10 max-w-2xl border-t border-border pt-8 text-base leading-7 text-muted sm:text-lg">
        {site.bio}
      </p>

      <div className="mt-12 w-full max-w-3xl text-left">
        <MetaRow
          items={[
            { label: "Name", value: site.name },
            { label: "Role", value: site.role },
            {
              label: "Contact",
              value: (
                <div className="flex flex-col gap-1">
                  <a href={`mailto:${site.email}`} className="hover:underline">
                    {site.email}
                  </a>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              ),
            },
          ]}
        />
      </div>
    </main>
  );
}
