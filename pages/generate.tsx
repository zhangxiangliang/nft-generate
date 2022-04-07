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
      <section className="flex flex-1 md:space-x-2  md:space-y-0 space-y-2 flex-wrap">
        {/* Left */}
        <section className="md:flex-1 w-full">
          <section className="space-y-2">
            {/* Metadata */}
            <GenerateMetadataPanel />

            {/* Attributes */}
            <GenerateAttributesPanel />
          </section>
        </section>

        {/* Right */}
        <section className="md:w-96 w-full space-y-2">
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
