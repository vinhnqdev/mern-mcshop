import React from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../helpers/";
import CartItem from "./CartItem";
import { useHistory } from "react-router-dom";
import { Empty, Button } from "antd";
function Cart() {
  const cart = useSelector((state) => state.cart.cart);

  const history = useHistory();
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
          <div className="lg:col-span-4 lg:flex lg:items-center space-x-8">
            <h3 className="text-xl uppercase font-semibold mb-0 lg:text-3xl lg:font-bold">
              Giỏ hàng
            </h3>

            <span className="hidden lg:inline-block uppercase text-gray-500 text-lg">
              {`( ${itemQuantity} Sản phẩm )`}
            </span>
          </div>
          <p className="text-gray-600 font-bold hidden lg:block">Giá tiền</p>
          <p className="text-gray-600 font-bold hidden lg:block">Số lượng</p>
          <div className="h-px bg-gray-500 flex-1 lg:hidden"></div>
        </div>

        {/** Cart List */}
        {cart.length === 0 ? (
          <Empty
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 60,
            }}
            description="Không có sản phẩm nào trong giỏ hàng của bạn"
            image="/images/empty-cart.png"
            imageStyle={{ height: 150 }}
          >
            <Button type="primary" onClick={() => history.push("/")}>
              Tiếp tục mua sắm
            </Button>
          </Empty>
        ) : (
          <div className="bg-white shadow-xl mt-5">
            <ul className="space-y-5 px-4 py-5">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </ul>
          </div>
        )}
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
          <button
            disabled={cart.length === 0}
            onClick={() => history.push("/checkout/shipping")}
            className={`relative group z-10 border  block w-full p-3 rounded-full ${
              cart.length !== 0 && "hover:border-yellow-500 hover:text-black"
            } ${
              cart.length === 0 && "cursor-not-allowed"
            } text-white uppercase font-semibold lg:rounded-none lg:p-4 lg:text-lg`}
          >
            <span
              className={`absolute -z-10 top-0 left-0 w-full h-full origin-right ${
                cart.length === 0
                  ? "bg-opacity-70 cursor-not-allowed"
                  : "bg-opacity-100 cursor-pointer"
              } bg-yellow-500 transition transform ${cart.length !== 0 && "group-hover:scale-x-0"}`}
            ></span>
            Mua ngay
          </button>
          <button
            onClick={() => history.push("/")}
            className=" block w-full p-3 rounded-full text-black border border-gray-300 font-normal lg:rounded-none lg:p-4 lg:text-lg"
          >
            Quay về cửa hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
