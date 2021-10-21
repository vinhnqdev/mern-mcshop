import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="p-5 max-w-7xl mx-auto mt-24 min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
