// React
import { NextPage } from "next";
import { useContext } from "react";

// Components
import Input from "components/form/Input";
import Panel from "components/panel/Panel";
import Select from "components/form/Select";

// Providers
import { GenerateContext } from "provider/GenerateProvider";

const GenerateMetadataPanel: NextPage = () => {
  const {
    width,
    height,
    setWidth,
    setHeight,
    name,
    description,
    setName,
    setDescription,
  } = useContext(GenerateContext);

  return (
    <Panel title="信息" className="grid grid-cols-4 gap-4">
      <Input
        title="名称"
        placeholder="请输入 NFT 名称"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        title="描述"
        placeholder="请输入 NFT 描述"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Input
        title="宽度"
        placeholder="请输入 NFT 宽度"
        type="number"
        value={width}
        onChange={(event) => setWidth(Number(event.target.value || 0))}
      />
      <Input
        title="高度"
        placeholder="请输入 NFT 高度"
        type="number"
        value={height}
        onChange={(event) => setHeight(Number(event.target.value || 0))}
      />
    </Panel>
  );
};

export default GenerateMetadataPanel;
