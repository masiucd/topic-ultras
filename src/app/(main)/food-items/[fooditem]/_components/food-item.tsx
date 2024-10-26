import {FoodCategoryBadge, FoodTypeBadge} from "@/components/food-badge";
import {Icons} from "@/components/icons";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {TooltipComponent} from "@/components/ui/tooltip";
import {Label, List, Muted, Strong} from "@/components/ui/typography";
import {cn} from "@/lib/utils";
import type {FoodItemType} from "../dao";

export function FoodItem(props: {
	foodItem: NonNullable<FoodItemType>;
}) {
	let {foodItem} = props;
	return (
		<Card className="w-full">
			<Header foodItem={foodItem} />
			<CardContent>
				<div className="mb-5 flex items-center gap-5">
					<Strong className="font-semibold">Calories</Strong>{" "}
					<Label>{foodItem.nutrition.calories}</Label>
				</div>
				<MacroNutrients foodItem={foodItem} />
				<NutritionInfo foodItem={foodItem} />
			</CardContent>
			<CardFooter>{/*  */}</CardFooter>
		</Card>
	);
}

function MacroNutrients(props: {
	foodItem: NonNullable<FoodItemType>;
}) {
	let {foodItem} = props;
	let micronutrientsInPercentage = calculateMicronutriensInPercentage(foodItem.nutrition);
	return (
		<div className="mb-5 flex flex-col gap-2">
			<div className="flex justify-between">
				<p>Macronutrients</p>
				<p>0g total</p>
			</div>
			<TooltipComponent
				content={
					<div>
						<p>Protein: {micronutrientsInPercentage.protein}%</p>
						<p>Fat: {micronutrientsInPercentage.fat}%</p>
						<p>Carbs: {micronutrientsInPercentage.carbs}%</p>
					</div>
				}
			>
				<div className="flex h-3 w-full overflow-hidden rounded-lg bg-gray-200 shadow-xl">
					<div
						className={cn(
							"h-full",
							getClassNameBasedOnMicronutrient(micronutrientsInPercentage.protein),
						)}
					/>
					<div
						className={cn(
							"h-full w-[10%]",
							getClassNameBasedOnMicronutrient(micronutrientsInPercentage.fat),
						)}
					/>
					<div
						className={cn(
							"h-full w-[10%] ",
							getClassNameBasedOnMicronutrient(micronutrientsInPercentage.carbs),
						)}
					/>
				</div>
			</TooltipComponent>
			<ul className="flex justify-between">
				<li className="flex items-center gap-1">
					<TooltipComponent content="Protein">
						<span>
							<Icons.Protein size={18} />
						</span>
					</TooltipComponent>
					{foodItem.nutrition.protein}g
				</li>
				<li className="flex items-center gap-1">
					<TooltipComponent content="Fat">
						<span>
							<Icons.Fat size={18} />
						</span>
					</TooltipComponent>
					{foodItem.nutrition.fat}g
				</li>
				<li className="flex items-center gap-1">
					<TooltipComponent content="Carbs">
						<span>
							<Icons.Carbs size={18} />
						</span>
					</TooltipComponent>
					{foodItem.nutrition.carbs}g
				</li>
			</ul>
		</div>
	);
}

function NutritionInfo(props: {
	foodItem: NonNullable<FoodItemType>;
}) {
	let {foodItem} = props;
	return (
		<List className="flex flex-col gap-3 text-sm md:pr-20">
			<li className="flex justify-between gap-5 ">
				<Strong>Food type</Strong>
				<FoodTypeBadge foodType={foodItem.foodType} withLink />
			</li>
			<li className="flex justify-between gap-5 ">
				<Strong>Food category</Strong>
				<FoodCategoryBadge foodCategory={foodItem.foodCategory} withLink />
			</li>
			<li className="flex justify-between gap-5 ">
				<Strong>Protein</Strong> <Muted>{foodItem.nutrition.protein}g</Muted>
			</li>
			<li className="flex justify-between gap-5 ">
				<Strong>Fat</Strong> <Muted>{foodItem.nutrition.fat}g</Muted>
			</li>
			<li className="flex justify-between gap-5 ">
				<Strong>Carbs</Strong> <Muted>{foodItem.nutrition.carbs}g</Muted>
			</li>
		</List>
	);
}

function Header(props: {
	foodItem: NonNullable<FoodItemType>;
}) {
	let {foodItem} = props;
	return (
		<CardHeader>
			<CardTitle className="capitalize">{foodItem.name}</CardTitle>
			<CardDescription>{foodItem.description}</CardDescription>
		</CardHeader>
	);
}

function calculateMicronutriensInPercentage(nutrition: {
	protein: number;
	fat: number;
	carbs: number;
}) {
	let total = nutrition.protein + nutrition.fat + nutrition.carbs;
	return {
		protein: Math.floor((nutrition.protein / total) * 100),
		fat: Math.floor((nutrition.fat / total) * 100),
		carbs: Math.floor((nutrition.carbs / total) * 100),
	};
}

function getClassNameBasedOnMicronutrient(nutrient: number) {
	if (nutrient < 10) {
		return "w-[10%] bg-foreground/20";
	}
	if (nutrient < 20) {
		return "w-[20%] bg-foreground/30";
	}
	if (nutrient < 30) {
		return "w-[30%] bg-foreground/40";
	}
	if (nutrient < 40) {
		return "w-[40%] bg-foreground/50";
	}
	if (nutrient < 50) {
		return "w-[50%] bg-foreground/60";
	}
	if (nutrient < 60) {
		return "w-[60%] bg-foreground/70";
	}
	if (nutrient < 70) {
		return "w-[70%] bg-foreground/80";
	}
	if (nutrient < 80) {
		return "w-[80%] bg-foreground/90";
	}
	if (nutrient < 90) {
		return "w-[90%] bg-foreground";
	}
	return "w-full bg-foreground";
}
