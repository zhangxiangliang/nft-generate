// React
import { FC } from "react";

// NPM
import { ToastContainer } from "react-toastify";

export const ToastProvider: FC = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer autoClose={1000} position="bottom-right" />
    </>
  );
};

export default ToastProvider;
