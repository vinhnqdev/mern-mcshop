import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  // const [hideHeader, setHideHeader] = useState(false);
  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 80 && window.scrollY > scrollY) {
  //       setHideHeader(true);
  //       setScrollY(window.scrollY);
  //     }

  //     if (window.scrollY < 80 || window.scrollY < scrollY) {
  //       setHideHeader(false);
  //       setScrollY(window.scrollY);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scrollY]);

  return (
    <>
      <Header />
      <main className="p-5 max-w-7xl mx-auto mt-24 min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
