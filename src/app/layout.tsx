import "./globals.css";

import type {Metadata} from "next";
import {Inter} from "next/font/google";
import type {ReactNode} from "react";

import {appData} from "@/lib/config";

const inter = Inter({subsets: ["latin"]});

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
