import React from "react";
import { StarIcon } from "@heroicons/react/solid";
const formatCurrency = (quanlity, locale, currency) => {
  return quanlity.toLocaleString(locale, { style: "currency", currency: currency });
};

const Product = ({ image, name, price, discount, rating }) => {
  const originalPrice = discount ? price + (price * discount) / 100 : price;

  return (
    <li>
      <a href="" className="block space-y-3 hover:shadow-lg p-3">
        {/* Img */}
        <div className="relative">
          <img src={image} alt="" />
          {discount && (
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
        <div>
          <ul className="flex items-center">
            {Array(+rating.toFixed())
              .fill()
              .map((x, idx) => {
                return (
                  <li key={idx}>
                    <StarIcon className="h-4 text-yellow-400" />
                  </li>
                );
              })}
          </ul>
          <span className="text-xs text-gray-700">3 reviews</span>
        </div>
        {/* Price */}
        <div className="space-y-2">
          <p className="bg-black inline-block text-white font-semibold px-2 rounded-sm">
            {formatCurrency(price, "vi-VN", "VND")}
          </p>
          {discount && (
            <p className="text-sm text-gray-700 line-through px-2">
              {formatCurrency(originalPrice, "vi-VN", "VND")}
            </p>
          )}
        </div>
      </a>
    </li>
  );
};

export default Product;
