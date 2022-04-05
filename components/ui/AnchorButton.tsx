// React
import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";

// NPM
import classNames from "classnames";

export const AnchorButton: FC<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = ({ href, children, target, className }) => {
  const classname = classNames(
    "bg-black text-white w-max py-2 px-5 rounded-md select-none",
    className
  );

  return (
    <a className={classname} href={href} target={target}>
      {children}
    </a>
  );
};

export default AnchorButton;
