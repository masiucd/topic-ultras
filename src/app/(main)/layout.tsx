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
          <strong>Nutri Check</strong>
          <Nav />
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
