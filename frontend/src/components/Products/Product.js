import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../app/cartSlice";
import { formatCurrency } from "../../helpers/index";
import Rating from "./Rating";
const Product = ({ _id, images, name, price, discount, rating, buyButton }) => {
  const dispatch = useDispatch();

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
      <Link to={`/products/${_id}`} className="flex flex-col space-y-3 p-3 hover:shadow-lg group">
        {/* Img */}
        <div className="relative">
          <img src={images[0]} alt="" />
          {(discount || discount !== 0) && (
            <span className="absolute z-20 block top-4 text-black left-2 bg-yellow-400 px-5 rounded-full font-semibold">
              -{discount}%
            </span>
          )}

          <div className="absolute right-0 top-0 text-xs text-white bg-black px-2 py-1 opacity-0 transition duration-700 hover:underline group-hover:opacity-100">
            Quickview
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
          <p className="bg-black inline-block text-white font-semibold px-2 mb-1 rounded-sm">
            {formatCurrency(price, "vi-VN", "VND")}
          </p>
        </div>

        {/* Actions */}
        {buyButton && (
          <div className="relative flex items-center">
            <button
              className="btn-add-to-cart bg-black text-white text-xs w-1/2 rounded-sm py-2 font-semibold transition hover:bg-gray-900"
              onClick={handleAddToCart}
            >
              BUY NOW
            </button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default Product;
