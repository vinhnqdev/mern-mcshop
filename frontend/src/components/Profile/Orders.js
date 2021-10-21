import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyOrders } from "../../app/orderThunk";
import { formatCurrency } from "../../helpers";
import Loading from "../UI/Loading";

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
    <ul className="space-y-3 mt-8 md:mt-0 lg:space-y-6">
      {/** Order Item */}
      {orders?.map((order) => (
        <li key={order._id} className="bg-white shadow-xl px-2 py-3 space-y-4 lg:px-5 lg:py-4">
          <p className="py-2 border-b text-sm lg:text-base lg:font-medium">
            {order.isDelivered ? "Đang xử lí" : "Đang vận chuyển"}
          </p>

          <div className="md:flex md:gap-x-3">
            <div className="flex items-center space-x-3 md:flex-1">
              <div className="w-20 h-20 lg:w-24 lg:h-24">
                <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <p className="font-medium text-sm lg:text-base">{order.name}</p>
                <div className="text-xs text-gray-600 lg:text-sm">
                  <span>{order.quantity} sản phẩm</span> |{" "}
                  <span>{formatCurrency(order.price, "vi-VN", "VND")}</span>
                </div>
              </div>
            </div>

            {/** Links */}
            <div className="mt-5 flex gap-3 md:w-1/2 md:flex-col md:justify-center">
              <Link
                className="text-sm inline-block w-1/2 md:block md:w-full border py-1 text-center text-yellow-500 rounded-md border-yellow-500 lg:text-base lg:py-2 "
                to={`/profile/view/${order.order_id}`}
              >
                Xem chi tiết
              </Link>

              <Link
                className="text-sm inline-block border w-1/2 md:block md:w-full py-1 text-center text-yellow-500 rounded-md border-yellow-500 lg:text-base lg:py-2"
                to={`/profile/track/${order.order_id}`}
              >
                Theo dõi đơn hàng
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Orders;
