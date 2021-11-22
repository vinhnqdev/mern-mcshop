import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "app/productDetailSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { getProducts } from "app/productThunk";
import Loading from "components/UI/Loading";
import ImagesGallery from "./components/ImagesGallery";
import ProductDetail from "./components/ProductDetail";
import { cartActions } from "app/cartSlice";
import ReviewList from "./components/ReviewList";
import { ListProduct, Meta } from "components/Common";

const ProductDetailPage = () => {
  const [image, setImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productDetails);
  const { products } = useSelector((state) => state.products);

  //Smooth Scroll To Top
  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // Fetch product Detail and Same Category Product
  useEffect(() => {
    const fetchProduct = async () => {
      const actionResult = await dispatch(getProductDetail(id));
      const product = await unwrapResult(actionResult);
      dispatch(
        getProducts({
          category: product.category._id,
        })
      );
    };
    fetchProduct();
  }, [dispatch, id]);

  const handleAddTocart = ({ _id, images, name, price, discount }) => {
    dispatch(
      cartActions.addToCart({
        _id,
        image: images[0],
        name,
        price,
        discount,
        quantity: 1,
      })
    );
  };

  if (loading || !product) {
    return <Loading />;
  }

  return (
    <section>
      <Meta title={product.name} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 space-y-8 lg:space-y-0">
        <ImagesGallery product={product} imageIndex={image} onChange={(index) => setImage(index)} />
        <ProductDetail
          product={product}
          isLiked={isLiked}
          onChangeLiked={() => setIsLiked((prev) => !prev)}
          onAddToCart={handleAddTocart}
        />
      </div>
      <ReviewList
        reviewList={product?.reviews.slice(0, 3)}
        averageRating={product.rating}
        totalReview={[product.numReview]}
      />

      <ListProduct
        containerStyle={{ marginTop: "32px" }}
        headerStyle={{ fontSize: "18px" }}
        title="Sản phẩm cùng loại"
        products={products}
      />
    </section>
  );
};

export default ProductDetailPage;
