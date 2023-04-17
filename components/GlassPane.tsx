import { FC, PropsWithChildren } from "react";
import clsx from "clsx";

type GlassPaneProps = {
  className: string;
};

const GlassPane: FC<PropsWithChildren<GlassPaneProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200 p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
