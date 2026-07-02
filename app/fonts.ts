import { Inter, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";

// Measured from the live Framer site (reference/styles-home.json):
// headings + UI use Inter Variable (opsz axis), nav/body use Source Sans 3.
// next/font self-hosts both at build time — no runtime Google requests.

export const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
});

// Cooper Hewitt is the brand display face used on inner-page title banners
// (e.g. "YOUNG GUNS OUTCOMES") — self-hosted, from the original site.
export const cooperHewitt = localFont({
  src: [
    { path: "../public/fonts/cooper-hewitt-book.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/cooper-hewitt-medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/cooper-hewitt-medium-italic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/cooper-hewitt-semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/cooper-hewitt-bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/cooper-hewitt-bold-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-cooper-hewitt",
  display: "swap",
});
