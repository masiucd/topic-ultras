import type {LoaderFunctionArgs} from "@remix-run/node";

import {type Location, useLoaderData, useLocation} from "@remix-run/react";
import {getFoodItemsData} from "~/.server/db/dao/food-items";
import {CategoryFilter} from "~/components/food-items/filters/category";
import {FoodItems} from "~/components/food-items/food-items-table";
import {SearchInput} from "~/components/food-items/search-input";
import PageWrapper from "~/components/page-wrapper";
import {H1, Lead} from "~/components/ui/typography";
import {DEFAULT_FOOD_ITEMS_ROWS} from "~/lib/constants";

export async function loader({request}: LoaderFunctionArgs) {
	let url = new URL(request.url);
	let name = url.searchParams.get("name");
	let category = url.searchParams.get("category");
	let rows = Number(url.searchParams.get("rows") || DEFAULT_FOOD_ITEMS_ROWS);
	let page = Number(url.searchParams.get("page")) || 1;

	return {
		...(await getFoodItemsData({
			name,
			page,
			rows,
			categories: category !== null ? category.split("-").map(Number) : [],
		})),
	};
}

// TODO : copy url feature to share the search results
export default function FoodItemsRoute() {
	let data = useLoaderData<typeof loader>();
	let location = useLocation();

	return (
		<PageWrapper>
			<H1>Food Items</H1>
			<Lead>Nutrition facts for the food you love. Search for food items by name.</Lead>
			<div className="mx-auto my-10 w-full max-w-[80rem]">
				<Toolbar data={data} location={location} />
				<div className="rounded-lg border-2">
					<FoodItems
						page={data.page}
						totalPages={data.totalPages}
						totalFoodItems={data.totalFoodItems}
						results={data.results}
						location={location}
					/>
				</div>
			</div>
		</PageWrapper>
	);
}

function Toolbar(props: {
	data: any;
	location: Location;
}) {
	let {data, location} = props;
	return (
		<div className="mb-2 flex gap-2">
			<div>
				<SearchInput location={location} />
			</div>
			<CategoryFilter
				results={data.results}
				allFoodCategories={data.allFoodCategories}
				location={location}
			/>
		</div>
	);
}
