import type { CSSProperties } from "react";
import Effects from "@/components/Effects";
import Nav from "@/components/Nav";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { About, Contact, Footer, Hero, Studio, WhoWeAre, WordWall } from "@/components/sections";
import { getTestimonials } from "@/lib/sanity";

// Content published in Sanity shows up on the site within a minute
export const revalidate = 60;

export default async function Home() {
  const testimonials = await getTestimonials().catch((err) => {
    console.error("Could not load testimonials from Sanity", err);
    return [];
  });

  return (
    <div
      id="top"
      data-root
      style={{ "--bg": "#EEEEE6", "--fg": "#000", background: "#EEEEE6", color: "#000" } as CSSProperties}
      className="overflow-x-clip transition-[background-color,color] duration-600"
    >
      <Nav />
      <Hero />
      <WordWall />
      <About />
      <Studio />
      <Services />
      <Testimonials items={testimonials} />
      <WhoWeAre />
      <Contact />
      <Footer />
      <Effects />
    </div>
  );
}
