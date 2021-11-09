import { Button, message, Space, Table, Typography, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../app/productThunk";
import { formatCurrency } from "../helpers";
import { useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import Modal from "../components/UI/Modal";
function ProductAdminPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });
  const [totalProducts, setTotalProducts] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const [productId, setProductId] = useState();
  const [removeProdLoading, setRemoveProdLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const actionResult = await dispatch(getProducts(filter));
      const {
        pagination: { total },
        products,
      } = await unwrapResult(actionResult);
      setProducts(products);
      setTotalProducts(total);
    };

    fetchProducts();
  }, [dispatch, filter]);

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

  const handleDeleteProduct = async () => {
    // Call API here
    try {
      setRemoveProdLoading(true);
      const actionResult = await dispatch(deleteProduct(productId));
      await unwrapResult(actionResult);

      message.success({
        content: "Xoá thành công",
        icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
        className: "custom-message custom-message-success",
      });
      setVisibleModal(false);
      setRemoveProdLoading(false);
      setFilter({
        ...filter,
        page: 1,
      });
    } catch (error) {
      setRemoveProdLoading(false);
      setVisibleModal(false);

      message.error({
        content: error.message,
        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
    }
  };

  const handlePaginationChange = (page) => {
    setFilter({
      ...filter,
      page,
    });
  };

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <section>
      <div className="flex items-center justify-between">
        <Typography.Title level={3} style={{ textTransform: "uppercase" }}>
          Products
        </Typography.Title>
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
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultCurrent: 1,
          current: filter.page,
          pageSize: filter.limit,
          total: totalProducts,
          onChange: handlePaginationChange,
        }}
      />

      <Modal
        visible={visibleModal}
        unableBgOverlay={removeProdLoading}
        onClose={() => setVisibleModal(false)}
        notAllowedClose={removeProdLoading}
      >
        {!removeProdLoading ? (
          <>
            <p className="">Bạn muốn xoá sản phẩm này?</p>
            <div className="flex justify-end gap-4">
              <Button type="ghost" onClick={() => setVisibleModal(false)}>
                Không
              </Button>
              <Button type="primary" danger onClick={handleDeleteProduct}>
                Xoá
              </Button>
            </div>
          </>
        ) : (
          <Spin indicator={loadingIcon} style={{ display: "flex", justifyContent: "center" }} />
        )}
      </Modal>
    </section>
  );
}

export default ProductAdminPage;
