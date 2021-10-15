import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { update } from "../../app/userSlice";
import UpdateForm from "../Form/UpdateForm";
import { toast } from "react-toastify";
function Profile({ className }) {
  const { user } = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const handleUpdateForm = async ({ name, email, password }) => {
    try {
      await dispatch(update({ name, email, password }));

      toast.success("Update thành công");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initialFormValue = {
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
  };

  return (
    <div className={className}>
      <Switch>
        <Route path="/profile/orders">
          <p>Profile/Order</p>
        </Route>
        <Route path="/profile/edit">
          <UpdateForm initialValues={initialFormValue} onSubmit={handleUpdateForm} />
        </Route>
        <Route path="/profile/logout"></Route>
      </Switch>
    </div>
  );
}

export default Profile;
