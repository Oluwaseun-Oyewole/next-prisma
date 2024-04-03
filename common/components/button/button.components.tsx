// import classNames from "classnames";
// import type { ButtonHTMLAttributes, FC } from "react";

// type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
//   variant?: "primary" | "danger" | "success";
// };

// const Button: FC<ButtonProps> = ({
//   children,
//   variant = "primary",
//   className,
//   ...props
// }) => {
//   return (
//     <button
//       className={classNames(
//         className,
//         "text-white fill-white stroke-white hover:opacity-90 active:opacity-75 disabled:opacity-50 bg-red-500",
//         { "hidden bg-red-500": variant === "primary" }
//       )}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// export { Button };

import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

type IProps = { isLoading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className, isLoading = false, ...rest }: IProps) {
  return (
    <button
      {...rest}
      className={classNames(
        `py-[15px] px-[8px] rounded-[5px] bg-btn text-white w-full disabled:opacity-50 disabled:cursor-not-allowed gap-4 ${
          isLoading && "flex items-center justify-center gap-3"
        } `,
        className
      )}
    >
      {children} {isLoading && <p>Loading....</p>}
    </button>
  );
}

export { Button };
