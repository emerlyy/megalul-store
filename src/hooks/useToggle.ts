import { useCallback, useState } from "react";

export const useToggle = (initialState: boolean) => {
  const [isActive, setIsActive] = useState(initialState);

  const toggleIsActive = useCallback(
    (state?: boolean) => {
      if (!state) state = !isActive;
      setIsActive(state);
    },
    [isActive]
  );

  const open = () => setIsActive(true);
  const close = () => setIsActive(false);

  return [isActive, toggleIsActive, open, close] as const;
};
