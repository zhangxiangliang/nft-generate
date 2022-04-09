// React
import { FC } from "react";

// NPM
import classNames from "classnames";

// Utils
import { borderColor } from "utils/style";

export interface SelectOption {
  key: string;
  value: string;
}

export interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  title?: string;
  options: SelectOption[];
}

export const Select: FC<SelectProps> = ({
  title,
  className,
  options,
  ...props
}) => {
  return (
    <section className={classNames("space-y-2", className)}>
      <div className="select-none">
        <label className="text-sm">{title}</label>
      </div>
      <select
        {...props}
        className={classNames(
          borderColor,
          "border rounded-md block p-2 w-full text-sm"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Select;
