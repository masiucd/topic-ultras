import "./globals.css";
import "@radix-ui/themes/styles.css";

import {Theme} from "@radix-ui/themes";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ThemeProvider} from "next-themes";
import type {ReactNode} from "react";

import {appData} from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: appData.title,
  description: appData.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Theme
            accentColor="crimson"
            grayColor="slate"
            radius="large"
            scaling="95%"
          >
            {children}
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
