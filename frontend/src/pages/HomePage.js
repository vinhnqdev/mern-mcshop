import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../app/productThunk";
import ListProduct from "../components/Products/ListProduct";
import Carousel from "../components/UI/Slider";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section>
      <Carousel />
      <ListProduct
        buyButton={true}
        title="Sản phẩm bán chạy nhất"
        products={products}
        loading={loading}
      />
    </section>
  );
};

export default HomePage;
