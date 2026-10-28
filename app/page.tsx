import type { CSSProperties } from "react";
import Effects from "@/components/Effects";
import Services from "@/components/Services";
import { About, Contact, Footer, Hero, Nav, Studio, WhoWeAre, WordWall } from "@/components/sections";

export default function Home() {
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
      <WhoWeAre />
      <Contact />
      <Footer />
      <Effects />
    </div>
  );
}
