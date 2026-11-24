import type { SanityImage } from "./sanity";

// Focal point chosen in the Studio, as a CSS object-position. Kept apart from
// lib/sanity.ts so client components don't pull the Sanity client into the bundle.
export const focus = (img: SanityImage) =>
  img.hotspot ? `${(img.hotspot.x * 100).toFixed(1)}% ${(img.hotspot.y * 100).toFixed(1)}%` : undefined;
