"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "./ui";

const testimonials = [
  {
    client: "Elisity",
    quote:
      "Marketing is about values. It’s a complicated & noisy world, we’re not going to get a chance to get people to remember much about us.",
    name: "Charlie Treadwell",
    role: "CMO, Elisity",
    work: ["Brand Strategy", "Campaigns", "Brand Oversight"],
  },
  {
    client: "Diver",
    quote:
      "Marketing is about values. It’s a complicated & noisy world, we’re not going to get a chance to get people to remember much about us.",
    name: "Sebastian Ahmoud",
    role: "Diver, CEO",
    work: ["Illustration"],
  },
  {
    client: "Leavo",
    quote: "Client quote goes here. One or two sentences on what it was like to work with Chop.",
    name: "Full Name",
    role: "Title, Leavo",
    work: ["From content chaos to strategic consistency"],
  },
  {
    client: "Client name",
    quote:
      "Client quote goes here. Two or three sentences on what it was like to work with Chop and what changed for the business afterwards.",
    name: "Full Name",
    role: "Title, Company",
    work: ["Visual Identity", "Packaging"],
  },
  {
    client: "Client name",
    quote: "Client quote goes here. One or two sentences on what it was like to work with Chop.",
    name: "Full Name",
    role: "Title, Company",
    work: ["Website Design", "Sales Decks"],
  },
  {
    client: "Client name",
    quote:
      "Client quote goes here. Two or three sentences on what it was like to work with Chop and what changed for the business afterwards.",
    name: "Full Name",
    role: "Title, Company",
    work: ["Digital Ads", "Social Media"],
  },
];

function QuoteMark() {
  return (
    <svg aria-hidden viewBox="0 0 48 36" className="w-[clamp(36px,3.4vw,48px)] fill-current">
      <path d="M0 36V20C0 9 6 2 18 0l2 6c-6 2-9 6-9 10h9v20H0Zm28 0V20C28 9 34 2 46 0l2 6c-6 2-9 6-9 10h9v20H28Z" />
    </svg>
  );
}

function ClientMark() {
  return (
    <svg aria-hidden viewBox="0 0 46 64" className="h-[clamp(44px,4.4vw,64px)] flex-none">
      <path d="M38 8 9 25M9 40l29 16" fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" />
      <path d="M37 25v14l-12-7z" fill="currentColor" />
    </svg>
  );
}

function TestimonialCopy({ clone }: { clone?: boolean }) {
  return (
    <ul
      aria-hidden={clone || undefined}
      data-mq-clone={clone || undefined}
      className="m-0 flex list-none gap-[clamp(28px,8vw,120px)] p-0 pr-[clamp(28px,8vw,120px)]"
    >
      {testimonials.map((t, i) => (
        <li key={i} className="w-[min(84vw,680px)] flex-none">
          <figure className="m-0 flex h-full flex-col">
            <Eyebrow className="mb-4">{t.client}</Eyebrow>
            <QuoteMark />
            <blockquote className="m-0 mt-5 mb-[clamp(32px,4vw,64px)] text-[clamp(22px,2.2vw,32px)] leading-[1.25] font-medium tracking-[-.01em] text-pretty">
              {t.quote}
            </blockquote>
            <figcaption className="mt-auto">
              <div className="flex items-center justify-between gap-6 border-b-[1.5px] border-current/20 pb-6">
                <div className="text-[clamp(17px,1.4vw,20px)] leading-[1.35] font-semibold">
                  <div>{t.name}</div>
                  <div>{t.role}</div>
                </div>
                <ClientMark />
              </div>
              <div className="mt-3 text-right text-sm">{t.work.join(" | ")}</div>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

const SPEED = 55; // px per second while drifting on its own
const HOLD = 4000; // ms to stay on a review after the visitor browsed to it

const mod = (n: number, m: number) => ((n % m) + m) % m;
const pad = (n: number) => String(n).padStart(2, "0");

const arrowCls =
  "grid aspect-square w-[clamp(44px,4vw,60px)] cursor-pointer place-items-center rounded-full border-[1.5px] border-current text-[clamp(20px,1.8vw,26px)] transition-[background-color,color,rotate] duration-200 hover:-rotate-6 hover:bg-black hover:text-lime";

export default function Testimonials() {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const browseRef = useRef<(dir: 1 | -1) => void>(() => {});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current!;
    const viewport = viewportRef.current!;
    const track = trackRef.current!;
    const controls = controlsRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let copyW = 0;
    let step = 0;
    let gutter = 0;
    let x = 0;
    let v = 0;
    let target: number | null = null;
    let resumeAt = 0;
    let hovered = false;
    let focused = false;
    let shown = 0;
    let drag: { id: number; startX: number; startPos: number; lastX: number; lastT: number; vel: number; moved: boolean } | null =
      null;

    const measure = () => {
      const w = (track.firstElementChild as HTMLElement).offsetWidth;
      if (copyW && w !== copyW) {
        x *= w / copyW;
        if (target !== null) target *= w / copyW;
      }
      copyW = w;
      step = w / testimonials.length;
      gutter = controls.getBoundingClientRect().left + parseFloat(getComputedStyle(controls).paddingLeft);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);

    browseRef.current = (dir) => {
      const base = target ?? x;
      target = (dir > 0 ? Math.floor((base + 1) / step) + 1 : Math.ceil((base - 1) / step) - 1) * step;
      resumeAt = performance.now() + HOLD;
    };

    let t = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(Math.max((now - t) / 1000, 0), 0.05);
      t = now;
      if (!drag) {
        if (target !== null) {
          x += (target - x) * (reduced.matches ? 1 : Math.min(1, dt * 9));
          if (Math.abs(target - x) < 0.5) {
            x = target;
            target = null;
          }
          v = 0;
        } else {
          const still = hovered || focused || reduced.matches || now < resumeAt;
          v += ((still ? 0 : SPEED) - v) * Math.min(1, dt * 6);
          x += v * dt;
        }
      }
      if (copyW) {
        // Offset by the gutter so a settled card lines up with the page container
        track.style.transform = `translate3d(${-mod(x - gutter, copyW).toFixed(2)}px,0,0)`;
        const i = mod(Math.round(x / step), testimonials.length);
        if (i !== shown) {
          shown = i;
          setIndex(i);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag = { id: e.pointerId, startX: e.clientX, startPos: x, lastX: e.clientX, lastT: e.timeStamp, vel: 0, moved: false };
      target = null;
      v = 0;
      viewport.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (drag?.id !== e.pointerId) return;
      const dx = e.clientX - drag.startX;
      x = drag.startPos - dx;
      if (Math.abs(dx) > 4) drag.moved = true;
      const ms = e.timeStamp - drag.lastT;
      if (ms > 0) drag.vel = ((drag.lastX - e.clientX) / ms) * 1000;
      drag.lastX = e.clientX;
      drag.lastT = e.timeStamp;
    };
    const onUp = (e: PointerEvent) => {
      if (drag?.id !== e.pointerId) return;
      if (drag.moved) target = Math.round((x + drag.vel * 0.18) / step) * step;
      resumeAt = performance.now() + HOLD;
      drag = null;
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = (e: FocusEvent) => {
      focused = (e.target as Element).matches(":focus-visible");
    };
    const onFocusOut = () => {
      focused = false;
    };

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  return (
    <section data-bg="#EEEEE6" data-fg="#000" className="pb-[clamp(72px,10vw,144px)]">
      <div ref={rootRef} role="region" aria-roledescription="carousel" aria-label="Client testimonials">
        {/* pan-y keeps vertical page scrolling on touch while horizontal swipes browse the reviews */}
        <div ref={viewportRef} className="cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing">
          <div ref={trackRef} className="flex w-max">
            <TestimonialCopy />
            <TestimonialCopy clone />
          </div>
        </div>
        <div ref={controlsRef} className="container-x mt-[clamp(28px,3vw,44px)] flex items-center justify-between gap-6">
          <div className="text-sm font-semibold tabular-nums">
            {pad(index + 1)} / {pad(testimonials.length)}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous review" onClick={() => browseRef.current(-1)} className={arrowCls}>
              <span aria-hidden>←</span>
            </button>
            <button type="button" aria-label="Next review" onClick={() => browseRef.current(1)} className={arrowCls}>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
