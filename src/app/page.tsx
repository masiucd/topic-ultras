import {db} from "@/db/db";
import {foods} from "@/db/models/schema";

export default async function Home() {
  let result = await db.select().from(foods).all();
  console.log("result", result);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-2"></main>
  );
}
