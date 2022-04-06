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
      <section className="flex flex-1 space-x-5">
        <section className="w-2/3 space-y-5">
          {/* Metadata */}
          <GenerateMetadataPanel />

          {/* Attributes */}
          <GenerateAttributesPanel />
        </section>

        <section className="w-1/3 space-y-5">
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
