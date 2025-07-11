import clsx from "clsx";
import type { HTMLElementType, ReactNode } from "react";
import type { TextColor, TextWeight } from "../../../types";
import "./Text.css";

type TextSize = "xl" | "large" | "regular" | "small";

type Props = {
  tag?: HTMLElementType;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  className?: string;
  children?: ReactNode;
};

const Text = ({
  tag = "span",
  size = "regular",
  color = "text-primary",
  weight = "regular",
  className,
  children,
}: Props) => {
  const Tag = tag;
  return (
    <Tag
      className={clsx(
        "text",
        `text_${size}`,
        `color_${color}`,
        `weight_${weight}`,
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Text;
