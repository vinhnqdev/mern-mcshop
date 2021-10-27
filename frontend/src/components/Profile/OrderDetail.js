import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { deliverOrder, getOrderById } from "../../app/orderThunk";
import { formatReadableDate, formatShippingDate } from "../../helpers/date";
import {
  ClipboardListIcon,
  LocationMarkerIcon,
  BadgeCheckIcon,
  CashIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid";
import { formatCurrency } from "../../helpers";
import { Link } from "react-router-dom";
import Loading from "../UI/Loading";
import { Button, message } from "antd";
import { unwrapResult } from "@reduxjs/toolkit";
function OrderDetail({ isAdmin }) {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector((state) => state.order.orderDetail);

  const loading = useSelector((state) => state.order.loading);

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(order).length === 0) {
    return <p>Opps!! Something went wrong</p>;
  }

  const handleDeliveredOrder = async () => {
    try {
      const actionResult = await dispatch(deliverOrder(id));
      await unwrapResult(actionResult);
      history.push("/admin/order-list");
      message.success({
        content: "Cập nhật thành công",
        icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
        className: "custom-message custom-message-success",
      });
    } catch (error) {
      message.error({
        content: error.message,
        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
    }
  };

  return (
    <div className="mt-8 space-y-6 md:mt-0">
      <div>
        {isAdmin && (
          <Button type="primary" onClick={handleDeliveredOrder}>
            Delivered
          </Button>
        )}
      </div>
      {/** Time and Order Code */}
      <div className="bg-white shadow-xl px-3 py-2 lg:px-5 lg:py-4">
        <div className="flex space-x-2">
          <ClipboardListIcon className="h-6 w-6 text-yellow-500" />
          <p className="text-sm lg:text-base">
            Đơn hàng <span>#{order._id}</span> -{" "}
            <span className="font-medium text-yellow-500 lg:text-lg">
              {order.isDelivered ? "Đã nhận hàng" : "Đang giao hàng"}
            </span>
          </p>
        </div>
        <div>
          <p className="text-xs lg:text-sm">Ngày đặt hàng: {formatReadableDate(order.createdAt)}</p>
          <p className="text-xs lg:text-sm">
            Dự kiến giao hàng {formatShippingDate(order.createdAt, 3)} -{" "}
            {formatShippingDate(order.createdAt, 5)}
          </p>
        </div>
      </div>

      {/** Location */}
      <div className="bg-white shadow-xl px-3 py-2 lg:px-5 lg:py-4">
        <div className="flex space-x-2">
          <LocationMarkerIcon className="h-6 w-6 text-yellow-500" />
          <p className="text-sm lg:text-base">Địa chỉ người nhận</p>
        </div>

        <div className="text-xs lg:text-sm">
          <p className="font-medium">{order.shippingAddress?.name}</p>
          <p className="text-gray-800">{order.shippingAddress?.phone}</p>
          <p className="text-gray-800">{order.shippingAddress?.address}</p>
        </div>
      </div>

      {/** Order detail */}
      <div className="bg-white shadow-xl px-3 py-2 lg:px-5 lg:py-4">
        <div className="flex space-x-2 mb-2">
          <BadgeCheckIcon className="h-6 w-6 text-yellow-500" />
          <p className="text-sm lg:text-base">Sản phẩm đã mua</p>
        </div>

        <ul className="space-y-3">
          {order.orderItems?.map((item) => (
            <li key={item._id} className="flex space-x-3">
              <div className="border border-gray-400 w-20 h-20 p-1 rounded-lg">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-sm lg:text-base">{item.name}</p>
                <div className="space-x-3 text-xs lg:text-sm">
                  <span>x {item.quantity}</span>
                  <span>{formatCurrency(item.price, "vi-VN", "VND")}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/** Payment Method */}
      <div className="bg-white shadow-xl px-3 py-2 lg:px-5 lg:py-4">
        <div className="flex space-x-2">
          <CashIcon className="h-6 w-6 text-yellow-500" />
          <p className="text-sm lg:text-base">Phương thức thanh toán</p>
        </div>

        <p className="text-xs lg:text-sm">
          {order.paymentMethod === "cod"
            ? "Thanh toán khi nhận hàng"
            : "Đã thanh toán quả thẻ tín dụng"}
        </p>
      </div>

      {/** Total Price */}
      <div className="bg-white shadow-xl px-3 py-2 lg:px-5 lg:py-4">
        <div className="flex items-center justify-between py-2 border-b last:border-b-0">
          <div className="text-xs lg:text-sm text-gray-600">Tạm tính</div>
          <div className="text-sm text-gray-800">
            {formatCurrency(order.totalPrice, "vi-VN", "VND")}
          </div>
        </div>
        <div className="flex items-center justify-between py-2 border-b last:border-b-0">
          <div className="text-xs lg:text-sm text-gray-600">Phí vận chuyển</div>
          <div className="text-sm text-gray-800">
            {formatCurrency(order.shippingPrice, "vi-VN", "VND")}
          </div>
        </div>
        <div className="flex items-center justify-between py-2 border-b last:border-b-0">
          <div className="text-xs lg:text-sm font-semibold">Thành tiền</div>
          <div className="font-medium">
            {formatCurrency(order.shippingPrice + order.totalPrice, "vi-VN", "VND")}
          </div>
        </div>
      </div>

      <div className="mt-3 text-blue-500 text-sm">
        <Link to="/admin/order-list">Quay lại quản lý đơn hàng</Link>
      </div>
    </div>
  );
}

export default OrderDetail;
