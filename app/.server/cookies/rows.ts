import {createCookie} from "@remix-run/node"; // or cloudflare/deno

export let amountOfRows = createCookie("rows", {
	httpOnly: true,
});
