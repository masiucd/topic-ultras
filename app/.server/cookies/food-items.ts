import {createCookie} from "@remix-run/node"; // or cloudflare/deno
import {z} from "zod";

export let foodItemsCookie = createCookie("food-items", {
	httpOnly: true,
});

let cookieSchema = z.object({
	rows: z.number(),
	categories: z.array(z.string()),
});
export type FoodItemsCookie = z.infer<typeof cookieSchema>;

export async function parseCookie(cookieHeader: string | null) {
	let cookie = (await foodItemsCookie.parse(cookieHeader)) || {
		rows: 4,
		categories: [],
	};
	let result = cookieSchema.safeParse(cookie);
	if (!result.success) {
		console.error(result.error);
		return {
			rows: 4,
			categories: [],
		};
	}
	return result.data;
}
