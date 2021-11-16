import React from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../helpers/";
import CartItem from "./CartItem";
import { useHistory } from "react-router-dom";
import { Empty, message } from "antd";
import MCButton from "../UI/Button";
import { XCircleIcon } from "@heroicons/react/solid";
function Cart() {
  const cart = useSelector((state) => state.cart.cart);

  const history = useHistory();
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const itemQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      return message.error({
        content: "Giỏ hàng rỗng",
        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
    }
    history.push("/checkout/shipping");
  };

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
          <p className="text-gray-600 mb-0 font-bold hidden lg:block">Giá tiền</p>
          <p className="text-gray-600 mb-0 font-bold hidden lg:block">Số lượng</p>
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
            <MCButton
              className="mc_button mc_button--primary mc_button--pos-tl mc_button--round-sm px-4 py-2"
              onClick={() => history.push("/")}
            >
              Tiếp tục mua sắm
            </MCButton>
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
          <MCButton
            // disabled={cart.length === 0}
            onClick={handleCheckout}
            className="mc_button mc_button--primary mc_button--pos-tl mc_button--round-sm mc_button--uppercase w-full py-4 font-semibold"
          >
            Mua ngay
          </MCButton>

          <MCButton
            onClick={() => history.push("/")}
            className="mc_button_reverse mc_button--secondary mc_button--pos-tr mc_button--round-sm mc_button--uppercase w-full py-4 font-semibold"
          >
            Quay về cửa hàng
          </MCButton>
        </div>
      </div>
    </div>
  );
}

export default Cart;
