import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../app/productThunk";
import ListProduct from "../components/Products/ListProduct";
import Carousel from "../components/UI/Slider";

const HomePage = () => {
  const dispatch = useDispatch();
  // const { products, loading } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProdut] = useState([]);
  const [bestSellerLoading, setBestSellerLoading] = useState(false);
  const [arrivalProduct, setArrivalProduct] = useState([]);
  const [arrivalLoading, setArrivalLoading] = useState(false);
  useEffect(() => {
    const fetchBestSellerProduct = async () => {
      setBestSellerLoading(true);
      const actionResult = await dispatch(getProducts());
      const { products } = await unwrapResult(actionResult);
      setBestSellerLoading(false);
      setBestSellerProdut(products);
    };

    const fetchArrivalProduct = async () => {
      setArrivalLoading(true);
      const actionResult = await dispatch(
        getProducts({
          order: "desc",
          sort: "createdAt",
        })
      );
      const { products } = await unwrapResult(actionResult);
      setArrivalLoading(false);
      setArrivalProduct(products);
    };

    fetchBestSellerProduct().catch((error) => console.log(error));
    fetchArrivalProduct().catch((error) => console.log(error));
  }, [dispatch]);

  return (
    <section className="space-y-10">
      <Carousel />
      <ListProduct
        buyButton={true}
        title="Sản phẩm bán chạy nhất"
        products={bestSellerProduct}
        loading={bestSellerLoading}
      />
      <ListProduct
        buyButton={true}
        title="Sản phẩm mới về"
        products={arrivalProduct}
        loading={arrivalLoading}
      />
    </section>
  );
};

export default HomePage;
