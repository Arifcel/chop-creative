import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chop Creative",
  description:
    "Lick-your-chops good branding. A brand & advertising agency from Stockholm, San Francisco and the Pacific Northwest.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        {/* One family per request: Fontshare drops Clash Display when both are combined in one URL */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@300,500,600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
