import MetaRow from "@/components/MetaRow";
import FallingIcons from "@/components/FallingIcons";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/hero.mp4"
        poster="/images/hero-poster.svg"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 flex flex-1 flex-col px-6 pt-24 pb-6 sm:px-10 sm:pt-28">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-muted">
            {site.role}
          </p>
          <h1 className="mt-2 font-display text-[15vw] leading-[0.85] uppercase sm:text-[7vw]">
            {site.name}
          </h1>
        </div>

        <footer className="mt-auto pt-10">
          <MetaRow
            items={[
              { label: "Base", value: site.base },
              { label: "Focus", value: site.focus },
              { label: "Index", value: site.index },
            ]}
          />
        </footer>
      </div>

      <FallingIcons />
    </main>
  );
}
