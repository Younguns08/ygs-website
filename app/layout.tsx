import type { Metadata } from "next";
import { cooperHewitt, clearSans, sourceSansPro } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ygstudio.ca"),
  title: {
    default: "Young Guns Studio | Vancouver Art Portfolio Program",
    template: "%s | Young Guns Studio",
  },
  description:
    "Vancouver's premier art & design studio for ambitious teens. 900+ offers to top universities. Portfolio prep, creative intelligence, and identity coaching. Book a consult.",
  openGraph: {
    type: "website",
    siteName: "Young Guns Studio",
    title: "Young Guns Studio | Vancouver Art Portfolio Program",
    description:
      "Vancouver's premier art & design studio for ambitious teens. 900+ offers to top universities. Portfolio prep, creative intelligence, and identity coaching.",
    url: "https://ygstudio.ca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cooperHewitt.variable} ${clearSans.variable} ${sourceSansPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
