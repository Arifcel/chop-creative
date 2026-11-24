import { createClient } from "@sanity/client";

// Project ID and dataset are public identifiers, so they can live in code
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "kcjmpxef",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-11-01",
  useCdn: true,
});

export type Testimonial = {
  _id: string;
  client: string;
  quote: string;
  name: string;
  role: string;
  logo: string | null;
  services: string[] | null;
};

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc, _createdAt asc) {
  _id,
  client,
  quote,
  name,
  role,
  "logo": logo.asset->url,
  services
}`;

export const getTestimonials = () => client.fetch<Testimonial[]>(testimonialsQuery);
