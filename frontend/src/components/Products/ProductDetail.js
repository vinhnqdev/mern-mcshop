import { HeartIcon, ShieldCheckIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { cartActions } from "../../app/cartSlice";
import { getProductDetail } from "../../app/productDetailSlice";
import { formatCurrency } from "../../helpers";
import Loading from "../UI/Loading";
import Rating from "./Rating";
const ProductDetail = () => {
  const [image, setImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector((state) => state.productDetails);
  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(getProductDetail(id));
    };
    fetchProduct();
  }, [dispatch, id]);

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
        {/* Left */}
        <div className="flex flex-col sm:flex-row sm:gap-x-4 md:col-span-3 lg:col-span-1">
          <div className="w-3/4 mx-auto lg:px-3">
            <img src={product.images[image]} alt="" className="w-full h-full" />
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

        {/* Right */}
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

            <Rating rating={product.rating} size="medium" />

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
              <li>{product.description}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetail;
