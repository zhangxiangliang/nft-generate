// React
import { NextPage } from "next";
import { useContext } from "react";

// Components
import Input from "components/form/Input";
import Button from "components/ui/Button";
import Panel from "components/panel/Panel";

/// NPM
import { toast } from "react-toastify";

// Providers
import { GenerateContext } from "provider/GenerateProvider";

const GenerateStatusPanel: NextPage = () => {
  const { attributes, createNfts, name, description } =
    useContext(GenerateContext);

  const onCreate = async () => {
    if (name === "") {
      toast.error("NFT 名称不能为空");
      return;
    }
    if (description === "") {
      toast.error("NFT 描述不能为空");
      return;
    }
    createNfts();
  };

  return (
    <Panel title="统计" className="space-y-2">
      <Input
        title="属性数量"
        placeholder="请输入 NFT 属性数量"
        value={attributes.length}
        disabled
      />
      <section className="space-x-2">
        <Button onClick={() => onCreate()}>自动生成</Button>
      </section>
    </Panel>
  );
};

export default GenerateStatusPanel;
