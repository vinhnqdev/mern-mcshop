import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import productApi from "../api/productApi";
import { getCategoryList } from "../app/categoryThunk";
import { getProducts } from "../app/productThunk";
import ListProduct from "../components/Products/ListProduct";
import Carousel from "../components/UI/Slider";

const HomePage = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categoryList);
  const [bestSellerProduct, setBestSellerProdut] = useState([]);
  const [bestSellerLoading, setBestSellerLoading] = useState(false);
  const [arrivalProduct, setArrivalProduct] = useState([]);
  const [arrivalLoading, setArrivalLoading] = useState(false);
  const [productListByCategory, setProductListByCategory] = useState([]);
  const [laptopList, setLaptopList] = useState([]);
  const [laptopLoading, setLaptopLoading] = useState(false);

  useEffect(() => {
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

    fetchArrivalProduct().catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    const fetchBestSellerProduct = async () => {
      setBestSellerLoading(true);
      const actionResult = await dispatch(getProducts());
      const { products } = await unwrapResult(actionResult);
      setBestSellerLoading(false);
      setBestSellerProdut(products);
    };

    fetchBestSellerProduct().catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategoryList());
  }, [dispatch]);

  useEffect(() => {
    if (categoryList.length === 0) return;
    const promises = categoryList.map((category) => {
      return productApi.get({
        page: 1,
        limit: 7,
        category: category._id,
      });
    });

    Promise.all(promises)
      .then((data) => {
        setProductListByCategory(data.map(({ data: { products } }) => products));
      })
      .catch((error) => console.log(error));
  }, [categoryList]);

  // Laptop
  useEffect(() => {
    const fetchLaptopList = async () => {
      setLaptopLoading(true);
      const actionResult = await dispatch(
        getProducts({
          page: 1,
          limit: 6,
          category: "61762482f924b4fbf5493f56",
        })
      );
      const { products } = await unwrapResult(actionResult);
      setLaptopLoading(false);
      setLaptopList(products);
    };

    fetchLaptopList().catch((error) => console.log(error));
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

      {productListByCategory.map((prods, index) => (
        <ListProduct
          key={index}
          buyButton={true}
          title={categoryList[index].name}
          products={prods}
        />
      ))}

      {/* <ListProduct buyButton={true} title="Laptop" products={laptopList} loading={laptopLoading} /> */}
    </section>
  );
};

export default HomePage;
