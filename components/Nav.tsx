"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const services = [
  "Brand strategy",
  "Visual identity",
  "Advertising",
  "Websites & decks",
  "Print & events",
  "Creative direction",
];

const links = [
  { label: "About", href: "#about" },
  { label: "Chop Shop", href: "#services", menu: services },
  { label: "Who we are", href: "#who-we-are" },
  { label: "Contact", href: "#contact" },
];

const linkCls =
  "inline-flex items-center gap-1.5 rounded-[10px] px-3 py-2 text-[17px] font-medium transition-colors duration-150 hover:bg-black/[.06] hover:no-underline";
const btnBase =
  "inline-flex items-center justify-center whitespace-nowrap rounded-[12px] px-[22px] py-3 text-[17px] font-medium transition-[background-color,color,rotate] duration-200 hover:-rotate-2 hover:no-underline";

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 10 6"
      className="w-2.5 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "none" }}
    >
      <path d="M0 0h10L5 6z" fill="currentColor" />
    </svg>
  );
}

export default function Nav({ base = "" }: { base?: string }) {
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = () => {
      setMenu(null);
      setMobile(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    setMenu(null);
    setMobile(false);
  };

  return (
    <header className="container-x sticky top-3 z-50 pt-3">
      <nav
        ref={ref}
        aria-label="Main"
        className="rounded-[20px] bg-[#F6F6F1]/90 text-black shadow-[0_1px_0_rgba(0,0,0,.04),0_8px_30px_-12px_rgba(0,0,0,.18)] backdrop-blur-md"
      >
        <div className="flex items-center gap-6 py-3 pr-3 pl-[clamp(16px,2vw,32px)]">
          <a href={base + "#top"} aria-label="Chop Creative" onClick={close} className="flex-none hover:no-underline">
            <Image src="/assets/chop-logo.png" alt="Chop Creative" width={1584} height={608} priority className="h-8 w-auto" />
          </a>

          <ul className="mx-auto hidden items-center gap-1 lg:flex">
            {links.map((l) =>
              l.menu ? (
                <li
                  key={l.label}
                  className="relative"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setMenu(l.label)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={menu === l.label}
                    aria-controls="nav-menu"
                    onClick={() => setMenu(menu === l.label ? null : l.label)}
                    className={`${linkCls} cursor-pointer`}
                  >
                    {l.label}
                    <Caret open={menu === l.label} />
                  </button>
                  {/* pt-3 bridges the gap so the panel stays open while the pointer moves down */}
                  <div
                    id="nav-menu"
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-[opacity,translate] duration-200"
                    style={{
                      opacity: menu === l.label ? 1 : 0,
                      translate: menu === l.label ? "0 0" : "0 -6px",
                      pointerEvents: menu === l.label ? "auto" : "none",
                    }}
                    inert={menu !== l.label}
                  >
                    <ul className="w-64 rounded-[16px] bg-[#F6F6F1] p-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,.28)]">
                      {l.menu.map((s) => (
                        <li key={s}>
                          <a href={base + l.href} onClick={close} className={`${linkCls} w-full`}>
                            {s}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={l.label}>
                  <a href={base + l.href} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ),
            )}
            <li aria-hidden className="mx-3 h-6 w-px bg-black/15" />
            <li>
              <a href="#" className={linkCls}>
                Yappy Hour
              </a>
            </li>
          </ul>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            {/* Plain lead-in to the button next to it, not a link */}
            <span className="inline-flex items-center gap-2 px-3 text-[17px] font-medium max-xl:hidden">
              Wanna yap?
              <span aria-hidden>→</span>
            </span>
            <a href={base + "#contact"} className={`${btnBase} bg-black text-cream hover:bg-lime hover:text-black max-sm:hidden`}>
              Let’s Talk Chop
            </a>
            <a href="mailto:hej@chopcreative.com" className={`${btnBase} bg-lime text-black hover:bg-black hover:text-lime max-sm:hidden`}>
              Start a project
            </a>
            <button
              type="button"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              aria-controls="nav-mobile"
              onClick={() => setMobile(!mobile)}
              className="grid size-12 cursor-pointer place-items-center rounded-[12px] hover:bg-black/[.06] lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className="absolute left-0 h-[2px] w-full bg-current transition-[top,rotate] duration-200"
                  style={{ top: mobile ? 5 : 0, rotate: mobile ? "45deg" : "0deg" }}
                />
                <span
                  className="absolute left-0 h-[2px] w-full bg-current transition-[top,rotate] duration-200"
                  style={{ top: mobile ? 5 : 10, rotate: mobile ? "-45deg" : "0deg" }}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="nav-mobile"
          className="grid transition-[grid-template-rows] duration-300 lg:hidden"
          style={{ gridTemplateRows: mobile ? "1fr" : "0fr" }}
        >
          <div className="min-h-0 overflow-hidden" inert={!mobile}>
            <div className="flex flex-col gap-1 border-t border-black/10 px-3 pt-3 pb-4">
              {[...links, { label: "Yappy Hour", href: "#" }].map((l) => (
                <a key={l.label} href={base + l.href} onClick={close} className={`${linkCls} font-display text-[26px]`}>
                  {l.label}
                </a>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
                <a href={base + "#contact"} onClick={close} className={`${btnBase} bg-black text-cream`}>
                  Let’s Talk Chop
                </a>
                <a href="mailto:hej@chopcreative.com" className={`${btnBase} bg-lime text-black`}>
                  Start a project
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
