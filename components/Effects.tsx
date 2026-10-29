"use client";

import { useEffect } from "react";

type DragState = { x: number; y: number; r: number };
type DragEl = HTMLElement & { __drag?: DragState };
type MarkEl = HTMLElement & { __p?: number; __mk?: string };
type MarqueeEl = HTMLElement & { __x?: number; __v?: number };
type ParallaxEl = HTMLElement & { __p?: number };

const PICS = ["tongue", "teeth", "fangs", "walk", "peace"];

// Page-wide interactions: draggable stickers, scroll-driven colours, cursor follower, marks and marquees.
export default function Effects() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-root]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Draggable stickers
    let z = 20;
    let active: DragEl | null = null;
    let sx = 0;
    let sy = 0;
    const apply = (el: DragEl, s: number, r: number) => {
      const d = el.__drag!;
      el.style.transform = `translate(${d.x}px,${d.y}px) rotate(${r}deg) scale(${s})`;
    };

    // Cursor follower
    const follower = document.createElement("img");
    follower.alt = "";
    follower.setAttribute("aria-hidden", "true");
    Object.assign(follower.style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: "150px",
      pointerEvents: "none",
      zIndex: "60",
      opacity: "0",
      transition: "opacity .2s, transform .12s ease-out",
      transform: "translate(-50%,-50%) scale(.6)",
    });
    document.body.appendChild(follower);
    let lastItem: Element | null = null;
    let pi = -1;
    let rot = 0;
    const follow = (e: PointerEvent) => {
      const item = (e.target as Element | null)?.closest?.("[data-svc]") ?? null;
      if (item && !active) {
        if (item !== lastItem) {
          lastItem = item;
          pi = (pi + 1) % PICS.length;
          rot = Math.round(Math.random() * 30 - 15);
          follower.src = `/assets/chomp-${PICS[pi]}.png`;
        }
        follower.style.opacity = "1";
        follower.style.left = `${e.clientX + 70}px`;
        follower.style.top = `${e.clientY - 40}px`;
        follower.style.transform = `translate(-50%,-50%) rotate(${rot}deg) scale(1)`;
      } else {
        follower.style.opacity = "0";
        follower.style.transform = "translate(-50%,-50%) scale(.6)";
        lastItem = null;
      }
    };

    const onDown = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<DragEl>("[data-drag]");
      if (!el) return;
      e.preventDefault();
      el.__drag ??= { x: 0, y: 0, r: Number(el.dataset.rot) || 0 };
      active = el;
      sx = e.clientX - el.__drag.x;
      sy = e.clientY - el.__drag.y;
      el.style.zIndex = String(++z);
      el.style.cursor = "grabbing";
      el.style.transition = "transform .18s ease";
      apply(el, 1.08, el.__drag.r * 0.2);
    };
    const onMove = (e: PointerEvent) => {
      if (active) {
        const d = active.__drag!;
        d.x = e.clientX - sx;
        d.y = e.clientY - sy;
        active.style.transition = "none";
        apply(active, 1.08, d.r * 0.2);
      }
      follow(e);
    };
    const onUp = () => {
      if (!active) return;
      active.style.cursor = "grab";
      active.style.transition = "transform .45s cubic-bezier(.2,1.8,.4,1)";
      apply(active, 1, active.__drag!.r);
      active = null;
    };

    // Scroll-driven background / foreground
    let curBg = "";
    const applyBg = () => {
      if (!root) return;
      let bg = "#EEEEE6";
      let fg = "#000";
      const probe = window.innerHeight * 0.55;
      document.querySelectorAll<HTMLElement>("[data-bg]").forEach((s) => {
        if (s.getBoundingClientRect().top <= probe) {
          bg = s.dataset.bg!;
          fg = s.dataset.fg || fg;
        }
      });
      if (bg === curBg) return;
      curBg = bg;
      root.style.backgroundColor = bg;
      root.style.color = fg;
      root.style.setProperty("--bg", bg);
      root.style.setProperty("--fg", fg);
    };
    let bgRaf = 0;
    const onScroll = () => {
      if (bgRaf) return;
      bgRaf = requestAnimationFrame(() => {
        bgRaf = 0;
        applyBg();
      });
    };
    applyBg();

    // Marks, marquees + parallax stickers
    const parallax = Array.from(document.querySelectorAll<ParallaxEl>("[data-parallax]"));
    const marks = Array.from(document.querySelectorAll<MarkEl>("[data-mark]"));
    const marquees = Array.from(document.querySelectorAll<MarqueeEl>("[data-mq]"));
    let t = performance.now();
    let lastY = window.scrollY;
    let boost = 0;
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(Math.max((now - t) / 1000, 0), 0.05);
      t = now;
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      boost = Math.max(boost * 0.92, dt ? Math.min(dy / dt / 300, 5) : 0);

      const vh = window.innerHeight;
      for (const m of marks) {
        const top = m.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.4)));
        m.__p = (m.__p ?? 0) + (p - (m.__p ?? 0)) * Math.min(1, dt * 8);
        const mk = `${(m.__p * 100).toFixed(2)}%`;
        if (mk !== m.__mk) {
          m.__mk = mk;
          m.style.setProperty("--mk", mk);
        }
      }

      for (const mq of marquees) {
        const orig = mq.querySelector<HTMLElement>(":scope > :not([data-mq-clone])");
        const w = orig?.offsetWidth ?? 0;
        if (reduced.matches || !orig || !w) continue;
        const speed = Number(mq.dataset.speed) || 0.5;
        const dir = Number(mq.dataset.dir) || 1;
        const target = mq.parentElement?.matches(":hover") ? 0 : speed * orig.offsetHeight * (1 + boost);
        mq.__v = (mq.__v ?? target) + (target - (mq.__v ?? target)) * Math.min(1, dt * 6);
        mq.__x = ((((mq.__x ?? 0) - mq.__v * dt * dir) % w) - w) % w;
        mq.style.transform = `translate3d(${mq.__x}px,0,0)`;
      }

      // -1 below the viewport centre, +1 above it; eased so the motion trails the scroll a little
      for (const el of parallax) {
        if (reduced.matches) continue;
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(-1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2)));
        el.__p = (el.__p ?? p) + (p - (el.__p ?? p)) * Math.min(1, dt * 6);
        const k = Number(el.dataset.parallax) || 1;
        const q = el.__p * k;
        el.style.transform = `translate3d(${(q * 18).toFixed(2)}px,${(q * -60).toFixed(2)}px,0) rotate(${(q * -18).toFixed(2)}deg)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(bgRaf);
      follower.remove();
    };
  }, []);

  return null;
}
