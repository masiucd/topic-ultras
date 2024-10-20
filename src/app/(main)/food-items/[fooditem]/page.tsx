import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/ui/typography";
import {unSlugify} from "@/lib/utils";
import type {Metadata} from "next";
import {FoodItem} from "./_components/food-item";
import {getFoodItemData} from "./dao";

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
			<div className="my-5 flex w-[30rem] ">
				<FoodItem foodItem={foodItem} />
			</div>
		</PageWrapper>
	);
}
