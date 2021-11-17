import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../app/cartSlice";
import { formatCurrency } from "utils";
import { Rating } from "./Rating";
import Highlighter from "react-highlight-words";
import Button from "../UI/Button";
import { Tooltip } from "antd";

export const Product = forwardRef(
  ({ _id, images, name, price, discount, rating, buyButton, searchTerm, onClick }, ref) => {
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
      <div ref={ref}>
        <Link
          to={`/products/${_id}`}
          onClick={onClick ? onClick : () => {}}
          className="flex flex-col space-y-3 p-3 hover:shadow-lg group"
        >
          {/* Img */}
          <div className="relative">
            <div className="aspect-h-1 aspect-w-1">
              <img src={images[0]} alt="" />
            </div>
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
            <p className="text-sm truncate-2-lines text-gray-800 h-10">
              {/* {name} */}
              <Tooltip title={name}>
                {searchTerm ? (
                  <Highlighter
                    highlightClassName="hightlight-text"
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={name}
                  />
                ) : (
                  name
                )}
              </Tooltip>
            </p>
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
              <Button
                className="mc_button_reverse mc_button--secondary mc_button--pos-tl mc_button--round-sm mc_button--uppercase text-xs w-full sm:w-3/4 lg:w-1/2 font-semibold py-2 border border-black"
                onClick={handleAddToCart}
              >
                Buy now
              </Button>
            </div>
          )}
        </Link>
      </div>
    );
  }
);
