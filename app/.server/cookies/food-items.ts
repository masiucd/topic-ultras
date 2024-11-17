import {createCookie} from "@remix-run/node"; // or cloudflare/deno

export let foodItemsCookie = createCookie("food-items", {
	httpOnly: true,
});

export async function parseCookie(cookieHeader: string | null) {
	let cookie = (await foodItemsCookie.parse(cookieHeader)) || {
		rows: 4,
		categories: [],
	};
	return cookie;
}
