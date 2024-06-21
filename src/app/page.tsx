import {sql} from "drizzle-orm";

import {Button} from "@/components/ui/button";
import {db} from "@/db/db";
import {foods} from "@/db/models/schema";

async function searchFood(formData: FormData) {
  "use server";
  let food = formData.get("food");
  if (typeof food !== "string") {
    throw new Error("Expected food to be a string.");
  }
  let result = await db
    .select()
    .from(foods)
    .where(sql`lower(${foods.name}) = lower(${food})`);

  return result;
}

export default async function Home() {
  // let result = await db.select().from(foods).all();
  // console.log("result", result);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center border-4 py-2">
      <h1>Nutricheck</h1>
      <div className="flex w-full flex-1 flex-col items-center border border-red-500">
        <form
          action={searchFood}
          className="flex flex-col border border-blue-400 md:w-full md:max-w-xl"
        >
          <input
            type="text"
            datatype="text"
            placeholder="Search for food"
            name="food"
            required
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    </main>
  );
}
