import {describe, expect, test} from "vitest";
import {cn} from "~/lib/utils";

describe("utils", () => {
	test("cn merges the classNames correctly", () => {
		let className = cn("flex", "flex-row", "items-center");
		expect(className).toBe("flex flex-row items-center");
	});

	test("cn merges the classNames correctly with conditional", () => {
		let className = cn("border", {hidden: true});
		expect(className).toBe("border hidden");
	});
});
