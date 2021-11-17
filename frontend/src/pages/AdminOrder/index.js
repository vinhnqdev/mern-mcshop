import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import orderApi from "api/orderApi";
import { formatReadableDate, formatCurrency } from "utils";
import { XIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";

function OrderAdminPage() {
  const [orderList, setOrderList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const { data } = await orderApi.getOrderList();
        setOrderList(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOrderList();
  }, []);

  const columns = [
    {
      title: "_Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => <span>{user.email}</span>,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => (
        <div className="text-center">
          <Tag color={paymentMethod === "cod" ? "green" : "geekblue"}>
            {paymentMethod === "cod" ? "COD" : "VISA"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span>
          {formatReadableDate(createdAt, { year: "numeric", month: "numeric", day: "numeric" })}
        </span>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => <span>{formatCurrency(totalPrice, "vi-VN", "VND")}</span>,
    },
    {
      title: "Paid",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid, order) => {
        return (
          <div>
            {isPaid && order.paidAt ? (
              <div>
                <span>Đã thanh toán</span>
                <div>
                  {formatReadableDate(order.paidAt, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </div>
              </div>
            ) : (
              <XIcon className="w-6 h-6 text-red-600" />
            )}
          </div>
        );
      },
    },
    {
      title: "Delivered",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered, order) => {
        return (
          <div>
            {isDelivered && order.deliveredAt ? (
              <div>
                <span>Đã giao hàng</span>
                <div>
                  {formatReadableDate(order.deliveredAt, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </div>
              </div>
            ) : (
              <XIcon className="w-6 h-6 text-red-600" />
            )}
          </div>
        );
      },
    },
    {
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => history.push(`/admin/orders/${record._id}`)}>
          Details
        </Button>
      ),
    },
  ];

  const data = orderList.map(
    (
      { _id, user, createdAt, totalPrice, isPaid, paidAt, isDelivered, paymentMethod, deliveredAt },
      index
    ) => ({
      key: `${index + 1}`,
      _id,
      user,
      paymentMethod,
      createdAt,
      totalPrice,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
    })
  );

  return (
    <div className="font-mont">
      <div>
        <h3 className="text-xl uppercase font-semibold">Orders</h3>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default OrderAdminPage;
