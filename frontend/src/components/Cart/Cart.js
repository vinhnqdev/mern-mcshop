import React from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../helpers/";
import CartItem from "./CartItem";
function Cart() {
  const cart = useSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const itemQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  return (
    <div className="lg:grid grid-cols-6 gap-7">
      {/** Progress */}
      {/** Cart */}
      <div className="lg:col-span-4">
        <div className="flex items-center space-x-5 lg:grid lg:grid-cols-6 lg:space-x-0">
          <div className="lg:col-span-4 lg:flex items-center space-x-8">
            <h3 className="text-xl uppercase font-semibold lg:text-3xl lg:font-bold">Giỏ hàng</h3>
            <span className="hidden lg:inline-block uppercase text-gray-500 text-lg">
              {`( ${itemQuantity} Sản phẩm )`}
            </span>
          </div>
          <p className="text-gray-600 font-bold">Giá tiền</p>
          <p className="text-gray-600 font-bold">Số lượng</p>
          <div className="h-px bg-gray-500 flex-1 lg:hidden"></div>
        </div>

        <div className="bg-white shadow-xl mt-5">
          {/** Cart List */}
          <ul className="space-y-5 px-4 py-5">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </ul>
        </div>
      </div>

      {/** TotalPrice */}

      <div className="lg:col-span-2">
        {/** TotalPrice */}
        <div className="bg-white shadow-xl mt-7 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm lg:text-base">Tạm tính:</p>
            <p className="text-sm lg:text-base">{formatCurrency(totalPrice, "vi-VN", "VND")}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm lg:text-base">Vận chuyển:</p>
            <p className="text-sm lg:text-base">Miễn phí</p>
          </div>
          <div className="flex items-center justify-between mt-3 lg:mt-5">
            <p className="font-semibold lg:text-lg">Thành tiền:</p>
            <p className="font-semibold text-yellow-500 lg:text-lg">
              {formatCurrency(totalPrice, "vi-VN", "VND")}
            </p>
          </div>
        </div>

        {/** Checkout */}
        <div className="bg-white shadow-xl mt-7 p-4 space-y-3">
          <button className="bg-yellow-500 block w-full p-3 rounded-full text-white uppercase font-semibold lg:rounded-none lg:p-4 lg:text-lg">
            Thanh toán ngay
          </button>
          <button className=" block w-full p-3 rounded-full text-black border border-gray-300 font-normal lg:rounded-none lg:p-4 lg:text-lg">
            Quay về cửa hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
