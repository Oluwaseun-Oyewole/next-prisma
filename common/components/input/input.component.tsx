"use client";
import classNames from "classnames";
import { ErrorMessage } from "formik";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef,
  forwardRef,
  useState,
} from "react";
import FormError from "./error.components";

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "file"
  | "textarea"
  | "search";
type InputSize = "small" | "medium" | "large";

export type InputPropsType = {
  id?: string;
  name?: string;
  label?: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  value?: string;
  clearValue?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "size"
>;

const sizeMap: { [key in InputSize]: string } = {
  small: "py-4 text-base",
  medium: "py-6 text-base",
  large: "py-8 text-base",
};

const Input = (
  {
    id,
    name,
    label,
    type = "text",
    size = "small",
    className,
    placeholder,
    clearValue,
    value,
    onChange,
    ...props
  }: InputPropsType,
  ref: LegacyRef<HTMLInputElement> | any
) => {
  const [textType, ,] = useState(type);

  return (
    <div className="relative">
      <input
        ref={ref}
        type={textType}
        id={id}
        name={name}
        value={value}
        aria-label={label}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
        className={classNames(
          `w-full block border-2 border-gray-300 px-10 text-white rounded-sm font-medium placeholder:font-medium placeholder:text-sm`,
          sizeMap[size],
          className
        )}
        {...props}
      />

      <ErrorMessage
        name={name as string}
        // eslint-disable-next-line react/no-children-prop
        children={(msg) => <FormError error={msg} />}
      />
    </div>
  );
};

export default forwardRef(Input);
