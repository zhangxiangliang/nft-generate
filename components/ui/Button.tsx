// React
import { FC } from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-black text-white w-max py-2 px-5 rounded-md select-none disabled:opacity-20"
    >
      {children}
    </button>
  );
};

export default Button;
