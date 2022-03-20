import { Props as BoxProps, Box } from "./Box";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary";

export interface Props extends BoxProps {
  variant?: ButtonVariant;
}

const BUTTON_VARIANT_STYLE: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary:
    "bg-slate-100 border-transparent hover:border-slate-300 hover:bg-slate-200",
};

export const Button = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      children,
      variant = "primary",
      as = "button",
      className,
      ...restProps
    } = props;

    const buttonVariantClasses = BUTTON_VARIANT_STYLE[variant];

    const buttonClass = twMerge(
      "border px-4 py-2 w-full disabled:cursor-not-allowed disabled:opacity-50 rounded-lg flex justify-center items-center gap-2 font-bold",
      buttonVariantClasses,
      className
    );

    return (
      <Box as={as} ref={ref} className={buttonClass} {...restProps}>
        {children}
      </Box>
    );
  }
);

Button.displayName = "Button";
