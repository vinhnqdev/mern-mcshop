import { HeartIcon, ShieldCheckIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { cartActions } from "../../app/cartSlice";
import { getProductDetail } from "../../app/productDetailSlice";
import { formatCurrency } from "../../helpers";
import Loading from "../UI/Loading";
import CustomRating from "./Rating";
import { Button, Drawer } from "antd";
import ReviewList from "./ReviewList";
import Review from "./Review";
import { unwrapResult } from "@reduxjs/toolkit";
import { getProducts } from "../../app/productThunk";
import ListProduct from "./ListProduct";

const ProductDetail = () => {
  const [image, setImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  );

  /** AntD State*/
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productDetails);
  const { products, loading: productsLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  useEffect(() => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const handleChangeImage = (index) => {
    setImage(index);
  };
  const handleChangeLikedStatus = () => {
    setIsLiked((prev) => !prev);
  };

  // if (!product) {
  //   return <p>Loading...</p>;
  // }

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

  if (loading) {
    return <Loading />;
  }

  if (!loading && product) {
    return (
      <div className="grid grid-cols-1 space-y-8 md:grid-cols-5 lg:grid-cols-2 gap-x-6">
        {/* Image Show */}
        <div className="flex place-self-center flex-col sm:flex-row sm:gap-x-4 md:col-span-3 lg:col-span-1">
          <div className="w-3/4 mx-auto lg:px-3">
            <img src={product.images[image]} alt="" className="w-full" />
          </div>
          <ul className="flex space-x-4 items-center mt-5 overflow-scroll scrollbar-hide sm:order-first sm:flex-col sm:space-x-0 sm:space-y-2 sm:h-96 sm:overflow-scroll sm:px-3">
            {product.images.map((image, index) => (
              <li
                className="w-20 h-20 p-2 border border-gray-400 flex-shrink-0 cursor-pointer"
                key={index}
                onClick={() => handleChangeImage(index)}
              >
                <img src={image} width="100%" height="100%" alt="" />
              </li>
            ))}
          </ul>
        </div>

        {/* Product Details */}
        <div className="md:col-span-2 lg:col-span-1">
          {/* Title */}
          <h2 className="text-2xl font-bold py-3 border-b border-gray-300 lg:text-3xl">
            {product.name}
          </h2>

          {/* Middle */}
          <div className="py-5 border-b border-gray-300 space-y-4">
            <p>
              THƯƠNG HIỆU{" "}
              <span className="uppercase text-yellow-500 font-bold cursor-pointer">
                {product.brand.name}
              </span>
            </p>
            <p className="text-2xl font-bold lg:text-3xl">
              {formatCurrency(product.price, "vi-VN", "VND")}
            </p>
            <span>Số lượng còn lại: {product.countInStock}</span>

            <CustomRating rating={product.rating} size="medium" />

            <div className="flex items-center">
              <button
                onClick={() => handleAddTocart(product)}
                className="flex-1 flex items-center justify-center space-x-3 bg-yellow-500 py-2 cursor-pointer rounded-full text-white"
              >
                <ShoppingCartIcon className="h-7 inline-block" />
                <span className="uppercase font-bold text-lg">Mua hàng</span>
              </button>
              <div className="w-14 flex items-center justify-center ">
                {/* Active Background Heart Icon bg-red-500 */}
                <div
                  className={`p-2 ${
                    isLiked ? "bg-red-500" : "bg-gray-500"
                  } rounded-full text-white cursor-pointer`}
                  onClick={handleChangeLikedStatus}
                >
                  <HeartIcon className="h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="py-2 space-y-4">
            <p className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-6" />
              <span className="text-sm font-medium lg:font-semibold">
                Bảo hành {product.guaranteeNum} tháng
              </span>
            </p>
            <ul className="list-disc list-inside pl-5">
              {product.descriptions.map((desc, index) => (
                <li key={desc._id}>{desc.description}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Review */}

        <ReviewList
          reviewList={product.reviews.slice(0, 3)}
          averageRating={product.rating}
          totalReview={[product.numReview]}
        />
        {product.reviews.length !== 0 && (
          <div>
            <Button style={{ fontSize: 13 }} size="large" onClick={showDrawer}>
              Xem tất cả bình luận
            </Button>
          </div>
        )}

        <Drawer
          title="Reviews"
          placement="right"
          // className="drawer-width"
          contentWrapperStyle={{
            fontFamily: "'Montserrat', sans-serif",
            width: screenWidth > 768 ? 768 : "100%",
          }}
          onClose={onCloseDrawer}
          visible={visibleDrawer}
        >
          <ul className="space-y-7">
            {product.reviews.map((review) => (
              <Review review={review} key={review._id} />
            ))}
          </ul>
        </Drawer>

        {/* Product Suggestion */}

        <div className="md:col-span-5">
          <ListProduct title="Sản phẩm cùng loại" products={products} loading={productsLoading} />
        </div>
      </div>
    );
  }
};

export default ProductDetail;
