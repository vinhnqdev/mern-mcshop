import React from "react";
import { Rating } from "components/Common";
import { HeartIcon, ShieldCheckIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { formatCurrency } from "utils";

const ProductDetail = ({ product, isLiked, onChangeLiked, onAddToCart }) => {
  return (
    <div className="col-span-1 py-5 lg:col-span-1">
      {/* Title */}
      <h2 className="text-2xl font-bold lg:text-3xl truncate-2-lines">{product.name}</h2>

      {/* Middle */}
      <div className="py-5 border-b border-t border-gray-300 space-y-4">
        <p className="mb-0">
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
        {/* Button */}
        <div className="flex items-center">
          <button
            onClick={() => onAddToCart(product)}
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
              onClick={onChangeLiked}
            >
              <HeartIcon className="h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="py-5 space-y-4">
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
  );
};

export default ProductDetail;
