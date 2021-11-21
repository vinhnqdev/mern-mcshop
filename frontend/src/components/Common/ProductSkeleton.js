import LoadingPlaceHolder from "components/UI/LoadingPlaceHolder";
import React from "react";

function ProductSkeleton({ buyButton }) {
  return (
    <div className="flex flex-col space-y-3 p-3 hover:shadow-lg group cursor-pointer">
      {/* Img */}
      <div className="relative">
        <div className="overflow-hidden" style={{ width: "100%", aspectRatio: "1/1" }}>
          <LoadingPlaceHolder extraStyles={{ width: "100%", aspectRatio: "1/1" }} />
        </div>
      </div>

      {/* Title */}
      <div>
        <p className="text-sm truncate-2-lines text-gray-800 h-10">
          {/* {name} */}
          <LoadingPlaceHolder
            extraStyles={{ width: "100%", height: "16px", marginBottom: "5px" }}
          />
          <LoadingPlaceHolder extraStyles={{ width: "100%", height: "16px" }} />
        </p>
      </div>
      {/* Rating */}

      {/* <Rating rating={rating} /> */}
      <div>
        <div>
          <ul className="flex items-center mb-3">
            <LoadingPlaceHolder extraStyles={{ width: "50%", height: "16px", padding: "2px 0" }} />
          </ul>
        </div>
        <div className={`text-gray-700`}>
          <LoadingPlaceHolder extraStyles={{ width: "50%", height: "16px" }} />
        </div>
      </div>

      {/* Price */}

      <div className="text-white font-semibold mb-1 rounded-sm">
        <LoadingPlaceHolder extraStyles={{ width: "50%", height: "16px" }} />
      </div>

      {/* Actions */}
      {buyButton && (
        <div className="relative flex items-center">
          <LoadingPlaceHolder extraStyles={{ width: "100%", height: "32px" }} />
        </div>
      )}
    </div>
  );
}

export default ProductSkeleton;
