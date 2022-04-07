// React
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";

// NPM
import classNames from "classnames";

export const AnchorButton: FC<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = ({ href, children, target, className }) => {
  const classname = classNames(
    "bg-black text-white w-max py-2 px-3 rounded-md select-none text-sm",
    className
  );

  return (
    <a className={classname} href={href} target={target}>
      {children}
    </a>
  );
};

export default AnchorButton;
