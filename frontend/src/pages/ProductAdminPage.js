import { Button, message, Modal, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../app/productThunk";
import { formatCurrency } from "../helpers";
import { useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
function ProductAdminPage() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const history = useHistory();
  const [visibleModal, setVisibleModal] = useState(false);
  const [productId, setProductId] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const columns = [
    {
      title: "_Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => <span>{brand.name.toUpperCase()}</span>,
    },
    {
      title: "Loại",
      dataIndex: "category",
      key: "category",
      render: (category) => <span>{category.name.toUpperCase()}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{formatCurrency(price, "vi-VN", "VND")}</span>,
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => <span>{discount}%</span>,
    },
    {
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => history.push(`/admin/products/${record._id}`)}>
            Sửa
          </Button>
          <Button type="ghost" danger onClick={() => showModal(record._id)}>
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  const data = products.map((product) => ({
    ...product,
    key: product._id,
  }));

  const showModal = (_id) => {
    setProductId(_id);
    setVisibleModal(true);
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleDeleteProduct = async () => {
    // Call API here
    try {
      setLoading(true);
      const actionResult = await dispatch(deleteProduct(productId));
      await unwrapResult(actionResult);
      setLoading(false);
      setVisibleModal(false);
      message.success({
        content: "Xoá thành công",
        icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
        className: "custom-message custom-message-success",
      });
      dispatch(getProducts());
    } catch (error) {
      setLoading(false);
      message.error({
        content: error.message,
        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl uppercase font-semibold">Products</h3>
        <div>
          <Button
            onClick={() => history.push("/admin/products/add")}
            type="primary"
            style={{ display: "flex", alignItems: "center" }}
          >
            <PlusOutlined /> Thêm sản phẩm
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} />

      <Modal
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        title="Xoá user này?"
        visible={visibleModal}
        onCancel={handleCancel}
        confirmLoading={loading}
        onOk={handleDeleteProduct}
      >
        <p className="font-mont">
          Sản phẩm sẽ không thể khôi phục sau khi xoá, bạn có chắc chắn muốn xoá không?
        </p>
      </Modal>
    </div>
  );
}

export default ProductAdminPage;
