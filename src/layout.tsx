import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
// src/components/Layout.jsx
const Layout = ({ children }: LayoutProps) => {
  return <div className="bg-blue-950 text-white min-h-screen">{children}</div>;
};

export default Layout;
