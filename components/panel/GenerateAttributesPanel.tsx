// React
import { NextPage } from "next";
import { useContext } from "react";

// NPM
import FlipMove from "react-flip-move";

// Components
import Panel from "components/panel/Panel";
import GenerateAttributePanel from "components/panel/GenerateAttributePanel";

// Provider
import { GenerateAttribute, GenerateContext } from "provider/GenerateProvider";

const GenerateAttributesPanel: NextPage = () => {
  const { attributes, createAttribute, updateAttribute, deleteAttribute } =
    useContext(GenerateContext);

  const onCreateAttribute = () => createAttribute();

  const onChangeAttribute = (
    attribute: GenerateAttribute,
    changed: Partial<GenerateAttribute>
  ) => {
    Object.keys(changed).length === 0
      ? deleteAttribute(attribute)
      : updateAttribute(attribute, changed);
  };

  return (
    <Panel
      title="属性"
      className="space-y-2"
      actions={[{ text: "创建", onClick: onCreateAttribute }]}
    >
      {attributes.length === 0 && (
        <section className="border-2 rounded-md border-black border-opacity-10">
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
              // Event
              onChangeAttribute={onChangeAttribute}
            />
          </div>
        ))}
      </FlipMove>
    </Panel>
  );
};

export default GenerateAttributesPanel;
