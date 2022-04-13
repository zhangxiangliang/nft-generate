// React
import { createContext, FC } from "react";

export interface NFTState {}

export const NFTContext = createContext<NFTState>({});

export interface NFT {
  name: string;
  description: string;
  image: string;
  attributes: NFTAttribute[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export const NFTProvider: FC = ({ children }) => {
  const value = {};

  return <NFTContext.Provider value={value}>{children}</NFTContext.Provider>;
};

export default NFTProvider;
