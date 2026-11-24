import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Effects from "@/components/Effects";
import Nav from "@/components/Nav";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { About, Contact, Footer, Hero, Studio, WhoWeAre, WordWall } from "@/components/sections";
import { getHomePage } from "@/lib/sanity";

// Content published in Sanity shows up on the site within a minute
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { home } = await getHomePage();
  return {
    title: home.seo?.title || undefined,
    description: home.seo?.description || undefined,
  };
}

export default async function Home() {
  const { home, services, testimonials } = await getHomePage();

  return (
    <div
      id="top"
      data-root
      style={{ "--bg": "#EEEEE6", "--fg": "#000", background: "#EEEEE6", color: "#000" } as CSSProperties}
      className="overflow-x-clip transition-[background-color,color] duration-600"
    >
      <Nav
        services={services.map((s) => s.title.replace(/\.$/, ""))}
        leadIn={home.menu?.leadIn ?? undefined}
        ctaLabel={home.menu?.ctaLabel ?? undefined}
      />
      <Hero content={home.hero} />
      <WordWall content={home.wordWall} />
      <About content={home.about} />
      <Studio image={home.about.image} />
      <Services content={home.services} services={services} />
      <Testimonials items={testimonials} />
      <WhoWeAre content={home.whoWeAre} />
      <Contact content={home.contact} />
      <Footer content={home.footer} email={home.contact.email} />
      <Effects />
    </div>
  );
}
