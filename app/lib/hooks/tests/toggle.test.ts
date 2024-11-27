import {act, renderHook} from "@testing-library/react";
import {describe, expect, test} from "vitest";
import {useToggle} from "../toggle";

describe("useToggle", () => {
  test("should return the initial state and the toggle functions", () => {
    let {result} = renderHook(() => useToggle());
    let [state, {toggle, set, on, off}] = result.current;

    expect(state).toBe(false);
    expect(typeof toggle).toBe("function");
    expect(typeof set).toBe("function");
    expect(typeof on).toBe("function");
    expect(typeof off).toBe("function");
  });

  test("should toggle the state", () => {
    let {result} = renderHook(() => useToggle());
    let [state, {toggle}] = result.current;

    expect(state).toBe(false);

    act(() => {
      toggle();
    });

    expect(result.current[0]).toBe(true);
  });

  test("should set the state to false using off", () => {
    let {result} = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1].off();
    });

    expect(result.current[0]).toBe(false);
  });

  test("should set the state to true using on", () => {
    let {result} = renderHook(() => useToggle(false));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1].on();
    });

    expect(result.current[0]).toBe(true);
  });

  test("should set the state to a specific value using set", () => {
    let {result} = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1].set(true);
    });

    expect(result.current[0]).toBe(true);
  });
});
