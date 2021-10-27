import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../app/orderThunk";
import { formatShippingDate } from "../helpers/date";
import Loading from "../components/UI/Loading";
function SuccessOrderPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.orderDetail);
  const loading = useSelector((state) => state.order.loading);

  const { order_code } = queryString.parse(location.search);

  useEffect(() => {
    if (order_code) {
      dispatch(getOrderById(order_code));
    }
  }, [dispatch, order_code]);

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(order).length === 0) {
    return <p>Opps!! Something went wrong</p>;
  }

  return (
    <div className="bg-white shadow-2xl p-3 w-full max-w-5xl mx-auto lg:p-6">
      <div className="space-y-4">
        <h3 className="text-yellow-500 font-medium">Cảm ơn bạn đã mua hàng tại MC Shop</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Image */}
          <div className="flex items-center justify-center">
            <img src="/images/success_order.jpeg" alt="order_success_image" />
          </div>

          {/* Content */}
          <div className="flex flex-col space-y-3">
            <p className="text-sm">Mã đơn hàng của bạn là:</p>
            <span className="inline-block bg-yellow-400 py-2 px-4 font-semibold self-start">
              {order._id}
            </span>
            <p className="text-sm">
              Bạn có thể xem lại{" "}
              <Link className="text-blue-500 cursor-pointer" to={`/profile/view/${order._id}`}>
                đơn hàng của tôi
              </Link>
            </p>
            <p className="text-yellow-500 text-xs lg:text-sm">
              Đơn hàng được vận chuyển đến hoặc qua các khu vực đang bị ảnh hưởng bởi Covid-19 sẽ có
              thể giao chậm hơn dự kiến. Kính mong quý khách thông cảm.
            </p>
            <div className="flex items-end space-x-3">
              <img src="/images/icon_order.jpeg" alt="" />
              <span className="text-xs">
                Thời gian dự kiến {formatShippingDate(order.createdAt, 3)} -{" "}
                {formatShippingDate(order.createdAt, 5)}
              </span>
            </div>
            <p className="text-xs lg:text-sm">
              Thông tin chi tiết về đơn hàng đã được gửi đến địa chỉ mail &nbsp;
              <a href="mailto:ngoquangvinh1997tg@gmail.com" className="text-yellow-500">
                {order.user?.email}
              </a>
              . Nếu không tìm thấy vui lòng kiểm tra trong hộp thư{" "}
              <span className="font-semibold">Spam</span> hoặc{" "}
              <span className="font-semibold">Junk Folder</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessOrderPage;
