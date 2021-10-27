import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Space, Tag, Table, Modal, message } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteUserById, getUserList } from "../app/userThunk";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";

function UserAdminPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [visibleModal, setVisibleModal] = useState(false);
  const userList = useSelector((state) => state.user.userList);
  const loading = useSelector((state) => state.user.loading);
  const [userId, setUserId] = useState(null);
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chức vụ",
      key: "isAdmin",
      dataIndex: "isAdmin",
      render: (isAdmin) => (
        <Tag color={isAdmin ? "green" : "geekblue"}>{isAdmin ? "ADMIN" : "USER"}</Tag>
      ),
    },
    {
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => history.push(`/admin/users/${record._id}/edit`)}>
            Sửa
          </Button>
          <Button type="ghost" danger onClick={() => showModal(record._id)}>
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = (_id) => {
    setUserId(_id);
    setVisibleModal(true);
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleDeleteUser = async () => {
    // Call API delete User
    try {
      const actionResult = await dispatch(deleteUserById(userId));
      await unwrapResult(actionResult);
      message.success({
        content: "Xoá thành công",
        icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
        className: "custom-message custom-message-success",
      });
      setVisibleModal(false);
      dispatch(getUserList());
    } catch (error) {
      message.success({
        content: error.message,
        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
    }
  };

  const data = userList.map(({ _id, name, email, isAdmin }, index) => ({
    key: `${index + 1}`,
    _id,
    name,
    email,
    isAdmin,
  }));

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  return (
    <div className="font-mont">
      <div>
        <h3 className="text-xl uppercase font-semibold">Users</h3>
      </div>
      <Table columns={columns} dataSource={data} />
      <Modal
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        title="Xoá user này?"
        visible={visibleModal}
        onCancel={handleCancel}
        confirmLoading={loading}
        onOk={handleDeleteUser}
        zIndex={20}
      >
        <p className="font-mont">
          User sẽ không thể khôi phục sau khi xoá, bạn có chắc chắn muốn xoá không?
        </p>
      </Modal>
    </div>
  );
}

export default UserAdminPage;
