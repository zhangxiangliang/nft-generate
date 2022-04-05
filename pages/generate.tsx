// React
import { NextPage } from "next";
import { useState } from "react";

// NPM
import FlipMove from "react-flip-move";

// Components
import Input from "components/form/Input";
import Panel from "components/panel/Panel";
import Select from "components/form/Select";
import Layout from "components/layout/Layout";
import GenerateAttributePanel from "components/panel/GenerateAttributePanel";

// Provider
import { GenerateAttribute } from "provider/GenerateAttributeProvider";

const Generate: NextPage = () => {
  const [attributes, setAttributes] = useState<GenerateAttribute[]>([]);

  const onAttributeCreate = () => {
    const sort = attributes.length + 1;
    const defaultName = "Attribute";
    setAttributes((attributes) => [
      ...attributes,
      {
        id: sort,
        sort: sort,
        name: `${defaultName} # ${sort}`,
        images: [],
      },
    ]);
  };

  const onAttributeChange = (
    attribute: GenerateAttribute,
    changed: Partial<GenerateAttribute>
  ) => {
    // Delete
    if (Object.keys(changed).length === 0) {
      setAttributes((attributes) =>
        attributes
          .filter(
            (currentAttribute) => currentAttribute.sort !== attribute.sort
          )
          .map((currentAttribute, index) => ({
            ...currentAttribute,
            sort: index + 1,
          }))
      );
    }

    // Change Name
    if (changed.name !== undefined) {
      setAttributes((attributes) =>
        attributes.map((currentAttribute) =>
          attribute.sort !== currentAttribute.sort
            ? currentAttribute
            : { ...attribute, name: changed.name as string }
        )
      );
    }

    // Change Sort
    if (changed.sort !== undefined) {
      setAttributes(() =>
        attributes
          .map((currentAttribute) => {
            if (changed.sort === currentAttribute.sort) {
              return { ...currentAttribute, sort: attribute.sort as number };
            }

            if (attribute.sort === currentAttribute.sort) {
              return { ...currentAttribute, sort: changed.sort as number };
            }

            return { ...currentAttribute };
          })
          .sort((before, after) => {
            return before.sort > after.sort ? 1 : -1;
          })
      );
    }
  };

  return (
    <Layout>
      <section className="flex flex-1 space-x-5">
        <section className="w-2/3 space-y-5">
          {/* Info */}
          <Panel
            title="信息设置"
            className="flex md:space-x-2 space-x-0  space-y-2 md:space-y-0 md:flex-nowrap flex-wrap"
          >
            <Input
              title="名称"
              placeholder="请输入 NFT 名称"
              className="md:w-1/3 w-full"
            />
            <Input
              title="描述"
              placeholder="请输入 NFT 描述"
              className="md:w-1/3 w-full"
            />
            <Select
              title="稀有度"
              className="md:w-1/3 w-full"
              options={[
                { key: "开启", value: "open" },
                { key: "关闭", value: "close" },
              ]}
            />
          </Panel>

          {/* Info */}
          <Panel
            title="属性"
            className="space-y-5"
            actions={[{ text: "创建", onClick: onAttributeCreate }]}
          >
            {attributes.length === 0 && (
              <section className="border-2 rounded-md border-black border-opacity-10">
                <main className="p-5">
                  <p>点击创建您的第一个属性</p>
                </main>
              </section>
            )}

            <FlipMove
              className="space-y-5"
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
                    onAttributeChange={onAttributeChange}
                  />
                </div>
              ))}
            </FlipMove>
          </Panel>
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
