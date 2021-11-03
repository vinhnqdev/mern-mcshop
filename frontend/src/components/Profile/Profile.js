import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { update, userDetail } from "../../app/userThunk";
import UpdateForm from "../Form/UpdateForm";
import AddEditAddress from "./AddEditAddress";
import AddressNotes from "./AddressNotes";
import OrderDetail from "./OrderDetail";
import Orders from "./Orders";
import MyReviews from "./Reviews";
const Profile = () => {
  const details = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();
  const routerMatch = useRouteMatch();

  // Fetch User Detail
  useEffect(() => {
    dispatch(userDetail());
  }, [dispatch]);

  const handleUpdateUserForm = async (updateInfo) => {
    console.log(details);
    if (updateInfo.name === details.name) {
      delete updateInfo.name;
    }
    if (updateInfo.email === details.email) {
      delete updateInfo.email;
    }
    try {
      const actionResult = await dispatch(update(updateInfo));
      const result = await unwrapResult(actionResult);
      console.log(result);
      toast.success("Update thành công");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initialUserValue = {
    name: details.name,
    email: details.email,
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="md:col-span-3 md:px-6 lg:col-span-4">
      <Switch>
        <Route path={`${routerMatch.path}/orders`}>
          <Orders />
        </Route>
        {details && Object.keys(details).length > 0 && (
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
    </div>
  );
};

export default Profile;
