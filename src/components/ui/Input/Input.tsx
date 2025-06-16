import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { TextColor } from "../../../types";
import Text from "../Text/Text";
import "./Input.css";

type InputTextColor = Extract<TextColor, "text-primary" | "text-secondary">;
type FieldSize = "regular" | "small";

type InputProps = {
  label?: string;
  id: string;
  icon?: ReactNode;
  errorMessage?: string;
  textColor?: InputTextColor;
  fieldSize?: FieldSize;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef(
  (
    {
      label,
      id,
      errorMessage,
      icon,
      className,
      textColor = "text-primary",
      fieldSize = "regular",
      ...props
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const hasError = !!errorMessage?.length;

    return (
      <label
        className={clsx("input", className, {
          "input_has-error": hasError,
          "input_text-secondary": textColor === "text-secondary",
        })}
      >
        {(label || hasError) && (
          <div className="input__label-wrapper">
            {label && (
              <label htmlFor={id} className="input__label">
                <Text size="small" color="inherit" weight="semibold">
                  {label}
                </Text>
              </label>
            )}
            {hasError && (
              <Text className="input__error-message" color="error" size="small">
                {errorMessage}
              </Text>
            )}
          </div>
        )}
        <div
          className={clsx("input__body", {
            input__body_small: fieldSize === "small",
          })}
        >
          {icon && <div className="input__icon">{icon}</div>}
          <input ref={ref} id={id} {...props} className="input__field" />
        </div>
      </label>
    );
  }
);

export default Input;
