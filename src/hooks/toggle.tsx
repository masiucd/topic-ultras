// useToggle hook with 4 functions: toggle, setTrue, setFalse, reset
//
// Usage:
// let [isOpen, {toggle, setTrue, setFalse, reset}] = useToggle();
// isOpen // false
// toggle() // true
// setTrue() // true
// setFalse() // false
// reset() // false

import {useMemo, useState} from "react";

export function useToggle(
  initialState = false,
): [boolean, {toggle: () => void; setTrue: () => void; setFalse: () => void; reset: () => void}] {
  let [state, setState] = useState(initialState);
  return [
    state,
    useMemo(
      () => ({
        toggle: () => setState((state) => !state),
        setTrue: () => setState(true),
        setFalse: () => setState(false),
        reset: () => setState(initialState),
      }),
      [initialState],
    ),
  ];
}
