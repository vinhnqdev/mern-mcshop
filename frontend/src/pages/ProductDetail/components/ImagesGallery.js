import React from "react";

const ImagesGallery = ({ product, imageIndex, onChange }) => {
  return (
    <div className="flex place-self-center flex-col sm:flex-row sm:gap-x-4 lg:col-span-1">
      <div className="w-3/4 mx-auto lg:px-3">
        <img src={product.images[imageIndex]} alt="" className="w-full" />
      </div>
      <ul className="flex space-x-4 items-center mt-5 overflow-scroll scrollbar-hide sm:order-first sm:flex-col sm:space-x-0 sm:space-y-2 sm:h-96 sm:overflow-scroll sm:px-3">
        {product.images.map((image, index) => (
          <li
            className="w-20 h-20 p-2 border border-gray-400 flex-shrink-0 cursor-pointer"
            key={index}
            onClick={() => onChange(index)}
          >
            <img src={image} width="100%" height="100%" alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImagesGallery;
