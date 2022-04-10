// React
import { createContext, FC, useEffect, useState } from "react";

export interface GenerateAttributeImage {
  id: number;
  name: string;
  src: string;
  number: number;
  radio: number;
}

export const initialGenerateAttributeImage: GenerateAttributeImage = {
  id: -1,
  name: "",
  src: "",
  radio: 0,
  number: 0,
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
  limit: number;
  total: number;

  width: number;
  setWidth: (width: number) => void;

  height: number;
  setHeight: (height: number) => void;

  name: string;
  setName: (name: string) => void;

  description: string;
  setDescription: (description: string) => void;

  nfts: NFT[];
  createNfts: () => Promise<void>;

  attributes: GenerateAttribute[];
  createAttribute: () => Promise<void>;
  deleteAttribute: (attribute: GenerateAttribute) => Promise<void>;
  updateAttribute: (
    attribute: GenerateAttribute,
    changed: Partial<GenerateAttribute>
  ) => Promise<void>;
}

export const GenerateContext = createContext<GenerateState>({
  limit: 0,
  total: 0,

  width: 600,
  setWidth: () => "",

  height: 600,
  setHeight: () => "",

  name: "",
  setName: () => "",

  description: "",
  setDescription: () => "",

  nfts: [],
  createNfts: async () => {},

  attributes: [],
  createAttribute: async () => {},
  deleteAttribute: async () => {},
  updateAttribute: async () => {},
});

export interface Range {
  [key: string]: number[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface NFT {
  name: string;
  description: string;
  image: string;
  attributes: NFTAttribute[];
}

let _ranges: Range = {};

export const GenerateProvider: FC = ({ children }) => {
  const [index, setIndex] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(600);

  const [limit, setLimit] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [ranges, setRanges] = useState<Range>({});
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

    setAttributes((attributes) =>
      attributes.map((currentAttribute) =>
        attribute.sort !== currentAttribute.sort
          ? currentAttribute
          : { ...attribute, ...changed }
      )
    );
  };

  const createNfts = async () => {
    setNfts([]);
    _ranges = { ...ranges };
    await Promise.all(
      new Array(total).fill(0).map(async () => {
        const nft = await createNft();
        setNfts((nfts) => [...nfts, nft]);
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
    const images: string[] = [];
    const nftAttributes = attributes.map((attribute) => {
      const items = [..._ranges[attribute.id]];
      const rand = Math.random();
      const index = Math.floor(rand * items.length);

      const id = items[index];

      items.splice(index, 1);
      _ranges = { ...ranges, [attribute.id]: items };

      const image = attribute.images.find((image) => image.id == id) || {
        ...initialGenerateAttributeImage,
      };

      images.push(image.src);
      return { trait_type: attribute.name, value: image.name };
    });

    const image = await mergeImages(images);

    return {
      name,
      image,
      description,
      attributes: nftAttributes,
    };
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
      .reduce((acc, cur) => (cur < acc ? cur : acc), 10000);

    setTotal(total > 10000 ? 10000 : total);
    setLimit(realAttributes.length === 0 ? 0 : limit);
    setRanges(() =>
      attributes.reduce((acc, attribute) => {
        const ranges = attribute.images.reduce(
          (ranges: number[], image: GenerateAttributeImage) => {
            const newRanges = new Array(image.number).fill(image.id);
            return [...ranges, ...newRanges];
          },
          []
        );

        return { ...acc, [attribute.id]: ranges };
      }, {})
    );
  }, [attributes]);

  const value = {
    total,
    limit,

    width,
    setWidth,

    height,
    setHeight,

    name,
    setName,

    description,
    setDescription,

    nfts,
    createNfts,

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
