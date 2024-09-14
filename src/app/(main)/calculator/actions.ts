"use server";

import "server-only";

/**
 * Calculates the result based on the provided form data.
 *
 * @param _prevState - The previous state (optional).
 * @param data - The form data.
 * @returns An object containing the calculation result and a boolean indicating if the calculation was successful.
 */
export async function calculate(
	_prevState: null | {ok: boolean; result: number},
	data: FormData,
) {
	let age = data.get("age");
	let gender = data.get("gender");
	let weight = data.get("weight");
	let height = data.get("height");
	let activityLevel = data.get("activity-level");
	let goal = data.get("goal");

	if (
		typeof age !== "string" ||
		typeof weight !== "string" ||
		typeof height !== "string" ||
		typeof activityLevel !== "string" ||
		typeof goal !== "string" ||
		typeof gender !== "string"
	) {
		return {ok: false, result: 0};
	}

	let result = calculateFinalResult({
		age: Number.parseInt(age, 10),
		weight: Number.parseInt(weight, 10),
		height: Number.parseInt(height, 10),
		gender,
		activityLevel,
		goal,
	});
	if (result === null) {
		return {ok: false, result: 0};
	}
	return {ok: true, result: Math.floor(result)};
}

/**
 * Calculates the final result based on the given parameters.
 *
 * @param {Object} params - The parameters for the calculation.
 * @param {number} params.age - The age of the person.
 * @param {number} params.weight - The weight of the person.
 * @param {number} params.height - The height of the person.
 * @param {string} params.gender - The gender of the person.
 * @param {string} params.activityLevel - The activity level of the person.
 * @param {string} params.goal - The goal of the calculation.
 * @returns {number | null} The final result of the calculation, or null if the calculation is not possible.
 */
function calculateFinalResult({
	age,
	weight,
	height,
	gender,
	activityLevel,
	goal,
}: {
	age: number;
	weight: number;
	height: number;
	gender: string;
	activityLevel: string;
	goal: string;
}) {
	let bmr = calculateBmr({
		age,
		weight,
		height,
		gender,
	});
	let tdee =
		bmr !== null
			? calculateTdee(bmr, activityLevel as keyof typeof activityLevels)
			: null;

	return tdee !== null ? calculateBasedOnGoal(tdee, goal) : null;
}

/**
 * Calculates the Basal Metabolic Rate (BMR) based on the given parameters.
 *
 * @param {Object} params - The parameters required for the calculation.
 * @param {number} params.age - The age of the person.
 * @param {number} params.weight - The weight of the person in kilograms.
 * @param {number} params.height - The height of the person in centimeters.
 * @param {string} params.gender - The gender of the person ("male" or "female").
 *
 * @returns {number | null} The calculated BMR value or null if the gender is not recognized.
 */
function calculateBmr({
	age,
	weight,
	height,
	gender,
}: {
	age: number;
	weight: number;
	height: number;
	gender: string;
}) {
	if (gender === "female") {
		return 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
	}
	if (gender === "male") {
		return 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
	}
	return null;
}

/**
 * Calculates the Total Daily Energy Expenditure (TDEE) based on the Basal Metabolic Rate (BMR) and activity level.
 *
 * @param bmr - The Basal Metabolic Rate.
 * @param activityLevel - The activity level, which can be one of the following: sedentary, light, moderate, or high.
 * @returns The calculated TDEE.
 */
function calculateTdee(bmr: number, activityLevel: keyof typeof activityLevels) {
	return bmr * activityLevels[activityLevel];
}

/**
 * Calculates the calorie intake based on the Total Daily Energy Expenditure (TDEE) and the goal.
 * @param tdee - The Total Daily Energy Expenditure.
 * @param goal - The goal for the calorie intake. Possible values are "maintain", "lose", or "gain".
 * @returns The calculated calorie intake based on the goal. Returns null if the goal is not valid.
 */
function calculateBasedOnGoal(tdee: number, goal: string) {
	if (Goals.has(goal)) {
		switch (goal) {
			case "maintain":
				return tdee;
			case "lose":
				return tdee - 500;
			case "gain":
				return tdee + 500;
		}
	}
	return null;
}

/**
 * Represents a set of goals for a calculator.
 */
let Goals = new Set(["maintain", "lose", "gain"]);

/**
 * Represents different activity levels and their corresponding values.
 */
let activityLevels = Object.freeze({
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	"very-active": 1.9,
});
