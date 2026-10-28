import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Utkast — Chop Creative",
  robots: { index: false },
};

const img = (name: string) => `/assets/utkast/${name}.jpg`;
const sectionY = "py-[clamp(72px,10vw,144px)]";
const mono = "font-mono text-[13px] uppercase tracking-[.08em]";
const cta =
  "inline-flex items-center gap-3 rounded-[12px] bg-lime px-6 py-4 font-mono text-[14px] font-medium uppercase tracking-[.06em] text-black transition-[background-color,color,rotate] duration-200 hover:-rotate-2 hover:bg-black hover:text-lime hover:no-underline";

/* Light/bold word pair, the page's headline signature */
function Pair({ light, bold }: { light: string; bold: string }) {
  return (
    <>
      <span className="font-light">{light}</span> <span className="font-semibold">{bold}</span>
    </>
  );
}

const fan = [
  { src: "mupi", rot: -12, y: 56, x: "0%" },
  { src: "studio", rot: -6, y: 16, x: "19%" },
  { src: "beauty-box", rot: 0, y: 0, x: "38%" },
  { src: "billboard", rot: 6, y: 16, x: "57%" },
  { src: "colours", rot: 12, y: 56, x: "76%" },
];

const whys = [
  { title: "We cut, not pad.", body: "No 80-slide decks for a 3-word idea. We get to the point and make the point look good." },
  { title: "Strategy with taste.", body: "Every visual choice has a reason behind it, and every reason gets a visual worth remembering." },
  { title: "Small crew, big swings.", body: "You talk to the people doing the work. Fewer hand-offs, faster calls, braver ideas." },
];

const work = [
  { src: "bus-stop", title: "Out of home", tag: "Campaign", quote: "Stopped people at the bus stop. Literally.", h: "h-[440px]" },
  { src: "packaging", title: "Unboxed", tag: "Packaging", quote: "Quiet on the shelf, loud in the hand.", h: "h-[380px]" },
  { src: "swatches", title: "Colour system", tag: "Visual identity", quote: "Five colours, zero arguments.", h: "h-[460px]" },
  { src: "banners", title: "Street level", tag: "Community", quote: "Hand-painted, on-brand, on purpose.", h: "h-[400px]" },
  { src: "studio", title: "Behind the chop", tag: "Creative direction", quote: "Where the yapping turns into work.", h: "h-[430px]" },
];

const services = [
  { title: "Brand strategy", tag: "Positioning, naming and the story you can actually say out loud." },
  { title: "Visual identity", tag: "Logos, type and colour that hold up from favicon to billboard." },
  { title: "Advertising", tag: "Campaigns for screens, streets and everything in between." },
  { title: "Websites & decks", tag: "Sites and presentations that sell the idea in one scroll." },
  { title: "Print & events", tag: "Things you can touch, hand out and hang on a wall." },
  { title: "Creative direction", tag: "One sharp eye over every shoot, edit and launch." },
];

const steps = [
  { title: "Yap", body: "A kick-off where we ask the awkward questions and find the real brief." },
  { title: "Chop", body: "Strategy and design in short loops, with you in the room, not in the dark." },
  { title: "Serve", body: "Launch-ready files, guidelines and a team that sticks around after." },
];

/* Placeholder quotes for the draft: swap for real client words before launch */
const quotes = [
  { q: "They found the one sentence our brand was missing, then built everything around it.", who: "Namn Efternamn", role: "CMO, Kund" },
  { q: "Fast, funny and frighteningly good at saying no to bad ideas. Including ours.", who: "Namn Efternamn", role: "Grundare, Kund" },
  { q: "The rebrand paid for itself in the first campaign.", who: "Namn Efternamn", role: "Marknadschef, Kund" },
  { q: "Finally an agency that answers the phone and the brief.", who: "Namn Efternamn", role: "VD, Kund" },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`size-4 ${className}`}>
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Utkast() {
  return (
    <div id="top" className="bg-cream text-[#1e1e1e]">
      <Nav base="/" />

      {/* Hero */}
      <section className="container-x pt-[clamp(56px,8vw,112px)] text-center">
        <h1 className="mx-auto max-w-[20ch] text-[clamp(44px,6.4vw,92px)] leading-[1.02] tracking-[-.02em]">
          <Pair light="Creative that" bold="cuts through" />
          <br />
          <Pair light="the" bold="noise." />
        </h1>

        <div className="relative mx-auto mt-[clamp(40px,6vw,72px)] h-[clamp(240px,30vw,420px)] max-w-[1100px]">
          {fan.map((f, i) => (
            <div
              key={f.src}
              className={`absolute top-0 w-[24%] overflow-hidden rounded-[18px] shadow-[0_20px_50px_-20px_rgba(0,0,0,.35)] transition-transform duration-300 hover:z-10 hover:-translate-y-3 ${i === 0 || i === 4 ? "max-sm:hidden" : ""}`}
              style={{ left: f.x, rotate: `${f.rot}deg`, marginTop: f.y, zIndex: i === 2 ? 3 : i % 2 ? 2 : 1 }}
            >
              <div className="relative aspect-[2/3]">
                <Image src={img(f.src)} alt="" fill sizes="(max-width: 640px) 40vw, 260px" className="object-cover" priority={i === 2} />
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-[clamp(80px,10vw,140px)] max-w-[52ch] text-[clamp(17px,1.4vw,20px)] leading-relaxed text-black/70">
          Chop Creative is a small, sharp studio for brand strategy, identity and campaigns. We trim the fluff and keep the flavour.
        </p>
        <a href="mailto:hej@chopcreative.com" className={`${cta} mt-8`}>
          Start a project <Arrow />
        </a>
      </section>

      {/* Ticker */}
      <section className="mt-[clamp(72px,9vw,128px)] border-y border-black/10 py-8">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-16 pr-16">
            {[...services, ...services].map((s, i) => (
              <span key={i} className="font-display text-[clamp(26px,3vw,40px)] whitespace-nowrap text-black/80">
                {s.title} <span className="text-black/25">✳</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="about" className="relative isolate overflow-hidden bg-[#1e1e1e] text-cream">
        <Image src={img("dark-light")} alt="" fill sizes="100vw" className="-z-10 scale-110 object-cover opacity-40 blur-2xl" />
        <div className={`container-x ${sectionY}`}>
          <h2 className="text-[clamp(40px,4.6vw,64px)] leading-[1.05] tracking-[-.015em]">
            <Pair light="Why" bold="Chop?" />
          </h2>
          <ol className="mt-[clamp(40px,6vw,80px)]">
            {whys.map((w) => (
              <li key={w.title} className="grid gap-4 border-t border-cream/20 py-[clamp(28px,4vw,48px)] md:grid-cols-[1.4fr_1fr] md:items-baseline">
                <p className="font-display text-[clamp(28px,3.2vw,44px)] leading-[1.1]">{w.title}</p>
                <p className="max-w-[38ch] text-cream/70">{w.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Work */}
      <section className={sectionY}>
        <div className="container-x flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(40px,4.6vw,64px)] leading-[1.05] tracking-[-.015em]">
            <Pair light="Our" bold="Work." />
          </h2>
          <p className="max-w-[40ch] text-black/60">A taste of what leaves the chopping board. Scroll sideways for more.</p>
        </div>
        <div className="mt-[clamp(32px,4vw,56px)] flex snap-x snap-mandatory items-end gap-5 overflow-x-auto px-[max(clamp(20px,4vw,56px),calc((100vw-1440px)/2+56px))] pb-4 [scrollbar-width:none]">
          {work.map((w) => (
            <article key={w.title} className={`group relative w-[min(78vw,320px)] flex-none snap-start overflow-hidden rounded-[22px] ${w.h}`}>
              <Image src={img(w.src)} alt="" fill sizes="320px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                <p className={`${mono} text-cream/70`}>{w.tag}</p>
                <h3 className="mt-2 text-[28px] leading-tight">{w.title}</h3>
                <p className="mt-2 text-[15px] text-cream/80">“{w.quote}”</p>
                <span className={`${mono} mt-5 inline-flex items-center gap-2 rounded-full bg-cream/15 px-4 py-2 backdrop-blur-sm`}>
                  See more <Arrow />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Every format */}
      <section className="bg-[#1e1e1e] text-cream">
        <div className={`container-x ${sectionY}`}>
          <h2 className="mx-auto max-w-[18ch] text-center text-[clamp(40px,4.6vw,64px)] leading-[1.05] tracking-[-.015em]">
            <Pair light="One studio." bold="Every format." />
          </h2>
          <div className="mt-[clamp(40px,6vw,80px)] grid gap-5 md:grid-cols-2">
            <div className="flex flex-col justify-between gap-10 rounded-[24px] bg-[#2a2a2a] p-[clamp(24px,3vw,40px)]">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-[14px] bg-lime font-display text-[26px] font-semibold text-black">C</span>
                <div>
                  <p className="font-display text-[22px]">Chop brief</p>
                  <p className={`${mono} text-cream/50`}>Status: chopping</p>
                </div>
              </div>
              <ul className="divide-y divide-cream/10">
                {["Brand platform", "Logo & identity system", "Campaign key visual", "Website & launch deck", "Print, merch & signage"].map((d, i) => (
                  <li key={d} className="flex items-center justify-between py-4">
                    <span>{d}</span>
                    <span className={`${mono} ${i < 3 ? "text-lime" : "text-cream/40"}`}>{i < 3 ? "Done" : "Next"}</span>
                  </li>
                ))}
              </ul>
              <p className="max-w-[44ch] text-cream/60">
                Strategy, identity, campaigns and the website to match: one team holds the whole thread, so nothing gets lost between agencies.
              </p>
            </div>
            <figure className="relative min-h-[420px] overflow-hidden rounded-[24px]">
              <Image src={img("designers")} alt="Designers reviewing colour swatches together" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-[16px] bg-black/55 p-5 backdrop-blur-md">
                <p className="text-[17px]">Strategists, designers and copywriters who like a good yap and a tight deadline.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-cream/10 bg-[#1e1e1e] text-cream">
        <div className={`container-x ${sectionY}`}>
          <h2 className="text-[clamp(40px,4.6vw,64px)] leading-[1.05] tracking-[-.015em]">
            <Pair light="The" bold="Chop Shop." />
          </h2>
          <ul className="mt-[clamp(40px,6vw,72px)] border-b border-cream/15">
            {services.map((s) => (
              <li key={s.title}>
                <a
                  href="mailto:hej@chopcreative.com"
                  className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t border-cream/15 py-6 hover:no-underline md:grid-cols-[1.2fr_1fr_auto]"
                >
                  <span className="font-display text-[clamp(26px,3vw,40px)] leading-tight transition-colors group-hover:text-lime">{s.title}</span>
                  <span className="text-cream/60 max-md:hidden">{s.tag}</span>
                  <span className="grid size-12 place-items-center rounded-full bg-lime/85 text-black transition-[rotate,background-color] duration-200 group-hover:-rotate-45 group-hover:bg-lime">
                    <Arrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section id="who-we-are" className="bg-[#dee1e6]">
        <div className={`container-x ${sectionY}`}>
          <div className="grid gap-8 md:grid-cols-2 md:items-end">
            <h2 className="max-w-[14ch] text-[clamp(40px,4.6vw,64px)] leading-[1.05] tracking-[-.015em]">
              <Pair light="From brief to" bold="bite in three steps." />
            </h2>
            <p className="max-w-[46ch] text-[18px] leading-relaxed text-black/65 md:justify-self-end">
              No black box. You see the thinking, the sketches and the dead ends, and you leave with a brand your whole team can use.
            </p>
          </div>
          <div className="mt-[clamp(40px,6vw,72px)] grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.title} className="rounded-[22px] bg-cream p-8">
                <h3 className="text-[36px] font-semibold">{s.title}</h3>
                <p className="mt-3 text-black/65">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${sectionY} overflow-hidden`}>
        <h2 className="container-x text-center text-[clamp(40px,4.6vw,64px)] leading-[1.05] tracking-[-.015em]">
          <Pair light="Kind" bold="words." />
        </h2>
        <div className="mt-[clamp(32px,5vw,64px)] flex w-max animate-marquee gap-5 pr-5 hover:[animation-play-state:paused]">
          {[...quotes, ...quotes].map((t, i) => (
            <figure key={i} aria-hidden={i >= quotes.length} className="flex w-[360px] flex-none flex-col justify-between gap-8 rounded-[22px] bg-[#F6F6F1] p-7">
              <blockquote className="text-[19px] leading-snug">“{t.q}”</blockquote>
              <figcaption>
                <p className="font-medium">{t.who}</p>
                <p className={`${mono} mt-1 text-black/50`}>{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="container-x pb-[clamp(72px,10vw,144px)]">
        <div className="relative overflow-hidden rounded-[28px] bg-lime px-6 py-[clamp(64px,9vw,128px)] text-center text-black">
          <h2 className="text-[clamp(48px,7vw,104px)] leading-[1] tracking-[-.02em]">
            <Pair light="Wanna" bold="yap?" />
          </h2>
          <p className="mx-auto mt-6 max-w-[44ch] text-[18px] text-black/70">Tell us what you’re cooking. We’ll tell you how we’d chop it, free of charge and fluff.</p>
          <a
            href="mailto:hej@chopcreative.com"
            className="mt-10 inline-flex items-center gap-3 rounded-[12px] bg-black px-6 py-4 font-mono text-[14px] font-medium uppercase tracking-[.06em] text-lime transition-[rotate] duration-200 hover:-rotate-2 hover:no-underline"
          >
            Let’s Talk Chop <Arrow />
          </a>
        </div>
      </section>

      <footer className="border-t border-black/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-10">
          <Image src="/assets/chop-logo.png" alt="Chop Creative" width={1584} height={608} className="h-7 w-auto" />
          <p className={`${mono} text-black/50`}>© {new Date().getFullYear()} Chop Creative · hej@chopcreative.com</p>
        </div>
      </footer>
    </div>
  );
}
