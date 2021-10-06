import React from "react";

import { SearchCircleIcon, UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/solid";
const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-black text-white flex items-center justify-between p-5">
      {/* Logo */}
      <div className="text-3xl font-semibold cursor-pointer">MCSHOP</div>
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
      <div className="flex space-x-2">
        <div className="bg-white rounded-full p-1">
          <UserCircleIcon className="h-6 text-black cursor-pointer" />
        </div>
        <div className="bg-white rounded-full p-1">
          <ShoppingCartIcon className="h-6 text-black cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
