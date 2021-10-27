import React from "react";

import { SearchCircleIcon, UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
const Header = () => {
  const history = useHistory();
  const { user } = useSelector((state) => state.user.current);
  const cart = useSelector((state) => state.cart.cart);
  const cartQuantity = cart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return (
    <header className="fixed z-50 top-0 w-full bg-black text-white flex items-center justify-between px-7 py-7">
      {/* Logo */}
      <div
        className="text-3xl font-semibold cursor-pointer tracking-wider"
        onClick={() => history.push("/")}
      >
        MCSHOP
      </div>
      {/* Search */}
      <div className="flex-1 hidden items-stretch px-10 sm:flex justify-center">
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
      <div className="flex items-center space-x-3">
        {user && (
          <span
            className="cursor-pointer hover:underline"
            onClick={() => history.push("/profile/edit")}
          >
            Hello {user.name}
          </span>
        )}
        {!user && (
          <div className="bg-white rounded-full p-1">
            <UserCircleIcon
              className="h-7 text-black cursor-pointer"
              onClick={() => history.push("/login")}
            />
          </div>
        )}
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
