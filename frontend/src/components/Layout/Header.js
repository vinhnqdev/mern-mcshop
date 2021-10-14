import React from "react";

import { SearchCircleIcon, UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
const Header = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart.cart);
  const cartQuantity = cart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
  return (
    <header className="fixed w-full top-0 z-50 bg-black text-white flex items-center justify-between px-5 py-7">
      {/* Logo */}
      <div className="text-3xl font-semibold cursor-pointer" onClick={() => history.push("/")}>
        MCSHOP
      </div>
      {/* Search */}
      <div className="flex-1 hidden items-stretch px-3 sm:flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          className="w-full max-w-3xl text-black text-sm p-2 border-none rounded-l-md outline-none"
        />
        <div className="bg-yellow-400 cursor-pointer w-10 rounded-r-md flex items-center justify-center">
          <SearchCircleIcon className="h-7" />
        </div>
      </div>

      {/* Login and Cart */}
      <div className="flex space-x-3">
        <div className="bg-white rounded-full p-1">
          <UserCircleIcon
            className="h-7 text-black cursor-pointer"
            onClick={() => history.push("/login")}
          />
        </div>
        <div onClick={() => history.push("/cart")} className="relative bg-white rounded-full p-1">
          <ShoppingCartIcon className="h-7 text-black cursor-pointer" />
          {/** Cart items quantity */}
          <span className="absolute flex items-center justify-center text-black text-xs font-semibold w-5 h-5 -top-2 -right-2 rounded-full bg-yellow-400">
            {cartQuantity}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
