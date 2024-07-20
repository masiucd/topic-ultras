import "./globals.css";

import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import {cookies} from "next/headers";
import type {ReactNode} from "react";

import {cn} from "@/lib/utils";
import {siteData} from "@/site-data";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export let metadata: Metadata = {
  title: siteData.title,
  description: siteData.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  let cookieStore = cookies();
  let storedTheme = cookieStore.get("theme");
  return (
    <html lang="en" className={storedTheme?.value === "light" ? "dark" : ""}>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
