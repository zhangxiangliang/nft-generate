// React
import { NextPage } from "next";
import { useContext, useEffect } from "react";

// Components
import Panel from "components/panel/Panel";

// Providers
import { GenerateContext } from "provider/GenerateProvider";
import classNames from "classnames";
import { borderColor } from "utils/style";

const GeneratePreviewPanel: NextPage = () => {
  const { nfts } = useContext(GenerateContext);

  return (
    <Panel title="预览">
      <section className={classNames(borderColor, "border rounded-md")}>
        <main className="flex p-3 space-x-3 overflow-x-auto scroll">
          {nfts.map((nft, index) => (
            <div key={index} className="flex-none select-none w-48 space-y-2">
              <img src={nft.image} className="w-48 h-48 m-0 p-0 rounded-md" />
            </div>
          ))}
        </main>
      </section>
    </Panel>
  );
};

export default GeneratePreviewPanel;