import React from "react";
import { formatCurrency } from "../../helpers/";
function CheckoutCartItem({ item }) {
  return (
    <li className="bg-white flex items-center space-x-3 lg:space-x-10">
      {/** LEFT */}

      <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover border p-1 border-gray-600 w-full h-full rounded-lg"
        />
      </div>

      {/** RIGHT */}
      <div className="space-y-2 flex-1 flex items-center justify-between">
        <div>
          <h4 className="uppercase font-bold text-gray-700 text-sm lg:col-span-2 lg:text-lg lg:font-bold">
            {item.name}
          </h4>
          <p className="text-xs lg:text-base">X{item.quantity}</p>
        </div>

        <div className="text-yellow-500 font-bold lg:text-lg">
          {formatCurrency(item.price, "vi-VN", "VND")}
        </div>
      </div>
    </li>
  );
}

export default CheckoutCartItem;
