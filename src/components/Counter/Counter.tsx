import "./Counter.css";

import clsx from "clsx";

type CounterProps = {
  value: number;
  increment: () => void;
  decrement: () => void;
  size?: "normal" | "small";
  className?: string;
};

const Counter = ({
  value,
  increment,
  decrement,
  size = "normal",
  className,
}: CounterProps) => {
  return (
    <div
      className={clsx("counter", className, {
        counter_small: size === "small",
      })}
    >
      <button className="counter__button" onClick={decrement}>
        -
      </button>
      <span>{value}</span>
      <button className="counter__button" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default Counter;
