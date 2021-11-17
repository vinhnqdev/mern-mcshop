import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyOrders } from "app/orderThunk";
import { formatCurrency } from "utils";
import Loading from "components/UI/Loading";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (orders?.length === 0) {
    return <p>Bạn chưa mua đơn hàng nào.</p>;
  }

  return (
    <ul className="space-y-3 lg:space-y-6">
      {/** Order Item */}
      {orders?.map((order) => (
        <li key={order._id} className="bg-white shadow-md rounded-md px-2 py-4 space-y-5 lg:px-5">
          <p className="py-2 border-b text-sm lg:text-base lg:font-medium">
            {order.isDelivered ? "Đang xử lí" : "Đang vận chuyển"}
          </p>

          <div className="space-y-2 md:flex md:gap-x-3">
            <div className="flex items-center space-x-3 md:flex-1">
              <div className="w-20 h-20 lg:w-24 lg:h-24">
                <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <p className="font-medium text-sm lg:text-base truncate-2-lines">{order.name}</p>
                <div className="text-xs text-gray-600 lg:text-sm">
                  <span>{order.quantity} sản phẩm</span> |{" "}
                  <span>{formatCurrency(order.price, "vi-VN", "VND")}</span>
                </div>
              </div>
            </div>

            {/** Links */}
            <div className="flex flex-col sm:flex-row gap-3 md:w-1/3 md:flex-col md:justify-center">
              <Link
                to={`/profile/view/${order.order_id}`}
                className="mc_button_reverse mc_button--secondary mc_button--pos-tr mc_button--round-md mc_button--uppercase text-xs sm:text-sm text-center py-2 w-full sm:w-1/2 md:w-full"
              >
                Xem chi tiết
              </Link>

              {/* <Link
                to={`/profile/track/${order.order_id}`}
                className="mc_button_reverse mc_button--primary mc_button--pos-tl mc_button--round-md mc_button--uppercase text-xs sm:text-sm text-center py-2 w-full sm:w-1/2 md:w-full"
              >
                Theo dõi đơn hàng
              </Link> */}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Orders;
