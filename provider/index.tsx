// React
import { FC } from "react";

// Provider
import { ToastProvider } from "provider/ToastProvider";
import { GenerateProvider } from "provider/GenerateProvider";

export const Provider: FC = ({ children }) => {
  return (
    <ToastProvider>
      <GenerateProvider>{children}</GenerateProvider>
    </ToastProvider>
  );
};

export default Provider;
