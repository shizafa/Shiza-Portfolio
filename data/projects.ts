export interface Project {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  images: string[];
  orientation: "vertical" | "horizontal";
}

export const projects: Project[] = [
  {
    slug: "planit-landing-page",
    title: "PlanIT - Landing Page",
    category: "Web / Landing Page",
    thumbnail: "/images/projects/planit-landing.png",
    description:
      "AI travel planner that generates day-by-day itineraries from a few simple inputs. React · Supabase · Tailwind · OpenRouter",
    images: ["/images/projects/planit-landing.png"],
    orientation: "horizontal",
  },
  {
    slug: "planit-dashboard",
    title: "PlanIT - Dashboard",
    category: "Web / Dashboard",
    thumbnail: "/images/projects/planit-dashboard.png",
    description:
      "Trip dashboard with live travel stats, saved itineraries, and instant re-planning. React · Supabase · Tailwind",
    images: ["/images/projects/planit-dashboard.png"],
    orientation: "horizontal",
  },
  {
    slug: "kashmir-day-poster",
    title: "Kashmir Day Poster",
    category: "Poster / Print Design",
    thumbnail: "/images/projects/kashmir-day.png",
    description:
      "Bilingual commemorative poster for a university Volunteer Forum, with a bold typographic lockup, Urdu-English hierarchy, and a high-contrast ember palette.",
    images: ["/images/projects/kashmir-day.png"],
    orientation: "vertical",
  },
  {
    slug: "salon-site",
    title: "Salon Site",
    category: "Web / Multi-page",
    thumbnail: "/images/projects/salon-site.png",
    description:
      "Elegant multi-page salon site with dynamic service routes, gallery, and scroll-reveal animations. React · Tailwind · EmailJS",
    images: ["/images/projects/salon-site.png"],
    orientation: "horizontal",
  },
  {
    slug: "cabinet-announcement-series",
    title: "Cabinet Announcement Series",
    category: "Poster / Print Design",
    thumbnail: "/images/projects/club-poster.png",
    description:
      "Templated cabinet announcement series for a university club, with an outline-type backdrop, cut-out portraits, and an angled name banner.",
    images: ["/images/projects/club-poster.png"],
    orientation: "vertical",
  },
  {
    slug: "v-executives",
    title: "V Executives",
    category: "Web / Landing Page",
    thumbnail: "/images/projects/v-executives.png",
    description:
      "Corporate agency site with a dashboard-style hero and live contact flow. React · Vite · Nginx · EmailJS",
    images: ["/images/projects/v-executives.png"],
    orientation: "horizontal",
  },
];
