// React
import { FC } from "react";

// NPM
import classNames from "classnames";

// Utils
import { borderColor } from "utils/style";

export interface CapsuleInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  title?: string;
}

export const CapsuleInput: FC<CapsuleInputProps> = ({
  title,
  className,
  ...props
}) => {
  return (
    <div className="flex justify-between">
      <label className="text-xs px-3 py-2 bg-black text-white rounded-l-md">
        {title}
      </label>
      <input
        {...props}
        className={classNames(
          borderColor,
          "focus:outline-none px-2 text-sm flex-1 w-full text-right border border-l-0 rounded-r-md"
        )}
      />
    </div>
  );
};

export default CapsuleInput;
