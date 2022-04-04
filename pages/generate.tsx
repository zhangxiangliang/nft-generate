// React
import { NextPage } from "next";

// Components
import Layout from "components/layout/Layout";

const Generate: NextPage = () => {
  return (
    <Layout>
      <section className="flex flex-1 justify-center items-center">
        <div className="text-center space-y-5">
          <h1 className="text-4xl">Generate</h1>
        </div>
      </section>
    </Layout>
  );
};

export default Generate;
