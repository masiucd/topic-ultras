import {H4, Span} from "@/components/typography";
import {FoodTypeBadge} from "@/components/ui/food-type-badge";
import {db} from "@/db";
import {favoriteFoods, foodTypes, foods, users} from "@/db/schema";
import {isAuthorized} from "@/lib/auth";
import {sleep} from "@/lib/utils";
import {Card, Flex} from "@radix-ui/themes";
import {eq} from "drizzle-orm";
import Link from "next/link";

import {redirect} from "next/navigation";

export default async function FavoriteSlot() {
	await sleep(3000);
	let payload = await isAuthorized();
	if (payload === null) {
		redirect("/signin");
	}
	let favorites = await db
		.select({
			foodId: foods.id,
			foodName: foods.name,
			foodDescription: foods.description,
			foodSlug: foods.slug,
			foodTypeId: foods.typeId,
			foodTypeName: foodTypes.name,
			foodTypeSlug: foodTypes.slug,
		})
		.from(favoriteFoods)
		.innerJoin(users, eq(favoriteFoods.userId, users.id))
		.innerJoin(foods, eq(favoriteFoods.foodId, foods.id))
		.innerJoin(foodTypes, eq(foods.typeId, foodTypes.id))
		.where(eq(users.id, payload.id));

	let hasFavorites = favorites.length > 0;

	return (
		<Card>
			<H4 size="3" className="flex items-center gap-2" mb="3">
				Favorite foods
			</H4>
			<Flex asChild direction="column" gap="2">
				{hasFavorites ? (
					<ul>
						{favorites.map((f) => (
							<Flex key={f.foodId} asChild gap="2">
								<li>
									<Link
										href={`/foods/${f.foodSlug}`}
										className="transition-opacity hover:opacity-40"
									>
										<Span className="capitalize" weight="medium" color="gray">
											{f.foodName}
										</Span>
									</Link>
									<FoodTypeBadge name={f.foodTypeName} slug={f.foodTypeSlug} />
								</li>
							</Flex>
						))}
					</ul>
				) : (
					<Span size="2" color="gray">
						No favorite foods yet.
					</Span>
				)}
			</Flex>
		</Card>
	);
}
