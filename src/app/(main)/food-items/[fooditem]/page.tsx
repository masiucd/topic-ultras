import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/ui/typography";
import {unSlugify} from "@/lib/utils";
import type {Metadata} from "next";
import {FoodItem} from "./_components/food-item";
import {getFoodItemData} from "./dao";

type Props = {
	params: Promise<{
		fooditem: string;
	}>;
	// searchParams: {[key: string]: string | string[] | undefined};
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    return {
		title: params.fooditem,
		description: `Nutritional values of ${params.fooditem}`,
	};
}

export default async function FoodItemPage(props: Props) {
	let foodItem = await getFoodItemData((await props.params).fooditem);
	if (!foodItem) {
		return <div>Food item not found</div>;
	}

	return (
        (<PageWrapper>
            <H1>Food item {unSlugify((await props.params).fooditem)}</H1>
            <div className="my-5 flex w-[30rem] ">
				<FoodItem foodItem={foodItem} />
			</div>
        </PageWrapper>)
    );
}
