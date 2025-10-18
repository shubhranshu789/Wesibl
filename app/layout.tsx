import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // 👈 new wrapper
import CursorEffect from "../app/CursorEffect"

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "Wesibl",
  description: "Created with v0",
  generator: "v0.app",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className="h-full bg-[#0b0e17] text-white">
        <CursorEffect/>
        <ClientLayout>{children}</ClientLayout>
         {/* {children} */}
        <Analytics />
      </body>
    </html>
  );
}
