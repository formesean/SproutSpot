import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "SproutSpot",
  description: "Sprout Smarter, Grow Greener.",
  icons: "/icon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          {children}
          <Toaster
            position="top-left"
            expand={true}
            className="!z-40 !border-[#15803d] !bg-white !py-0"
          />
          <Analytics />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
