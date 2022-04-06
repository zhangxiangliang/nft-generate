// React
import { createContext, FC, useState } from "react";

export interface GenerateAttributeImage {
  src: string;
  number: number;
  radio: number;
}

export interface GenerateAttribute {
  id: number;
  sort: number;
  name: string;
  images: GenerateAttributeImage[];
}

export const initialGenerateAttribute: GenerateAttribute = {
  id: -1,
  sort: -1,
  name: "",
  images: [],
};

export interface GenerateState {
  attributes: GenerateAttribute[];

  createAttribute: () => void;
  deleteAttribute: (attribute: GenerateAttribute) => void;
  updateAttribute: (
    attribute: GenerateAttribute,
    changed: Partial<GenerateAttribute>
  ) => void;
}

export const GenerateContext = createContext<GenerateState>({
  attributes: [],
  createAttribute: () => "",
  deleteAttribute: () => "",
  updateAttribute: () => "",
});

export const GenerateProvider: FC = ({ children }) => {
  const [index, setIndex] = useState<number>(0);
  const [attributes, setAttributes] = useState<GenerateAttribute[]>([]);

  const createAttribute = () => {
    setAttributes((attributes) => [
      ...attributes,
      {
        id: index,
        sort: index,
        name: `Attribute # ${index}`,
        images: [],
      },
    ]);

    setIndex((index) => index + 1);
  };

  const deleteAttribute = (attribute: GenerateAttribute) =>
    setAttributes((attributes) =>
      attributes
        .filter((currentAttribute) => currentAttribute.sort !== attribute.sort)
        .map((currentAttribute, index) => ({
          ...currentAttribute,
          sort: index + 1,
        }))
    );

  const updateAttribute = (
    attribute: GenerateAttribute,
    changed: Partial<GenerateAttribute>
  ) => {
    changed.name !== undefined &&
      setAttributes((attributes) =>
        attributes.map((currentAttribute) =>
          attribute.sort !== currentAttribute.sort
            ? currentAttribute
            : { ...attribute, name: changed.name as string }
        )
      );

    changed.sort !== undefined &&
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
  };

  const value = {
    attributes,
    createAttribute,
    deleteAttribute,
    updateAttribute,
  };

  return (
    <GenerateContext.Provider value={value}>
      {children}
    </GenerateContext.Provider>
  );
};

export default GenerateProvider;
