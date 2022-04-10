// React
import { ChangeEvent, FC, useContext, useRef } from "react";

// Icon
import { TrashIcon } from "@heroicons/react/solid";
import { UploadIcon } from "@heroicons/react/outline";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/solid";

// NPM
import classNames from "classnames";

// Utils
import { borderColor } from "utils/style";

// Components
import Button from "components/ui/Button";
import CapsuleInput from "components/form/CapsuleInput";

// Provider
import { GenerateContext } from "provider/GenerateProvider";
import { GenerateAttribute } from "provider/GenerateProvider";
import { GenerateAttributeImage } from "provider/GenerateProvider";
import { initialGenerateAttribute } from "provider/GenerateProvider";

export interface GenerateAttributePanelProps {
  isLast: boolean;
  isFirst: boolean;

  title?: string;
  className?: string;
  attribute?: GenerateAttribute;
}

const toBase64 = (file: File): Promise<GenerateAttributeImage> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
    reader.onload = () =>
      resolve({
        id: 0,
        src: reader.result as string,
        name: file.name.replace(/\.[^/.]+$/, ""),
      });
  });

export const GenerateAttributePanel: FC<GenerateAttributePanelProps> = ({
  isLast = false,
  isFirst = false,

  attribute = { ...initialGenerateAttribute },
}) => {
  const { updateAttribute, deleteAttribute } = useContext(GenerateContext);

  const onChangeAttribute = (
    attribute: GenerateAttribute,
    changed: Partial<GenerateAttribute>
  ) => {
    Object.keys(changed).length === 0
      ? deleteAttribute(attribute)
      : updateAttribute(attribute, changed);
  };

  const uploadRef = useRef<HTMLInputElement>(null);

  const onClickUpload = () => uploadRef?.current?.click();

  const onChangeUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const images: GenerateAttributeImage[] = await Promise.all(
      files.map(async (file, index) => ({
        ...(await toBase64(file)),
        id: index,
      }))
    );

    if (images.length === 0) return;

    onChangeAttribute(attribute, { images });
  };

  const onChangeAttributeImage = async (
    image: GenerateAttributeImage,
    changed: Partial<GenerateAttributeImage>
  ) => {
    const newImage = { ...image, ...changed };

    const images = attribute.images.map((currentImage) =>
      currentImage.id !== newImage.id ? currentImage : { ...newImage }
    );

    onChangeAttribute(attribute, { images });
  };

  return (
    <section className={classNames(borderColor, "border rounded-md ")}>
      <header
        className={classNames(
          borderColor,
          "border-b p-3 flex justify-between items-center"
        )}
      >
        <input
          type="text"
          value={attribute.name}
          className="focus:outline-none w-1/3 text-sm"
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
          <Button onClick={() => onClickUpload()}>
            <UploadIcon className="h-3 w-4 text-white" />
          </Button>
          <Button onClick={() => onChangeAttribute(attribute, {})}>
            <TrashIcon className="h-3 w-4 text-white" />
          </Button>
        </section>
      </header>
      <input
        type="file"
        multiple
        ref={uploadRef}
        style={{ display: "none" }}
        onChange={(event) => onChangeUpload(event)}
      />
      <main className="flex p-3 space-x-3 overflow-x-auto scroll">
        {attribute.images.length === 0 && (
          <p className="select-none text-sm">暂无任何图片</p>
        )}

        {attribute.images.map((image) => (
          <div key={image.id} className="flex-none select-none w-48 space-y-2">
            <img src={image.src} className="w-48 h-48 m-0 p-0 rounded-md" />
            <CapsuleInput
              title="名称"
              type="text"
              value={image.name}
              placeholder="请输入图片名称"
              onChange={(event) =>
                onChangeAttributeImage(image, { name: event.target.value })
              }
            />
          </div>
        ))}
      </main>
    </section>
  );
};

export default GenerateAttributePanel;
