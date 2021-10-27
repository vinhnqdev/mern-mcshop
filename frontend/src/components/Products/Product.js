import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../helpers/index";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import Rating from "./Rating";
import { cartActions } from "../../app/cartSlice";
const Product = ({ _id, images, name, price, discount, rating }) => {
  const dispatch = useDispatch();

  const originalPrice = discount ? price + (price * discount) / 100 : price;

  const handleAddToCart = (e) => {
    e.preventDefault();
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

  return (
    <li>
      <Link to={`/products/${_id}`} className="flex flex-col space-y-3 shadow-lg p-3 group">
        {/* Img */}
        <div className="relative">
          <img src={images[0]} alt="" />
          {(discount || discount !== 0) && (
            <span className="absolute z-20 block top-4 left-2 bg-yellow-400 px-5 rounded-full font-semibold">
              -{discount}%
            </span>
          )}

          {/** Overlay */}
          <div className="absolute z-10 left-0 top-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center space-x-5 transition transform origin-bottom-right duration-300  scale-0 group-hover:scale-100">
            <div
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full transition transform duration-300 hover:scale-110"
            >
              <ShoppingCartIcon className="h-8" />
            </div>
            <div className="bg-white p-2 rounded-full transition transform duration-300 hover:scale-110">
              <HeartIcon className="h-8" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <p className="text-sm truncate text-gray-800">{name}</p>
        </div>
        {/* Rating */}
        <Rating rating={rating} />
        {/* Price */}
        <div>
          <p className="bg-black inline-block text-white font-semibold px-2 rounded-sm">
            {formatCurrency(price, "vi-VN", "VND")}
          </p>

          <p className={`text-sm text-gray-700 line-through px-2`}>
            {discount === 0 ? (
              <span className="opacity-0">0</span>
            ) : (
              formatCurrency(originalPrice, "vi-VN", "VND")
            )}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Product;
