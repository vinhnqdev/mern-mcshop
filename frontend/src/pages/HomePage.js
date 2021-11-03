import React from "react";
import ListProduct from "../components/Products/ListProduct";
import Carousel from "../components/UI/Slider";

const HomePage = () => {
  return (
    <section>
      <Carousel />
      <ListProduct />
    </section>
  );
};

export default HomePage;
