import {H1} from "@/shared/components/ui/typography";

export default async function FoodItemsPage({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  // let result = await db.select().from(foods).all();
  // console.log("result", result);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center border-4 py-2">
      <H1>Food items</H1>
    </main>
  );
}
