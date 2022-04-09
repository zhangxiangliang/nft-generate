// React
import { NextPage } from "next";

// Utils
import { PAGE_GENERATE } from "utils/page";

// Components
import Layout from "components/layout/Layout";
import AnchorButton from "components/ui/AnchorButton";

const Home: NextPage = () => {
  return (
    <Layout>
      <section className="flex flex-1 justify-center items-center">
        <div className="text-center space-y-2">
          <h1 className="text-4xl">NFT 生成器</h1>
          <p>一起踏上新世界</p>
          <AnchorButton href={PAGE_GENERATE} className="inline-block">
            创建
          </AnchorButton>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
