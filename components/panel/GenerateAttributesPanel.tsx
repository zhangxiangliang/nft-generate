// React
import { NextPage } from "next";
import { useContext } from "react";

// NPM
import classNames from "classnames";
import FlipMove from "react-flip-move";

// Components
import Panel from "components/panel/Panel";
import GenerateAttributePanel from "components/panel/GenerateAttributePanel";

// Utils
import { borderColor } from "utils/style";

// Provider
import { GenerateContext } from "provider/GenerateProvider";

const GenerateAttributesPanel: NextPage = () => {
  const { attributes, createAttribute } = useContext(GenerateContext);

  const onCreateAttribute = () => createAttribute();

  return (
    <Panel
      title="属性"
      className="space-y-2"
      actions={[{ text: "创建", onClick: onCreateAttribute }]}
    >
      {attributes.length === 0 && (
        <section className={classNames(borderColor, "border rounded-md")}>
          <main className="p-3 cursor-pointer" onClick={onCreateAttribute}>
            <p className="text-sm select-none">点击创建您的第一个属性</p>
          </main>
        </section>
      )}

      <FlipMove
        className="space-y-2"
        staggerDurationBy="30"
        enterAnimation="fade"
        leaveAnimation="fade"
      >
        {attributes.map((attribute, index) => (
          <div key={attribute.id}>
            <GenerateAttributePanel
              // Item
              attribute={attribute}
              // Index
              isFirst={index + 1 === 1}
              isLast={index + 1 === attributes.length}
            />
          </div>
        ))}
      </FlipMove>
    </Panel>
  );
};

export default GenerateAttributesPanel;
