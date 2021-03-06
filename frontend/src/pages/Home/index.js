import { unwrapResult } from "@reduxjs/toolkit";
import productApi from "api/productApi";
import { getCategoryList } from "app/categoryThunk";
import { getProducts } from "app/productThunk";
import { ListProduct, Meta } from "components/Common";
import Carousel from "components/UI/Slider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categoryList);
  const [bestSellerProduct, setBestSellerProdut] = useState([]);
  const [bestSellerLoading, setBestSellerLoading] = useState(false);
  const [arrivalProduct, setArrivalProduct] = useState([]);
  const [arrivalLoading, setArrivalLoading] = useState(false);
  const [productListByCategory, setProductListByCategory] = useState([]);

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

  return (
    <section className="space-y-10">
      <Meta />
      <Carousel />
      <ListProduct
        buyButton={true}
        title="S???n ph???m b??n ch???y nh???t"
        products={bestSellerProduct}
        loading={bestSellerLoading}
      />
      <ListProduct
        buyButton={true}
        title="S???n ph???m m???i v???"
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
    </section>
  );
};

export default HomePage;
