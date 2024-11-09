import {ThemeButton} from "@/components/theme-button";
import Link from "next/link";
import Nav from "./_components/nav";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <div className="mx-auto flex h-20 max-w-7xl items-center border border-red-500">
          <Link
            href="/"
            className="transition-all duration-150 hover:underline hover:opacity-55"
          >
            <strong>Nutri Check</strong>
          </Link>
          <Nav />
          <div className="ml-1">
            <ThemeButton />
          </div>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh-10rem)] flex-col">
        {children}
      </main>
      <footer>
        <div className="mx-auto h-20 max-w-7xl border border-red-500">
          <p>Nutri Check</p>
        </div>
      </footer>
    </>
  );
}
