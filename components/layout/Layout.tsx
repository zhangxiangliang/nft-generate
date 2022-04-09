// React
import { FC } from "react";

// Components
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";
import SiteMeta from "components/layout/SiteMeta";

export const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-screen max-w-full">
      <SiteMeta />

      <Header />

      <main className="p-3 flex flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
