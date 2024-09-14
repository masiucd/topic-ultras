"use server";

import "server-only";

let Goals = new Set(["maintain", "lose", "gain"]);

let activityLevels = Object.freeze({
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	"very-active": 1.9,
});

export async function calculate(data: FormData) {
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
		return {error: "Invalid data"};
	}

	let result = calculateFinalResult({
		age: Number.parseInt(age, 10),
		weight: Number.parseInt(weight, 10),
		height: Number.parseInt(height, 10),
		gender,
		activityLevel,
		goal,
	});
	console.log({result});
	return result;
}

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

function calculateTdee(bmr: number, activityLevel: keyof typeof activityLevels) {
	return bmr * activityLevels[activityLevel];
}

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
