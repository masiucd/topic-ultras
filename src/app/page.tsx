import {H1} from "@/shared/components/ui/typography";

import {SearchFoodRecords} from "./search-food-records";

export default async function Home() {
  // let result = await db.select().from(foods).all();
  // console.log("result", result);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center border-4 py-2">
      <H1>Nutricheck</H1>
      <div className="flex w-full flex-1 flex-col items-center border border-red-500">
        <SearchFoodRecords />
      </div>
    </main>
  );
}
