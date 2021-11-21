import React, { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../app/cartSlice";
import { formatCurrency } from "utils";
import { Rating } from "./Rating";
import Highlighter from "react-highlight-words";
import Button from "../UI/Button";
import { Tooltip } from "antd";
import LoadingPlaceHolder from "components/UI/LoadingPlaceHolder";
import ProductSkeleton from "./ProductSkeleton";

export const Product = forwardRef(
  (
    {
      _id,
      images,
      name,
      price,
      discount,
      rating,
      buyButton,
      searchTerm,
      onClick,
      isSkeleton = false,
    },
    ref
  ) => {
    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);

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

    const handleLoaded = () => {
      setLoaded(true);
    };

    if (isSkeleton) {
      return <ProductSkeleton buyButton={buyButton} />;
    }

    return (
      <div ref={ref}>
        <Link
          to={`/products/${_id}`}
          onClick={onClick ? onClick : () => {}}
          className="flex flex-col space-y-3 p-3 hover:shadow-lg group"
        >
          {/* Img */}
          <div className="relative">
            <div className="overflow-hidden" style={{ width: "100%", aspectRatio: "1/1" }}>
              {!loaded && (
                <LoadingPlaceHolder extraStyles={{ width: "100%", aspectRatio: "1/1" }} />
              )}

              <img src={images[0]} alt={name} onLoad={handleLoaded} />
            </div>
            {(discount || discount !== 0) && loaded && (
              <span className="absolute z-20 block top-4 text-black left-2 bg-yellow-400 px-5 rounded-full font-semibold">
                -{discount}%
              </span>
            )}
            {loaded && (
              <div className="absolute right-0 top-0 text-xs text-white bg-black px-2 py-1 opacity-0 transition duration-700 hover:underline group-hover:opacity-100">
                Quickview
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <p className="text-sm truncate-2-lines text-gray-800 h-10">
              {/* {name} */}
              {!loaded && (
                <>
                  <LoadingPlaceHolder
                    extraStyles={{ width: "100%", height: "16px", marginBottom: "5px" }}
                  />
                  <LoadingPlaceHolder extraStyles={{ width: "100%", height: "16px" }} />
                </>
              )}
              {loaded && (
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
              )}
            </p>
          </div>
          {/* Rating */}
          {!loaded && (
            <div>
              <div>
                <ul className="flex items-center mb-3">
                  <LoadingPlaceHolder
                    extraStyles={{ width: "50%", height: "16px", padding: "2px 0" }}
                  />
                </ul>
              </div>
              <div className={`text-gray-700`}>
                <LoadingPlaceHolder extraStyles={{ width: "50%", height: "16px" }} />
              </div>
            </div>
          )}
          {loaded && <Rating rating={rating} />}

          {/* Price */}
          <div>
            {!loaded && <LoadingPlaceHolder extraStyles={{ width: "50%", height: "16px" }} />}
            {loaded && (
              <p className="bg-black inline-block text-white font-semibold px-2 mb-1 rounded-sm">
                {formatCurrency(price, "vi-VN", "VND")}
              </p>
            )}
          </div>

          {/* Actions */}
          {buyButton && (
            <div className="relative flex items-center">
              {!loaded && <LoadingPlaceHolder extraStyles={{ width: "100%", height: "32px" }} />}
              {loaded && (
                <Button
                  className="mc_button_reverse mc_button--secondary mc_button--pos-tl mc_button--round-sm mc_button--uppercase text-xs w-full sm:w-3/4 lg:w-1/2 font-semibold py-2 border border-black"
                  onClick={handleAddToCart}
                >
                  Buy now
                </Button>
              )}
            </div>
          )}
        </Link>
      </div>
    );
  }
);
