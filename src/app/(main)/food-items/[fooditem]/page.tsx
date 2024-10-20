import PageWrapper from "@/components/page-wrapper";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {H1} from "@/components/ui/typography";
import {db} from "@/db";
import {foodCategories, foodItems, foodNutrients} from "@/db/schema";
import {unSlugify} from "@/lib/utils";
import {eq} from "drizzle-orm";
import type {Metadata} from "next";

type Props = {
	params: {
		fooditem: string;
	};
	// searchParams: {[key: string]: string | string[] | undefined};
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
	return {
		title: params.fooditem,
		description: `Nutritional values of ${params.fooditem}`,
	};
}

export default async function FoodItemPage(props: Props) {
	let foodItem = await getFoodItemData(props.params.fooditem);
	if (!foodItem) {
		return <div>Food item not found</div>;
	}
	return (
		<PageWrapper>
			<H1>Food item {unSlugify(props.params.fooditem)}</H1>
			<Card>
				<CardHeader>
					<CardTitle className="capitalize">{foodItem.name}</CardTitle>
					<CardDescription>{foodItem.description}</CardDescription>
				</CardHeader>
				<CardContent>{/*  */}</CardContent>
				<CardFooter>{/*  */}</CardFooter>
			</Card>
		</PageWrapper>
	);
}

async function getFoodItemData(foodName: string) {
	let data = await db
		.select({
			foodId: foodItems.id,
			name: foodItems.name,
			description: foodItems.description,
			foodType: foodItems.foodType,
			foodCategory: foodCategories.name,
			nutrition: {
				calories: foodNutrients.calories,
				protein: foodNutrients.protein,
				fat: foodNutrients.fat,
				carbs: foodNutrients.carbs,
			},
		})
		.from(foodItems)
		.innerJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
		.innerJoin(foodCategories, eq(foodItems.foodCategoryId, foodCategories.id))
		.where(eq(foodItems.name, unSlugify(foodName)));

	if (!data.length) {
		return null;
	}
	return data[0];
}
