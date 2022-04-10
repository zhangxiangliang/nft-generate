// React
import { FC } from "react";

// NPM
import classNames from "classnames";

// Utils
import { PAGE_HOME } from "utils/page";
import { borderColor } from "utils/style";

// Components
import Nav from "components/layout/Nav";
import AnchorButton from "components/ui/AnchorButton";

export const Header: FC = ({}) => {
  return (
    <header
      className={classNames(
        borderColor,
        "flex items-center justify-between border-b p-3"
      )}
    >
      <AnchorButton href={PAGE_HOME}>NFT Generate</AnchorButton>

      <Nav />
    </header>
  );
};

export default Header;
