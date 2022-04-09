// React
import { createContext, FC, useCallback, useEffect, useState } from "react";

export interface GenerateAttributeImage {
  id: number;
  name: string;
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
  limit: number;
  total: number;

  name: string;
  rarity: "open" | "close";
  description: string;

  attributes: GenerateAttribute[];

  setName: (name: string) => void;
  setRarity: (rarity: "open" | "close") => void;
  setDescription: (description: string) => void;

  createAttribute: () => void;
  deleteAttribute: (attribute: GenerateAttribute) => void;
  updateAttribute: (
    attribute: GenerateAttribute,
    changed: Partial<GenerateAttribute>
  ) => void;
}

export const GenerateContext = createContext<GenerateState>({
  limit: 0,
  total: 0,

  name: "",
  rarity: "close",
  description: "",

  setName: () => "",
  setRarity: () => "",
  setDescription: () => "",

  attributes: [],
  createAttribute: () => "",
  deleteAttribute: () => "",
  updateAttribute: () => "",
});

export const GenerateProvider: FC = ({ children }) => {
  const [index, setIndex] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [limit, setLimit] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [rarity, setRarity] = useState<"close" | "open">("close");
  const [description, setDescription] = useState<string>("");
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

    setAttributes((attributes) =>
      attributes.map((currentAttribute) =>
        attribute.sort !== currentAttribute.sort
          ? currentAttribute
          : { ...attribute, ...changed }
      )
    );
  };

  useEffect(() => {
    const realAttributes = attributes.filter(
      (attribute) => attribute.images.length !== 0
    );

    const limit = realAttributes.reduce(
      (acc, attribute) => acc * attribute.images.length,
      1
    );

    const total = attributes
      .map((attribute) =>
        attribute.images.reduce((acc, image) => acc + image.number, 0)
      )
      .reduce((acc, cur) => (cur > acc ? cur : acc), 0);

    setTotal(total);
    setLimit(realAttributes.length === 0 ? 0 : limit);
  }, [attributes]);

  const value = {
    total,
    limit,

    name,
    rarity,
    description,

    setName,
    setRarity,
    setDescription,

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
