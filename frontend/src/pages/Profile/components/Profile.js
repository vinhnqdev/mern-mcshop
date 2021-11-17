import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { update, userDetail } from "app/userThunk";
import UpdateForm from "./UpdateForm";
import AddEditAddress from "./AddEditAddress";
import AddressNotes from "./AddressNotes";
import OrderDetail from "./OrderDetail";
import Orders from "./Orders";
import MyReviews from "./Reviews";
const Profile = () => {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const routerMatch = useRouteMatch();

  // Fetch User Detail
  useEffect(() => {
    if (token && !user) {
      dispatch(userDetail());
    }
  }, [dispatch, token, user]);

  const handleUpdateUserForm = async (updateInfo) => {
    if (updateInfo.name === user.name) {
      delete updateInfo.name;
    }
    if (updateInfo.email === user.email) {
      delete updateInfo.email;
    }
    try {
      const actionResult = await dispatch(update(updateInfo));
      await unwrapResult(actionResult);
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

  const initialUserValue = {
    name: user?.name,
    email: user?.email,
    password: "",
    confirmPassword: "",
  };

  return (
    <Switch>
      <Route path={`${routerMatch.path}/orders`}>
        <Orders />
      </Route>
      {user && (
        <Route path={`${routerMatch.path}/edit`}>
          <UpdateForm initialValues={initialUserValue} onSubmit={handleUpdateUserForm} />
        </Route>
      )}
      <Route path={`${routerMatch.path}/logout`}></Route>

      <Route path={`${routerMatch.path}/reviews`}>
        <MyReviews />
      </Route>
      <Route path={`${routerMatch.path}/view/:id`}>
        <OrderDetail />
      </Route>
      <Route path={`${routerMatch.path}/address`} exact>
        <AddressNotes />
      </Route>
      <Route path={`${routerMatch.path}/address/:id`}>
        <AddEditAddress />
      </Route>
    </Switch>
  );
};

export default Profile;
