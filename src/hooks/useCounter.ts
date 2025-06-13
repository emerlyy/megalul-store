import { useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count <= 1) {
      setCount(1);
      return;
    }
    setCount((prev) => prev - 1);
  };

  return [count, increment, decrement] as const;
};
