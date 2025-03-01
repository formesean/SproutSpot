import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "~/components/ui/sonner";
import DndContextWrapper from "./_components/dnd-context-wrapper";

export const metadata: Metadata = {
  title: "SproutSpot",
  description: "Sprout Smarter, Grow Greener.",
  icons: [{ rel: "svg", url: "/icon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <DndContextWrapper>
            {children}
            <Toaster position="top-left" expand={true} />
            <Analytics />
          </DndContextWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
