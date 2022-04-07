// React
import { FC } from "react";

// Config
import { PAGE_HOME } from "config/page";

// Components
import Nav from "components/layout/Nav";
import AnchorButton from "components/ui/AnchorButton";

export const Header: FC = ({}) => {
  return (
    <header className="p-3 flex items-center justify-between border-b-2 border-black border-opacity-5">
      <AnchorButton href={PAGE_HOME}>NFT Generate</AnchorButton>

      <Nav />
    </header>
  );
};

export default Header;
