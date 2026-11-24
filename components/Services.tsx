"use client";

import { useState } from "react";
import Image from "next/image";
import { focus } from "@/lib/image";
import type { HomePage, Service } from "@/lib/sanity";
import { Eyebrow, ImagePlaceholder } from "./ui";

const ease = "cubic-bezier(.2,.8,.2,1)";

// Titles are shown with a full stop, so drop one typed in the Studio
const name = (s: Service) => s.title.replace(/\.$/, "");

export default function Services({ content, services }: { content: HomePage["services"]; services: Service[] }) {
  const [acc, setAcc] = useState(0);
  const last = services.length - 1;

  return (
    <section
      data-bg="#EEEEE6"
      data-fg="#000"
      className="container-x relative pt-[clamp(96px,12vw,176px)] pb-[clamp(72px,10vw,144px)]"
    >
      <div className="mb-[clamp(32px,4vw,56px)] flex flex-col gap-4">
        {content.eyebrow && <Eyebrow>{content.eyebrow}</Eyebrow>}
        <h2 className="max-w-[10em] text-[clamp(40px,5.6vw,92px)] leading-[.96] tracking-[-.03em] text-balance">
          {content.heading}
        </h2>
      </div>

      {services.map((s, i) => {
        const open = acc === i;
        const hideBorder = acc === i || acc === i - 1;
        return (
          <div
            key={s._id}
            className="border-t-[1.5px] transition-[border-color] duration-300"
            style={{ borderColor: hideBorder ? "transparent" : "currentColor" }}
          >
            <div
              className="rounded-[clamp(20px,2.4vw,32px)]"
              style={{
                background: open ? "#000" : "transparent",
                color: open ? "#EEEEE6" : "inherit",
                paddingInline: open ? "clamp(20px,2.6vw,40px)" : 0,
                transition: `background .4s ease, padding .45s ${ease}`,
              }}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`svc-${i}`}
                onClick={() => setAcc(open ? -1 : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-[clamp(18px,2vw,28px)] text-left transition-[padding] duration-[350ms] hover:pl-[clamp(10px,1.4vw,22px)]"
                style={{ transitionTimingFunction: ease }}
              >
                <span
                  className="font-display text-[clamp(32px,4.6vw,72px)] leading-none font-medium tracking-[-.02em] transition-colors duration-300"
                  style={{ color: open ? "#E5FF2F" : "inherit" }}
                >
                  {name(s)}.
                </span>
                <span
                  aria-hidden
                  className="grid aspect-square w-[clamp(44px,4vw,60px)] flex-none place-items-center rounded-full border-[1.5px] border-current text-[clamp(22px,2vw,30px)] font-normal"
                  style={{
                    transform: open ? "rotate(45deg)" : "none",
                    background: open ? "#E5FF2F" : "transparent",
                    color: open ? "#000" : "inherit",
                    borderColor: open ? "#E5FF2F" : "currentColor",
                    transition: "transform .35s cubic-bezier(.3,1.4,.5,1), background .2s, color .2s, border-color .2s",
                  }}
                >
                  +
                </span>
              </button>

              <div
                id={`svc-${i}`}
                className="grid"
                style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: `grid-template-rows .5s ${ease}` }}
              >
                <div className="min-h-0 overflow-hidden" inert={!open}>
                  <div
                    className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-[clamp(32px,5vw,80px)] gap-y-7 pt-[clamp(4px,1vw,12px)] pb-[clamp(24px,3vw,40px)]"
                    style={{ opacity: open ? 1 : 0, transition: "opacity .35s" }}
                  >
                    <div className="flex flex-col gap-[clamp(24px,3vw,40px)]">
                      <p className="max-w-[22em] text-[clamp(20px,2vw,28px)] leading-[1.3] font-medium tracking-[-.01em] text-pretty">
                        {s.text}
                      </p>
                      <div className="flex flex-col gap-3.5">
                        {content.chipsLabel && <Eyebrow>{content.chipsLabel}</Eyebrow>}
                        <div className="flex flex-wrap gap-2.5">
                          {s.chips?.map((c) => (
                            <span
                              key={c}
                              className="rounded-full border-[1.5px] border-black bg-cream px-[18px] py-[9px] text-base font-medium text-black"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {s.image ? (
                      <Image
                        src={s.image.url}
                        alt={s.image.alt ?? ""}
                        width={s.image.width}
                        height={s.image.height}
                        sizes="(max-width: 760px) 100vw, 50vw"
                        className="aspect-[16/10] min-h-[200px] w-full rounded-[20px] object-cover"
                        style={{ objectPosition: focus(s.image) }}
                      />
                    ) : (
                      <ImagePlaceholder
                        label={`Case image · ${name(s)}`}
                        className="aspect-[16/10] min-h-[200px] rounded-[20px]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div
        className="border-t-[1.5px] transition-[border-color] duration-300"
        style={{ borderColor: acc === last ? "transparent" : "currentColor" }}
      />
    </section>
  );
}
