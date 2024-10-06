import PageWrapper from "@/components/page-wrapper";
import {Badge} from "@/components/ui/badge";
import {db} from "@/db";
import {foodCategories, foodItems, foodNutrients} from "@/db/schema";
import {eq} from "drizzle-orm";
// import {setExpire} from "@/db/redis";

// async function redisTest(data: FormData) {
//   "use server";
//   let name = data.get("name");

//   if (typeof name !== "string") {
//     throw new Error("Name is not a string");
//   }

//   setExpire({key: "team", value: name});
// }

export default async function Home() {
	let allFoodItems = await db
		.select({
			foodName: foodItems.name,
			foodDescription: foodItems.description,
			foodType: foodItems.foodType,
			foodCategory: foodCategories.name,
			nutrients: {
				calories: foodNutrients.calories,
				protein: foodNutrients.protein,
				fat: foodNutrients.fat,
				carbs: foodNutrients.carbs,
			},
		})
		.from(foodItems)
		.innerJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
		.innerJoin(foodCategories, eq(foodItems.foodCategoryId, foodCategories.id));

	return (
		<PageWrapper className="border border-red-500">
			<h1>Nutri Check</h1>
			<p>Nutri Check application where you can track your nutrition and health.</p>
			<div className="flex max-w-[20rem] flex-wrap gap-2">
				<Badge>Default</Badge>
				<Badge variant="secondary" colors="orange">
					Secondary
				</Badge>
				<Badge variant="destructive">Destructive</Badge>
				<Badge variant="outline">Outline</Badge>
			</div>

			<table>
				<thead>
					<tr className="rounded-md border-2 border-gray-500 text-left">
						<th>Food Name</th>
						<th>Food Description</th>
						<th>Food Type</th>
						<th>Food Category</th>
						<th>Calories</th>
						<th>Protein</th>
						<th>Fat</th>
						<th>Carbs</th>
					</tr>
				</thead>
				<tbody>
					{allFoodItems.map((foodItem) => (
						<tr key={foodItem.foodName}>
							<td>{foodItem.foodName}</td>
							<td>{foodItem.foodDescription}</td>
							<td>{foodItem.foodType}</td>
							<td>{foodItem.foodCategory}</td>
							<td>{foodItem.nutrients.calories}</td>
							<td>{foodItem.nutrients.protein}</td>
							<td>{foodItem.nutrients.fat}</td>
							<td>{foodItem.nutrients.carbs}</td>
						</tr>
					))}
				</tbody>
			</table>
		</PageWrapper>
	);
}
