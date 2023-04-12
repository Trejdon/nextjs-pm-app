import clsx from "clsx";
import { FC, ComponentPropsWithoutRef } from "react";

type InputType = ComponentPropsWithoutRef<"input"> & {
  className?: string;
};

const Input: FC<InputType> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
        className
      )}
      {...props}
    />
  );
};

export default Input;
