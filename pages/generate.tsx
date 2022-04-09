// React
import { NextPage } from "next";

// Components
import Panel from "components/panel/Panel";
import Layout from "components/layout/Layout";
import GenerateMetadataPanel from "components/panel/GenerateMetadataPanel";
import GenerateAttributesPanel from "components/panel/GenerateAttributesPanel";

const Generate: NextPage = () => {
  return (
    <Layout>
      <section className="flex w-full md:space-x-2 md:space-y-0 space-y-2 ">
        {/* Left */}
        <section className="lg:w-3/4 md:w-2/3 sm:w-1/2 w-full">
          <section className="space-y-2">
            {/* Metadata */}
            <GenerateMetadataPanel />

            {/* Attributes */}
            <GenerateAttributesPanel />
          </section>
        </section>

        {/* Right */}
        <section className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full space-y-2">
          {/* Preview */}
          <Panel
            title="预览"
            className="bg-black bg-opacity-50 w-full pb-full h-0 rounded-md overflow-hidden"
          >
            <canvas />
          </Panel>
        </section>
      </section>
    </Layout>
  );
};

export default Generate;
