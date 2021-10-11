import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../helpers/index";
import Rating from "./Rating";
const Product = ({ _id, image, name, price, discount, rating }) => {
  const originalPrice = discount ? price + (price * discount) / 100 : price;

  return (
    <li>
      <Link to={`/products/${_id}`} className="block space-y-3 hover:shadow-lg p-3">
        {/* Img */}
        <div className="relative">
          <img src={image} alt="" />
          {(discount || discount !== 0) && (
            <span className="absolute block top-4 left-2 bg-yellow-400 px-5 rounded-full font-semibold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <p className="text-sm">{name}</p>
        </div>
        {/* Rating */}
        <Rating rating={rating} />
        {/* Price */}
        <div className="space-y-2">
          <p className="bg-black inline-block text-white font-semibold px-2 rounded-sm">
            {formatCurrency(price, "vi-VN", "VND")}
          </p>
          {(discount || discount !== 0) && (
            <p className="text-sm text-gray-700 line-through px-2">
              {formatCurrency(originalPrice, "vi-VN", "VND")}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
};

export default Product;
