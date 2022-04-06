// React
import { NextPage } from "next";

// Components
import Input from "components/form/Input";
import Panel from "components/panel/Panel";
import Select from "components/form/Select";

const GenerateMetadataPanel: NextPage = () => {
  return (
    <Panel title="信息设置" className="grid grid-cols-3 gap-3">
      <Input title="名称" placeholder="请输入 NFT 名称" />
      <Input title="描述" placeholder="请输入 NFT 描述" />
      <Select
        title="稀有度"
        options={[
          { key: "开启", value: "open" },
          { key: "关闭", value: "close" },
        ]}
      />
    </Panel>
  );
};

export default GenerateMetadataPanel;
