import { createClient } from "@sanity/client";
import { cache } from "react";

// Project ID and dataset are public identifiers, so they can live in code
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "kcjmpxef",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-11-01",
  useCdn: true,
});

export type SanityImage = {
  url: string;
  alt: string | null;
  width: number;
  height: number;
  hotspot: { x: number; y: number } | null;
};

export type Testimonial = {
  _id: string;
  client: string;
  quote: string;
  name: string;
  role: string;
  logo: string | null;
  services: string[] | null;
};

export type Service = {
  _id: string;
  title: string;
  text: string;
  chips: string[] | null;
  image: SanityImage | null;
};

export type HomePage = {
  hero: { title: string; subtitle: string | null; intro: string | null; ctaLabel: string | null };
  wordWall: { heading: string; row1: string[] | null; row2: string[] | null; row3: string[] | null; footnote: string | null };
  about: { heading: string; body: string | null; ctaLabel: string | null; image: SanityImage | null };
  services: { eyebrow: string | null; heading: string; chipsLabel: string | null };
  whoWeAre: { eyebrow: string | null; heading: string; paragraphs: string[] | null };
  contact: { heading: string; body: string | null; ctaLabel: string | null; email: string };
  footer: { tagline: string | null; locations: string | null; website: string | null };
  menu: { leadIn: string | null; ctaLabel: string | null } | null;
  seo: { title: string | null; description: string | null } | null;
};

const image = `{
  alt,
  hotspot,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const homeQuery = `{
  "home": *[_id == "homePage"][0] {
    hero, wordWall, services, whoWeAre, contact, footer, menu, seo,
    about { heading, body, ctaLabel, "image": image${image} }
  },
  "services": *[_type == "service"] | order(order asc, _createdAt asc) {
    _id, title, text, chips, "image": image${image}
  },
  "testimonials": *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id, client, quote, name, role, "logo": logo.asset->url, services
  }
}`;

// Cached per request so generateMetadata and the page share one fetch
export const getHomePage = cache(async () => {
  const data = await client.fetch<{ home: HomePage | null; services: Service[]; testimonials: Testimonial[] }>(homeQuery);
  if (!data.home) throw new Error("The Home page document is missing in Sanity");
  return { ...data, home: data.home };
});
