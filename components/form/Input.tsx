// React
import { FC } from "react";

// NPM
import classNames from "classnames";

// Utils
import { borderColor } from "utils/style";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title?: string;
}

export const Input: FC<InputProps> = ({ title, className, ...props }) => {
  return (
    <section className={classNames("space-y-2", className)}>
      <div className="select-none">
        <label className="text-sm">{title}</label>
      </div>
      <input
        {...props}
        className={classNames(
          borderColor,
          "border rounded-md block p-2 w-full text-sm"
        )}
      />
    </section>
  );
};

export default Input;
