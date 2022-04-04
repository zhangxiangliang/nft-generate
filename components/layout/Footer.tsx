// React
import { FC } from "react";

// Config
import { PAGE_GITHUB } from "config/page";

export const Footer: FC = ({}) => {
  return (
    <footer className="text-center border-t-2 border-black border-opacity-5 p-5">
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
