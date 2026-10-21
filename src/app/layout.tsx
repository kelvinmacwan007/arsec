import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/products.css";
import "../styles/brand.css";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
export const metadata: Metadata = {
  title: {
    default: "Arsec — Technology that keeps work moving",
    template: "%s | Arsec",
  },
  description:
    "Explore Arsec products, technology solutions, enterprise capabilities, and platform services.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
