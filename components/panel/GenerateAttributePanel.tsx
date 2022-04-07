// React
import { FC } from "react";

// Icon
import {
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";

// Components
import Button from "components/ui/Button";

// Provider
import {
  GenerateAttribute,
  initialGenerateAttribute,
} from "provider/GenerateProvider";

export interface GenerateAttributePanelProps {
  isLast: boolean;
  isFirst: boolean;

  title?: string;
  className?: string;
  attribute?: GenerateAttribute;
  onChangeAttribute?: (
    attribute: GenerateAttribute,
    changed: Partial<GenerateAttribute>
  ) => void;
}

export const GenerateAttributePanel: FC<GenerateAttributePanelProps> = ({
  isLast = false,
  isFirst = false,

  attribute = { ...initialGenerateAttribute },
  onChangeAttribute = () => "",
}) => {
  return (
    <section className="border-2 rounded-md border-black border-opacity-10">
      <header className="border-b-2 border-black border-opacity-10 p-3 flex justify-between items-center">
        <input
          type="text"
          value={attribute.name}
          className="focus:outline-none w-1/2 text-sm"
          onChange={(event) =>
            onChangeAttribute(attribute, { name: event.target.value })
          }
        />

        <section className="space-x-1">
          {!isFirst && (
            <Button
              onClick={() =>
                onChangeAttribute(attribute, { sort: attribute.sort - 1 })
              }
            >
              <ChevronUpIcon className="h-3 w-4 text-white" />
            </Button>
          )}
          {!isLast && (
            <Button
              onClick={() =>
                onChangeAttribute(attribute, { sort: attribute.sort + 1 })
              }
            >
              <ChevronDownIcon className="h-3 w-4 text-white" />
            </Button>
          )}
          <Button onClick={() => onChangeAttribute(attribute, {})}>
            <TrashIcon className="h-3 w-4 text-white" />
          </Button>
        </section>
      </header>
      <main className="p-3">
        {attribute.images.length === 0 && (
          <p className="select-none text-sm">暂无任何图片</p>
        )}
      </main>
    </section>
  );
};

export default GenerateAttributePanel;
