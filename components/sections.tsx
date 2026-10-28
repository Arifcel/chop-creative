import Image from "next/image";
import { Eyebrow, Pill, Sticker, navLinks } from "./ui";

const sectionY = "py-[clamp(72px,10vw,144px)]";

export function Nav() {
  return (
    <nav className="container-x flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-6">
      <a href="#top" aria-label="Chop Creative">
        <Image src="/assets/chop-logo.png" alt="Chop Creative" width={1584} height={608} priority className="h-[38px] w-auto" />
      </a>
      <div className="flex flex-wrap gap-x-[clamp(18px,2.4vw,36px)] gap-y-2.5 text-[17px] font-medium">
        {navLinks.map((l) => (
          <a key={l.label} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section data-bg="#EEEEE6" data-fg="#000" className="relative">
      <div className="container-x pt-[clamp(56px,9vw,140px)] pb-[clamp(64px,8vw,120px)]">
        <h1 className="max-w-[8.5em] text-[clamp(48px,8.8vw,160px)] leading-[.92] tracking-[-.03em] text-balance">
          Lick-your-chops good branding.
        </h1>
        <div className="mt-[clamp(40px,5vw,72px)] flex flex-wrap items-end justify-between gap-x-16 gap-y-7">
          <p className="max-w-[30em] text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-pretty">
            We create standout brands built on substance. Rooted in strategy, shaped by values, and expressed with
            attention-grabbing design, we get people talking and drive long-term growth.
          </p>
          <Pill href="#contact">Let’s Talk Chop →</Pill>
        </div>
      </div>
      <Sticker name="walk" rot={10} className="absolute top-[10%] right-[5%] w-[clamp(120px,15vw,240px)]" />
    </section>
  );
}

const rows = [
  {
    speed: 0.5,
    dir: 1,
    items: ["Brand Strategy", "Visual Identity", "Logos", "Website Design", "Digital Ads", "Sales Decks", "Packaging", "Brand Oversight"],
  },
  {
    speed: 0.62,
    dir: -1,
    inverted: true,
    items: ["Brand Blueprint", "Event Collateral", "Website Dev", "Brand Audit", "Paid Ads", "Pitch Decks", "Merch", "Prompt Engineering"],
  },
  {
    speed: 0.44,
    dir: 1,
    items: ["Brand Expression", "Print Material", "OOH Advertising", "Brand Positioning", "Social Media", "Sonic Branding", "Templates", "Creative Direction & Consulting"],
  },
];

function MarqueeCopy({ items, inverted, clone }: { items: string[]; inverted?: boolean; clone?: boolean }) {
  const hover = inverted ? "hover:bg-[var(--bg)] hover:text-[var(--fg)]" : "hover:bg-[var(--fg)] hover:text-[var(--bg)]";
  return (
    <div className="flex gap-[.4em] pr-[.4em]" aria-hidden={clone || undefined} data-mq-clone={clone || undefined}>
      {items.map((item) => (
        <span key={item} data-svc className={`cursor-default rounded-[.12em] px-[.06em] transition-colors duration-150 ${hover}`}>
          {item}.
        </span>
      ))}
    </div>
  );
}

export function WordWall() {
  return (
    <section id="services" data-bg="#E5FF2F" data-fg="#000" className={sectionY}>
      <div className="container-x">
        <h2 className="mb-[clamp(40px,5vw,72px)] max-w-[10em] text-[clamp(40px,5.6vw,92px)] leading-[.96] tracking-[-.03em]">
          <span className="mark" data-mark>
            <span>We don’t do it all. But we do a lot.</span>
          </span>
        </h2>
        <div className="ml-[calc(50%-50vw)] w-screen font-display text-[clamp(40px,6vw,104px)] leading-[1.12] font-medium tracking-[-.02em] whitespace-nowrap">
          {rows.map((row, i) => (
            <div
              key={i}
              className={
                row.inverted
                  ? "my-[.32em] -ml-[5vw] w-[110vw] -rotate-[1.5deg] overflow-hidden bg-[var(--fg)] py-[.1em] text-[var(--bg)] transition-colors duration-600"
                  : "overflow-hidden"
              }
            >
              <div data-mq data-speed={row.speed} data-dir={row.dir} className="flex w-max">
                <MarqueeCopy items={row.items} inverted={row.inverted} />
                <MarqueeCopy items={row.items} inverted={row.inverted} clone />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-[clamp(28px,3vw,44px)] text-[17px] leading-normal">
          (And if we don’t do it in-house we’ll find someone who does)
        </p>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" data-bg="#000" data-fg="#EEEEE6" className={sectionY}>
      <div className="container-x">
        <div className="flex flex-wrap items-center gap-x-[clamp(24px,3vw,48px)] gap-y-4">
          <h2 className="max-w-[8em] text-[clamp(52px,9vw,164px)] leading-[.92] tracking-[-.03em]">Clarity, with some teeth.</h2>
          <Sticker name="fangs" rot={-8} className="relative w-[clamp(110px,13vw,210px)]" />
        </div>
        <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-20 gap-y-8">
          <p className="max-w-[26em] text-[clamp(20px,2vw,28px)] leading-[1.3] font-medium tracking-[-.01em]">
            We are sharp thinking, confident creatives that bite just enough to break through the noise and hold our ground.
            Every decision we make intentional, every edge is earned. That’s how Chop stays memorable, feels alive, and is
            impossible to ignore.
          </p>
          <div>
            <Pill href="#" variant="lime">
              About us →
            </Pill>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Studio() {
  return (
    <div data-bg="#000" data-fg="#EEEEE6" className="container-x relative">
      <Image
        src="/assets/studio-team.jpg"
        alt="Chop Creative team filming in the studio"
        width={1500}
        height={1000}
        sizes="(max-width: 1440px) 100vw, 1440px"
        className="aspect-[16/7] min-h-[260px] w-full rounded-[28px] object-cover object-[50%_35%]"
      />
    </div>
  );
}

export function WhoWeAre() {
  return (
    <section data-bg="#0A1D35" data-fg="#EEEEE6" className={`relative ${sectionY}`}>
      <div className="container-x">
        <Eyebrow className="mb-5">Who we are</Eyebrow>
        <h2 className="max-w-[9em] text-[clamp(48px,8vw,140px)] leading-[.92] tracking-[-.03em]">We’re lean & strategy-first.</h2>
        <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-20 gap-y-8 text-[clamp(18px,1.6vw,22px)] leading-normal">
          <p className="max-w-[30em]">
            What started as a spark in Stockholm, Chop weathered wild ideas in San Francisco, and settled into its groove in
            the Pacific Northwest. Think Scandinavian clarity meets Bay Area boldness. With a little rain-soaked raw hustle
            to pull it all together.
          </p>
          <p className="max-w-[30em]">
            Chop Creative is a brand & advertising agency. We operate as an extension of your team, fully invested in making
            sure we make heads turn and your brand grow.
          </p>
        </div>
      </div>
      <Sticker name="peace" rot={12} className="absolute top-[8%] right-[6%] w-[clamp(110px,12vw,190px)]" />
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      data-bg="#E5FF2F"
      data-fg="#000"
      className="relative pt-[clamp(96px,12vw,176px)] pb-[clamp(72px,9vw,128px)]"
    >
      <div className="container-x">
        <h2 className="text-[clamp(64px,12vw,220px)] leading-[.88] tracking-[-.035em]">Wanna yap?</h2>
        <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-20 gap-y-8">
          <p className="max-w-[30em] text-[clamp(18px,1.6vw,22px)] leading-[1.45]">
            Have questions? Want to collab? Need a brand gut check or just feel like saying hej? Hit us up. We talk chop, but
            we live your brand.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3.5">
            <Pill href="mailto:hej@chopcreative.com">Let’s Talk Chop →</Pill>
            <a href="mailto:hej@chopcreative.com" className="text-lg font-medium">
              hej@chopcreative.com
            </a>
          </div>
        </div>
      </div>
      <Sticker name="tongue" rot={-8} className="absolute top-[12%] right-[4%] w-[clamp(120px,14vw,220px)]" />
    </section>
  );
}

export function Footer() {
  return (
    <footer data-bg="#EEEEE6" data-fg="#000" className="pt-[clamp(56px,7vw,96px)] pb-10">
      <div className="container-x">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] items-start gap-8 border-t-[1.5px] border-current pt-10 text-base leading-normal">
          <a href="#top" aria-label="Chop Creative">
            <Image src="/assets/chop-logo.png" alt="Chop Creative" width={1584} height={608} className="h-11 w-auto" />
          </a>
          <div className="flex flex-col gap-1">
            <span>Based wherever the wind blows us.</span>
            <span>Stockholm · San Francisco · Pacific Northwest</span>
          </div>
          <div className="flex flex-col gap-1">
            <a href="mailto:hej@chopcreative.com">hej@chopcreative.com</a>
            <a href="https://www.chopcreative.com">www.chopcreative.com</a>
          </div>
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 text-sm font-medium">© 2026 Chop Creative</div>
      </div>
    </footer>
  );
}
