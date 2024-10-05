import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";

const GEIST_SANS = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const GEIST_MONO = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nutri Check",
  description: "Nutri check | Calculate your food nutrients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GEIST_SANS.variable}${GEIST_MONO.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
