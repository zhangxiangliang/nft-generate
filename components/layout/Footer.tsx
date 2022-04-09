// React
import { FC } from "react";

// NPM
import classNames from "classnames";

// Utils
import { PAGE_GITHUB } from "utils/page";
import { borderColor } from "utils/style";

export const Footer: FC = ({}) => {
  return (
    <footer className={classNames(borderColor, "text-center border-t p-3")}>
      <a
        className="text-sm text-black text-opacity-50"
        href={PAGE_GITHUB}
        target="_blank"
      >
        Created by @zhangxiangliang
      </a>
    </footer>
  );
};

export default Footer;
