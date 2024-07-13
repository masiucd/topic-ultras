import "./globals.css";
import "@radix-ui/themes/styles.css";

import {Theme} from "@radix-ui/themes";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {cookies} from "next/headers";
import type {ReactNode} from "react";

import {siteData, themeData} from "@/site-data";

const inter = Inter({subsets: ["latin"]});

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
      <body className={inter.className}>
        <Theme
          appearance="inherit"
          accentColor={themeData.accentColor}
          grayColor={themeData.grayColor}
          radius={themeData.radius}
          scaling={themeData.scaling}
          panelBackground={themeData.panelBackground}
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
