import {Span, Strong} from "@/components/typography";
import {FoodTypeBadge} from "@/components/ui/food-type-badge";
import {Icons} from "@/components/ui/icons";
import {
	Body,
	Cell,
	ColumnHeaderCell,
	Header,
	Row,
	RowHeaderCell,
	Table,
} from "@/components/ui/table";
import {isAuthorized} from "@/lib/auth";
import {Flex, Tooltip} from "@radix-ui/themes";
import Link from "next/link";
import type {PropsWithChildren} from "react";
import {ITEMS_PER_PAGE, getFavoriteFoodsForUser, getFoodItemsData} from "../dao";
import {HeadTitle} from "./head-title";
import {Pagination} from "./pagination";
import {SearchFood} from "./search-food";

type Props = {
	foodName: string;
	page: number;
	orderBy: string;
};

export async function FoodTable({foodName, page, orderBy}: Props) {
	let authorized = await isAuthorized();
	let {foodItems, totalFoods} = await getFoodItemsData(
		foodName,
		ITEMS_PER_PAGE,
		(page - 1) * ITEMS_PER_PAGE, // skip items based on page number
		orderBy,
	);

	let totalPages = Math.ceil(totalFoods / ITEMS_PER_PAGE);
	let currentPage = page > totalPages ? totalPages : page;

	return (
		<>
			<Flex asChild direction="column" gap="2">
				<div className="mb-5  w-full max-w-md ">
					<SearchFood foodName={foodName} />
				</div>
			</Flex>
			<Table className="relative">
				<TableHead isAuthorized={authorized !== null} />
				<TableBody foodItems={foodItems} userId={authorized?.id}>
					<Footer
						totalFoodItems={foodItems.length}
						totalFoods={totalFoods}
						currentPage={currentPage}
						totalPages={totalPages}
					>
						<Pagination page={page} totalPages={totalPages} />
					</Footer>
				</TableBody>
			</Table>
		</>
	);
}

function TableHead({isAuthorized}: {isAuthorized: boolean}) {
	return (
		<Header>
			<Row>
				<ColumnHeaderCell width="250px">
					<HeadTitle title="name">
						<Tooltip content="Food name">
							<Icons.Food />
						</Tooltip>
					</HeadTitle>
				</ColumnHeaderCell>
				<ColumnHeaderCell width="100px">
					<Tooltip content="Food type">
						<Icons.Label />
					</Tooltip>
				</ColumnHeaderCell>
				<ColumnHeaderCell width="100px">
					<HeadTitle title="calories">
						<Tooltip content="Calories in food item">
							<Icons.Calories />
						</Tooltip>
					</HeadTitle>
				</ColumnHeaderCell>
				<ColumnHeaderCell width="100px">
					<HeadTitle title="carbs">
						<Tooltip content="Carbs">
							<Icons.Carbs />
						</Tooltip>
					</HeadTitle>
				</ColumnHeaderCell>
				<ColumnHeaderCell width="100px">
					<HeadTitle title="protein">
						<Tooltip content="Protein">
							<Icons.Protein />
						</Tooltip>
					</HeadTitle>
				</ColumnHeaderCell>

				<ColumnHeaderCell width="100px">
					<HeadTitle title="fat">
						<Tooltip content="Total fat">
							<Icons.Fat />
						</Tooltip>
					</HeadTitle>
				</ColumnHeaderCell>

				{isAuthorized && (
					<ColumnHeaderCell>
						<Tooltip content="Favorite">
							<Icons.Star />
						</Tooltip>
					</ColumnHeaderCell>
				)}
			</Row>
		</Header>
	);
}

type FoodItem = Awaited<ReturnType<typeof getFoodItemsData>>["foodItems"][number];

async function TableBody({
	foodItems,
	userId,
	children,
}: PropsWithChildren<{foodItems: FoodItem[]; userId: number | undefined}>) {
	let favoriteFoodsForUser = userId ? await getFavoriteFoodsForUser(userId) : null;

	return (
		<Body>
			{foodItems.map((foodItem) => (
				<Row key={foodItem.foodId}>
					<RowHeaderCell>
						<Link
							href={`/foods/${foodItem.slug}`}
							className="hover:underline hover:opacity-60"
						>
							<Strong className="capitalize">{foodItem.foodName} </Strong>
						</Link>
					</RowHeaderCell>
					<Cell>
						<FoodTypeBadge name={foodItem.foodType.name} slug={foodItem.foodType.slug} />
					</Cell>
					<Cell>
						<Span>{foodItem.data.calories}</Span>
					</Cell>
					<Cell>
						<Span>{foodItem.data.carbs}</Span>
					</Cell>
					<Cell>
						<Span>{foodItem.data.protein}</Span>
					</Cell>
					<Cell>
						<Span>{foodItem.data.fat}</Span>
					</Cell>
					{favoriteFoodsForUser !== null && (
						<Cell>
							{favoriteFoodsForUser.find(({foodId}) => foodId === foodItem.foodId) ? (
								<Icons.Check size={16} />
							) : null}
						</Cell>
					)}
				</Row>
			))}
			{children}
		</Body>
	);
}

function Footer({
	totalFoodItems,
	totalFoods,
	currentPage,
	totalPages,
	children,
}: PropsWithChildren<{
	totalFoodItems: number;
	totalFoods: number;
	currentPage: number;
	totalPages: number;
}>) {
	return (
		<Row className="border-none">
			<RowHeaderCell colSpan={3}>
				<div className="flex flex-col">
					<div className="flex gap-2">
						<Span className="italic">Total</Span>
						<Span className="italic">
							{totalFoodItems}/{totalFoods} items
						</Span>
					</div>
					<Span>
						Page {currentPage} of {totalPages}
					</Span>
				</div>
			</RowHeaderCell>
			<Cell colSpan={3}>{children}</Cell>
		</Row>
	);
}
