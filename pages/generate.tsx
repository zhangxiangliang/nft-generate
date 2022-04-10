// React
import { NextPage } from "next";

// Components
import Panel from "components/panel/Panel";
import Layout from "components/layout/Layout";
import GenerateStatusPanel from "components/panel/GenerateStatusPanel";
import GenerateMetadataPanel from "components/panel/GenerateMetadataPanel";
import GenerateAttributesPanel from "components/panel/GenerateAttributesPanel";
import GeneratePreviewPanel from "components/panel/GeneratePreviewPanel";

const Generate: NextPage = () => {
  return (
    <Layout>
      <section className="flex w-full md:space-x-2 md:space-y-0 space-y-2 md:flex-nowrap flex-wrap">
        {/* Left */}
        <section className="lg:w-3/4 md:w-2/3  w-full">
          <section className="space-y-2">
            {/* Metadata */}
            <GenerateMetadataPanel />

            {/* Attributes */}
            <GenerateAttributesPanel />
          </section>
        </section>

        {/* Right */}
        <section className="lg:w-1/4 md:w-1/3 w-full space-y-2">
          <section className="space-y-2 md:sticky md:top-0 relative">
            {/* Preview */}
            <GeneratePreviewPanel />

            {/* Status */}
            <GenerateStatusPanel />
          </section>
        </section>
      </section>
    </Layout>
  );
};

export default Generate;
