import localFont from "next/font/local";

// Brand typography per YGS brand kit:
// Titles: Cooper Hewitt (Bold Italic priority) — ALL CAPS
// H1/H2: Clear Sans Bold
// Body: Source Sans Pro

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

export const clearSans = localFont({
  src: [
    { path: "../public/fonts/clear-sans-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/clear-sans-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clear-sans",
  display: "swap",
});

export const sourceSansPro = localFont({
  src: [
    { path: "../public/fonts/source-sans-pro-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/source-sans-pro-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-source-sans",
  display: "swap",
});
