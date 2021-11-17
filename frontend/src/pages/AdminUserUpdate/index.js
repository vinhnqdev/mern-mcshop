import React, { useEffect, useState } from "react";
import AdminUpdateUserForm from "./components/AdminUpdateUserForm";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserById, updateUserById } from "app/userThunk";
import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";
function UserAdminUpdatePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const actionResult = await dispatch(getUserById(id));
        const user = await unwrapResult(actionResult);
        setUser(user);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUser();
  }, [dispatch, id]);

  const handleUpdateUser = async (updateUser) => {
    if (updateUser.email === user.email) {
      delete updateUser.email;
    }

    try {
      const actionResult = await dispatch(updateUserById({ id, updateUser }));
      await unwrapResult(actionResult);
      message.success({
        content: "Cập nhật thành công",
        icon: <CheckCircleIcon className="w-10 h-10 text-green-500" />,
        className: "custom-message custom-message-success",
      });
      history.push("/admin/user-list");
    } catch (error) {
      message.error({
        content: error.message,

        icon: <XCircleIcon className="w-10 h-10 text-red-600" />,
        className: "custom-message custom-message-error",
      });
    }
  };

  const initialValues = {
    name: user?.name,
    email: user?.email,
    isAdmin: user?.isAdmin,
  };

  return (
    <section>
      {user && <AdminUpdateUserForm onSubmit={handleUpdateUser} initialValues={initialValues} />}
    </section>
  );
}

export default UserAdminUpdatePage;
