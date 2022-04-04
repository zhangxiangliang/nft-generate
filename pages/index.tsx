// React
import { NextPage } from "next";

// Components
import Button from "components/ui/Button";
import Layout from "components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <section className="flex flex-1 justify-center items-center">
        <div className="text-center space-y-5">
          <h1 className="text-4xl">NFT 生成器</h1>
          <p>一起踏上新世界</p>
          <Button>创建</Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
