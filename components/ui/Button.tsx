// React
import { FC } from "react";

export const Button: FC = ({ children }) => {
  return (
    <button className="bg-black text-white w-max py-2 px-5 rounded-md">
      {children}
    </button>
  );
};

export default Button;
