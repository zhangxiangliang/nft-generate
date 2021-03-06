// React
import { FC } from "react";
import { useRouter } from "next/router";

// Utils
import { PAGE_GENERATE, PAGE_GITHUB, PAGE_HOME } from "utils/page";

// Components
import AnchorButton from "components/ui/AnchorButton";

export const Nav: FC = ({}) => {
  const router = useRouter();
  const isActive = (href: string) =>
    router.pathname === href
      ? ""
      : "!text-black hover:!text-white bg-opacity-0 hover:bg-opacity-100";

  return (
    <nav className="space-x-2">
      <AnchorButton href={PAGE_HOME} className={isActive(PAGE_HOME)}>
        主页
      </AnchorButton>
      <AnchorButton href={PAGE_GENERATE} className={isActive(PAGE_GENERATE)}>
        生成器
      </AnchorButton>
      <AnchorButton href={PAGE_GITHUB} className={isActive(PAGE_GITHUB)}>
        Github
      </AnchorButton>
    </nav>
  );
};

export default Nav;
