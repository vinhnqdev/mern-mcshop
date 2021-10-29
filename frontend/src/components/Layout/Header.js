import React, { useEffect, useRef, useState } from "react";

import { SearchIcon, UserIcon, ShoppingCartIcon, CheckIcon, XIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
const Header = () => {
  const history = useHistory();
  const firstRender = useRef(true);
  let timerIdRef = useRef();
  const [isShownCartNotification, setIsShownCartNotification] = useState(false);
  const { user } = useSelector((state) => state.user.current);
  const cart = useSelector((state) => state.cart.cart);
  const messageAction = useSelector((state) => state.cart.messageAction);

  const cartQuantity = cart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (messageAction === "change" || messageAction === "remove") {
      return;
    }

    setIsShownCartNotification(true);
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    timerIdRef.current = setTimeout(() => {
      setIsShownCartNotification(false);
    }, 3000);
  }, [cart, messageAction]);

  return (
    <header className="fixed z-30 top-0 left-0 right-0 bg-black text-white flex items-center justify-between px-7 h-24">
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
          placeholder="Tìm kiếm sản phẩm"
          className="w-full max-w-3xl text-black text-sm p-3 border-none font-mont placeholder-gray-600 rounded-l-md outline-none"
        />
        <div className="bg-yellow-400 cursor-pointer w-12 rounded-r-md flex items-center justify-center">
          <SearchIcon className="h-7" />
        </div>
      </div>

      {/* Login and Cart */}
      <div className="flex items-center space-x-3 self-stretch">
        {user && (
          <span
            className="cursor-pointer hover:underline"
            onClick={() => history.push("/profile/edit")}
          >
            Hello {user.name}
          </span>
        )}
        {!user && (
          <div className="">
            <UserIcon
              className="h-11 p-2 bg-white rounded-full text-black cursor-pointer"
              onClick={() => history.push("/login")}
            />
          </div>
        )}
        <div className="relative flex items-center p-1 h-full">
          <ShoppingCartIcon
            className={`h-11 rounded-full bg-white text-black cursor-pointer p-2 transition transform ${
              isShownCartNotification && "animate-scaleUp"
            }`}
            onClick={() => history.push("/cart")}
          />

          {/** Cart items quantity */}
          <span className="absolute right-0 top-6 flex items-center justify-center text-black text-xs font-semibold w-5 h-5 rounded-full bg-yellow-400">
            {cartQuantity}
          </span>

          {/**  Show Add to Cart Message */}
          {messageAction === "add" && (
            <div
              className={`absolute top-full right-0 w-72 space-y-2 bg-white shadow-md p-3 text-black transition transform ${
                isShownCartNotification ? "translate-x-0" : "translate-x-96"
              }`}
            >
              <div className="flex items-center gap-x-2">
                <CheckIcon className="h-6 w-6 p-1 rounded-full bg-yellow-300 text-white" />
                <div className="text-sm">Thêm vào giỏ hàng thành công</div>
                <XIcon
                  className="h-4 self-start cursor-pointer"
                  onClick={() => setIsShownCartNotification(false)}
                />
              </div>
              <button
                className="border-black uppercase text-xs font-semibold border-2 w-full cursor-pointer text-center py-2 rounded-md transition duration-500 hover:bg-black hover:text-white"
                onClick={() => history.push("/cart")}
              >
                Xem giỏ hàng và thanh toán
              </button>

              <div className="triangle-up"></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
