// React
import { FC } from "react";
import { GenerateAttributeProvider } from "./GenerateAttributeProvider";

export const Provider: FC = ({ children }) => {
  return <GenerateAttributeProvider>{children}</GenerateAttributeProvider>;
};

export default Provider;
