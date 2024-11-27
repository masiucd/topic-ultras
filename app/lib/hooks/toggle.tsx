import {useMemo, useState} from "react";

/**
 * Custom hook to manage a boolean state with toggle functionality.
 *
 * @param {boolean} [initialState=false] - The initial state of the toggle.
 * @returns {[boolean, { state: boolean; toggle: () => void; set: (value: boolean) => void; on: () => void; off: () => void; }]}
 * - An array containing the current state and an object with methods to manipulate the state:
 *   - `state`: The current boolean state.
 *   - `toggle`: Function to toggle the state.
 *   - `set`: Function to set the state to a specific boolean value.
 *   - `on`: Function to set the state to `true`.
 *   - `off`: Function to set the state to `false`.
 */
export function useToggle(initialState = false): [
  boolean,
  {
    state: boolean;
    toggle: () => void;
    set: (value: boolean) => void;
    on: () => void;
    off: () => void;
  }
] {
  let [state, setState] = useState(initialState);
  return [
    state,
    useMemo(
      () => ({
        state,
        toggle: () => setState((state) => !state),
        set: (value: boolean) => setState(value),
        on: () => setState(true),
        off: () => setState(false),
      }),
      [state]
    ),
  ];
}
