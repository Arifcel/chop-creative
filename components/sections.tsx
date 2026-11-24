import Image from "next/image";
import { focus } from "@/lib/image";
import type { HomePage } from "@/lib/sanity";
import { Eyebrow, Pill, Sticker, navLinks } from "./ui";

const sectionY = "py-[clamp(72px,10vw,144px)]";

export function Hero({ content }: { content: HomePage["hero"] }) {
  return (
    <section data-bg="#EEEEE6" data-fg="#000" className="relative">
      <div className="container-x pt-[clamp(56px,9vw,140px)] pb-[clamp(64px,8vw,120px)]">
        <h1 className="max-w-[8.5em] text-[clamp(48px,8.8vw,160px)] leading-[.92] tracking-[-.03em] text-balance">
          {content.title}
        </h1>
        {content.subtitle && (
          <p className="mt-[clamp(16px,2vw,28px)] font-display text-[clamp(24px,3vw,48px)] leading-[1.05] font-medium tracking-[-.02em] text-balance">
            {content.subtitle}
          </p>
        )}
        <div className="mt-[clamp(40px,5vw,72px)] flex flex-wrap items-end justify-between gap-x-16 gap-y-7">
          <p className="max-w-[30em] text-[clamp(18px,1.6vw,22px)] leading-[1.45] text-pretty">{content.intro}</p>
          {content.ctaLabel && <Pill href="#contact">{content.ctaLabel} →</Pill>}
        </div>
      </div>
      <Sticker name="walk" rot={10} className="absolute top-[10%] right-[5%] w-[clamp(120px,15vw,240px)]" />
    </section>
  );
}

// Motion per row stays in code; the words come from Sanity
const rows = [
  { key: "row1", speed: 0.5, dir: 1, inverted: false },
  { key: "row2", speed: 0.62, dir: -1, inverted: true },
  { key: "row3", speed: 0.44, dir: 1, inverted: false },
] as const;

function MarqueeCopy({ items, inverted, clone }: { items: string[]; inverted?: boolean; clone?: boolean }) {
  const hover = inverted ? "hover:bg-[var(--bg)] hover:text-[var(--fg)]" : "hover:bg-[var(--fg)] hover:text-[var(--bg)]";
  return (
    <div className="flex gap-[.4em] pr-[.4em]" aria-hidden={clone || undefined} data-mq-clone={clone || undefined}>
      {items.map((item, i) => (
        <span key={i} data-svc className={`cursor-default rounded-[.12em] px-[.06em] transition-colors duration-150 ${hover}`}>
          {item.replace(/\.$/, "")}.
        </span>
      ))}
    </div>
  );
}

export function WordWall({ content }: { content: HomePage["wordWall"] }) {
  return (
    <section id="services" data-bg="#E5FF2F" data-fg="#000" className={sectionY}>
      <div className="container-x">
        <h2 className="mb-[clamp(40px,5vw,72px)] max-w-[10em] text-[clamp(40px,5.6vw,92px)] leading-[.96] tracking-[-.03em]">
          <span className="mark" data-mark>
            <span>{content.heading}</span>
          </span>
        </h2>
        <div className="ml-[calc(50%-50vw)] w-screen font-display text-[clamp(40px,6vw,104px)] leading-[1.12] font-medium tracking-[-.02em] whitespace-nowrap">
          {rows.map((row) => ({ ...row, items: content[row.key] ?? [] })).filter((row) => row.items.length).map((row, i) => (
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
        {content.footnote && <p className="mt-[clamp(28px,3vw,44px)] text-[17px] leading-normal">{content.footnote}</p>}
      </div>
    </section>
  );
}

export function About({ content }: { content: HomePage["about"] }) {
  // The sticker hangs on the last word, so keep that word on its own
  const words = content.heading.trim().split(/\s+/);
  const last = words.pop();
  return (
    <section id="about" data-bg="#000" data-fg="#EEEEE6" className={sectionY}>
      <div className="container-x">
        <h2 className="max-w-[8em] text-[clamp(52px,9vw,164px)] leading-[.92] tracking-[-.03em]">
          {words.length > 0 && `${words.join(" ")} `}
          <span className="whitespace-nowrap">
            {last}
            {/* Wrapper carries the scroll motion so it doesn't fight the sticker's drag transform */}
            <span data-parallax="1" className="ml-[.4em] inline-block align-middle">
              <Sticker name="fangs" rot={-8} className="relative block w-[1.25em]" />
            </span>
          </span>
        </h2>
        <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-20 gap-y-8">
          <p className="max-w-[26em] text-[clamp(20px,2vw,28px)] leading-[1.3] font-medium tracking-[-.01em]">
            {content.body}
          </p>
          {content.ctaLabel && (
            <div>
              <Pill href="#" variant="lime">
                {content.ctaLabel} →
              </Pill>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Studio({ image }: { image: HomePage["about"]["image"] }) {
  if (!image) return null;
  return (
    <div data-bg="#000" data-fg="#EEEEE6" className="container-x relative">
      <Image
        src={image.url}
        alt={image.alt ?? ""}
        width={image.width}
        height={image.height}
        sizes="(max-width: 1440px) 100vw, 1440px"
        className="aspect-[16/7] min-h-[260px] w-full rounded-[28px] object-cover"
        style={{ objectPosition: focus(image) }}
      />
    </div>
  );
}

export function WhoWeAre({ content }: { content: HomePage["whoWeAre"] }) {
  return (
    <section id="who-we-are" data-bg="#000" data-fg="#EEEEE6" className={`relative ${sectionY}`}>
      <div className="container-x">
        {content.eyebrow && <Eyebrow className="mb-5">{content.eyebrow}</Eyebrow>}
        <h2 className="max-w-[9em] text-[clamp(48px,8vw,140px)] leading-[.92] tracking-[-.03em]">{content.heading}</h2>
        <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-20 gap-y-8 text-[clamp(18px,1.6vw,22px)] leading-normal">
          {content.paragraphs?.map((p, i) => (
            <p key={i} className="max-w-[30em]">
              {p}
            </p>
          ))}
        </div>
      </div>
      <Sticker name="peace" rot={12} className="absolute top-[8%] right-[6%] w-[clamp(110px,12vw,190px)]" />
    </section>
  );
}

export function Contact({ content }: { content: HomePage["contact"] }) {
  return (
    <section
      id="contact"
      data-bg="#E5FF2F"
      data-fg="#000"
      className="relative pt-[clamp(96px,12vw,176px)] pb-[clamp(72px,9vw,128px)]"
    >
      <div className="container-x">
        <h2 className="text-[clamp(64px,12vw,220px)] leading-[.88] tracking-[-.035em]">{content.heading}</h2>
        <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-20 gap-y-8">
          <p className="max-w-[30em] text-[clamp(18px,1.6vw,22px)] leading-[1.45]">{content.body}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3.5">
            {content.ctaLabel && <Pill href={`mailto:${content.email}`}>{content.ctaLabel} →</Pill>}
            <a href={`mailto:${content.email}`} className="text-lg font-medium">
              {content.email}
            </a>
          </div>
        </div>
      </div>
      <Sticker name="tongue" rot={-8} className="absolute top-[12%] right-[4%] w-[clamp(120px,14vw,220px)]" />
    </section>
  );
}

export function Footer({ content, email }: { content: HomePage["footer"]; email: string }) {
  return (
    <footer data-bg="#EEEEE6" data-fg="#000" className="pt-[clamp(56px,7vw,96px)] pb-10">
      <div className="container-x">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] items-start gap-8 border-t-[1.5px] border-current pt-10 text-base leading-normal">
          <a href="#top" aria-label="Chop Creative">
            <Image src="/assets/chop-logo.png" alt="Chop Creative" width={1584} height={608} className="h-11 w-auto" />
          </a>
          <div className="flex flex-col gap-1">
            {content.tagline && <span>{content.tagline}</span>}
            {content.locations && <span>{content.locations}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <a href={`mailto:${email}`}>{email}</a>
            {content.website && <a href={content.website}>{content.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>}
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
