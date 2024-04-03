import classNames from "classnames";
import type { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "success";
  rounded?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  rounded,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        className,
        "text-white fill-white stroke-white hover:opacity-90 active:opacity-75 disabled:opacity-50",
        {
          "bg-blue-400": variant === "primary",
          "bg-red-300": variant === "danger",
          "bg-green-500": variant === "success",
          "rounded-md": !rounded,
          "py-2": !rounded,
          "px-2": !rounded,
          "p-3 rounded-full leading-4 flex justify-center content-center items-center justify-items-center":
            rounded,
        }
      )}
    >
      {children}
    </button>
  );
};

export { Button };
