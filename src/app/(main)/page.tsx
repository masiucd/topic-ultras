import {SearchFoodRecords} from "./search-food-records";

export default async function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center border-4 py-2">
      <div className="flex w-full flex-1 flex-col items-center border border-red-500">
        <SearchFoodRecords />
      </div>
    </main>
  );
}
