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
