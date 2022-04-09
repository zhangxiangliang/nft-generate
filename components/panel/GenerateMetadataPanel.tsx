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
  const { name, rarity, description, setName, setRarity, setDescription } =
    useContext(GenerateContext);

  return (
    <Panel title="信息" className="grid grid-cols-3 gap-3">
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
      <Select
        title="稀有度"
        value={rarity}
        onChange={(event) => setRarity(event.target.value as any)}
        options={[
          { key: "开启", value: "open" },
          { key: "关闭", value: "close" },
        ]}
      />
    </Panel>
  );
};

export default GenerateMetadataPanel;
