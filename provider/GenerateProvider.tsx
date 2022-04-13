// React
import { createContext, FC, useEffect, useState } from "react";

// Provider
import { NFT } from "provider/NFTProvider";

export interface GenerateAttributeImage {
  id: number;
  src: string;
  name: string;
}

export const initialGenerateAttributeImage: GenerateAttributeImage = {
  id: -1,
  src: "",
  name: "",
};

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
  max: number;

  width: number;
  setWidth: (width: number) => void;

  height: number;
  setHeight: (height: number) => void;

  name: string;
  setName: (name: string) => void;

  description: string;
  setDescription: (description: string) => void;

  generateNfts: NFT[];
  createGenerateNfts: () => Promise<void>;

  attributes: GenerateAttribute[];
  createAttribute: () => Promise<void>;
  deleteAttribute: (attribute: GenerateAttribute) => Promise<void>;
  updateAttribute: (
    attribute: GenerateAttribute,
    changed: Partial<GenerateAttribute>
  ) => Promise<void>;
}

export const GenerateContext = createContext<GenerateState>({
  max: 0,

  width: 600,
  setWidth: () => "",

  height: 600,
  setHeight: () => "",

  name: "",
  setName: () => "",

  description: "",
  setDescription: () => "",

  generateNfts: [],
  createGenerateNfts: async () => {},

  attributes: [],
  createAttribute: async () => {},
  deleteAttribute: async () => {},
  updateAttribute: async () => {},
});

const TOTAL = 10;

export const GenerateProvider: FC = ({ children }) => {
  const [index, setIndex] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [max, setMax] = useState<number>(0);
  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(600);

  const [generateNfts, setGenerateNfts] = useState<NFT[]>([]);
  const [attributes, setAttributes] = useState<GenerateAttribute[]>([]);

  const createAttribute = async () => {
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

  const deleteAttribute = async (attribute: GenerateAttribute) =>
    setAttributes((attributes) =>
      attributes
        .filter((currentAttribute) => currentAttribute.sort !== attribute.sort)
        .map((currentAttribute, index) => ({
          ...currentAttribute,
          sort: index + 1,
        }))
    );

  const updateAttribute = async (
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
    changed.sort === undefined &&
      setAttributes((attributes) =>
        attributes.map((currentAttribute) =>
          attribute.sort !== currentAttribute.sort
            ? currentAttribute
            : { ...attribute, ...changed }
        )
      );
  };

  const createGenerateNfts = async () => {
    setGenerateNfts([]);
    await Promise.all(
      new Array(TOTAL).fill(0).map(async () => {
        const nft = await createNft();
        setGenerateNfts((generateNfts) => [...generateNfts, nft]);
        return nft;
      })
    );
  };

  const loadingImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject("");
      img.src = src;
    });
  };

  const mergeImages = async (images: string[]) => {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    for (let i = 0; i < images.length; i++) {
      const image = await loadingImage(images[i]);

      ctx.drawImage(image, 0, 0, 600, 600);
    }

    return canvas.toDataURL();
  };

  const createNft = async (): Promise<NFT> => {
    const images: GenerateAttributeImage[] = [];
    const nftAttributes = attributes.map((attribute) => {
      const items = attribute.images;
      const rand = Math.random();
      const index = Math.floor(rand * items.length);
      const image = items[index];

      images.push(image);
      return { trait_type: attribute.name, value: image.name };
    });

    return {
      name,
      description,
      attributes: nftAttributes,
      image: await mergeImages(images.map((i) => i.src)),
    };
  };

  useEffect(() => {
    const exists = attributes.filter(
      (attribute) => attribute.images.length !== 0
    );

    const max =
      exists.length === 0
        ? 0
        : exists.reduce((acc, cur) => acc * cur.images.length, 1);

    setMax(max);
  }, [attributes]);

  const value = {
    max,

    width,
    setWidth,

    height,
    setHeight,

    name,
    setName,

    description,
    setDescription,

    generateNfts,
    createGenerateNfts,

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
