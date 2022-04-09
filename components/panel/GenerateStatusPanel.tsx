// React
import { NextPage } from "next";
import { useContext } from "react";

// Components
import Input from "components/form/Input";
import Button from "components/ui/Button";
import Panel from "components/panel/Panel";

// Providers
import { GenerateContext } from "provider/GenerateProvider";

const GenerateStatusPanel: NextPage = () => {
  const { attributes, total, limit } = useContext(GenerateContext);

  return (
    <Panel title="统计" className="space-y-2">
      <Input
        title="属性数量"
        placeholder="请输入 NFT 属性数量"
        value={attributes.length}
        disabled
      />
      <Input
        title="组合上限"
        placeholder="请输入 NFT 组合上限"
        value={limit}
        disabled
        onChange={(event) => ""}
      />
      <Input
        title="生成数量"
        placeholder="请输入 NFT 生成数量"
        value={total}
        disabled
        onChange={(event) => ""}
      />
      <section className="space-x-2">
        <Button>随机预览</Button>
        <Button>自动生成</Button>
        <Button>手动生成</Button>
      </section>
    </Panel>
  );
};

export default GenerateStatusPanel;
