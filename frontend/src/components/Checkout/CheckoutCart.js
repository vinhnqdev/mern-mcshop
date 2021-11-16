import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutCartItem from "./CheckoutCartItem";
import { formatCurrency } from "../../helpers/";
import { Link, useHistory } from "react-router-dom";
import PaymentMethod from "./PaymentMethod";
import { createOrder } from "../../app/orderThunk";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cartActions } from "../../app/cartSlice";
import Button from "../UI/Button";
function CheckoutCart() {
  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.order.loading);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const shippingAddress = useSelector((state) => state.user.userAddress);
  const [screenWidth, setScreenWidth] = useState(
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const itemQuantity = cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const handlePaymentMethod = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
  };

  const handleOrder = async () => {
    try {
      const actionResult = await dispatch(
        createOrder({
          cart,
          shippingAddress,
          paymentMethod,
          totalPrice,
          isPaid: paymentMethod === "visa",
        })
      );
      const order = unwrapResult(actionResult);
      dispatch(cartActions.clearCart());
      history.push(`/checkout/success?order_code=${order._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResize = () => {
    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    setScreenWidth(screenWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 md:gap-x-4">
      {/**  Orders */}

      <div className="md:col-span-4">
        {/** Đơn hàng */}
        <div className="flex items-center space-x-5 lg:grid lg:grid-cols-6 lg:space-x-0">
          <div className="md:col-span-4 md:flex items-center space-x-8">
            <h3 className="text-xl uppercase mb-0 font-bold md:text-2xl lg:text-3xl lg:font-bold">
              Đơn hàng
            </h3>
            <span className="hidden md:inline-block uppercase text-gray-500 text-lg">
              {`( ${itemQuantity} Sản phẩm )`}
            </span>
          </div>
        </div>

        {/** List Product */}
        <div className="bg-white shadow-xl mt-5">
          {/** Cart List */}
          <ul className="space-y-5 px-4 py-5 max-h-96 overflow-y-scroll scrollbar-hide">
            {cart.map((item) => (
              <CheckoutCartItem key={item._id} item={item} />
            ))}
          </ul>
        </div>
      </div>

      {/** Address And TotalPrice */}

      <div className="md:col-span-2">
        {/** Address */}
        <div className="bg-white shadow-xl mt-7 p-4 space-y-1 md:mt-0">
          <div className="flex items-center justify-between text-sm">
            <h5 className="font-semibold lg:text-lg">{shippingAddress.name}</h5>
            <Link to="/checkout/shipping" className="text-yellow-500 cursor-pointer">
              Thay đổi
            </Link>
          </div>
          <p className="text-sm lg:text-base">{shippingAddress.address}</p>
          <p className="text-sm lg:text-base">Điện thoại: {shippingAddress.phone}</p>
        </div>
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
        {/** Payment Method */}
        {screenWidth < 768 && (
          <PaymentMethod
            onCheckPaymentMethod={handlePaymentMethod}
            defaultPayment={paymentMethod}
          />
        )}
        {/** Actions */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-xl mt-7 p-4 space-y-3">
            <Button
              onClick={handleOrder}
              disabled={loading}
              className="mc_button mc_button--primary mc_button--pos-tl mc_button--round-sm uppercase font-semibold w-full px-4 py-3"
            >
              Đặt hàng
            </Button>
          </div>
        </div>
      </div>

      {/** Payment Method */}
      {screenWidth > 768 && (
        <PaymentMethod onCheckPaymentMethod={handlePaymentMethod} defaultPayment={paymentMethod} />
      )}
    </div>
  );
}

export default CheckoutCart;
