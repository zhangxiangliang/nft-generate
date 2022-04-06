// React
import { FC } from "react";

// Provider
import { GenerateProvider } from "provider/GenerateProvider";

export const Provider: FC = ({ children }) => {
  return <GenerateProvider>{children}</GenerateProvider>;
};

export default Provider;
