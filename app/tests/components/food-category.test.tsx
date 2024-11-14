import {render} from "@testing-library/react";
import {describe, expect, test} from "vitest";
import {FoodCategory} from "~/components/food-category";

describe("food-category", () => {
  test("renders badge", () => {
    let name = "Fruits";
    let screen = render(<FoodCategory name={name} />);
    let foodCategory = screen.getByText(name);
    expect(foodCategory).toBeDefined();
  });

  test("renders badge with variant", () => {
    let name = "Fruits";
    let screen = render(<FoodCategory name={name} variant="outline" />);
    let foodCategory = screen.getByText(name);
    expect(foodCategory).toBeDefined();
    screen.debug();
  });
});
