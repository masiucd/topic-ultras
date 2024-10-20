import type {FoodType} from "@/db/schema/food-items";
import {slugify} from "@/lib/utils";
import Link from "next/link";
import {Badge} from "./ui/badge";

export function FoodTypeBadge(props: {foodType: FoodType | null; withLink?: boolean}) {
	let {foodType, withLink} = props;
	let Comp = <Badge className="uppercase">{foodType ?? "UNKNOWN"}</Badge>;
	if (withLink) {
		return (
			<Link
				className="hover:underline"
				href={`/food-items/food-types/${slugify(foodType)}`}
			>
				{Comp}
			</Link>
		);
	}
	return Comp;
}
export function FoodCategoryBadge(props: {
	foodCategory: string | null;
	withLink?: boolean;
}) {
	let {foodCategory, withLink} = props;
	let Comp = <Badge className="uppercase">{foodCategory ?? "UNKNOWN"}</Badge>;
	if (withLink) {
		return (
			<Link
				className="hover:underline"
				href={`/food-items/food-categories/${slugify(foodCategory)}`}
			>
				{Comp}
			</Link>
		);
	}
	return Comp;
}
