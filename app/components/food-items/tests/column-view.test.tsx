import {render} from "@testing-library/react";
import {describe, test, vi} from "vitest";
import {ColumnView} from "../column-view";

describe("ColumnView", () => {
  test("should render the column view", () => {
    let result = render(
      <ColumnView
        selectColumn={vi.fn()}
        selectedColumns={new Set()}
        toggleAllColumns={vi.fn()}
      />
    );
    result.debug();
  });
});
