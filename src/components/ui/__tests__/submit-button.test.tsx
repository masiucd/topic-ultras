import {render, screen} from "@testing-library/react";
import {expect, test, vi} from "vitest";
import {SubmitButton} from "../submit-button";

vi.mock("react-dom", async () => {
  const actual = await vi.importActual("react-dom");
  return {
    ...actual,
    useFormStatus: vi.fn(() => ({pending: false})),
  };
});

test("SubmitButton", () => {
  render(<SubmitButton />);
  expect(screen.getByRole("button")).toBeDefined();
});
