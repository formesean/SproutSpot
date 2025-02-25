import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "SproutSpot",
  description: "Sprout Smarter, Grow Greener.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          {children}
          <Analytics />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
