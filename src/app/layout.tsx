import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "~/components/ui/sonner";
import DndProviderWrapper from "./_components/dnd-provider-wrapper";

export const metadata: Metadata = {
  title: "SproutSpot",
  description: "Sprout Smarter, Grow Greener.",
  icons: [{ rel: "svg", url: "/icon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <DndProviderWrapper>
            {children}
            <Toaster position="top-left" expand={true} />
            <Analytics />
          </DndProviderWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
