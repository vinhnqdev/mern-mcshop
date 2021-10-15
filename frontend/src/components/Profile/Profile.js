import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { update, userDetail } from "../../app/userThunk";
import UpdateForm from "../Form/UpdateForm";
import { toast } from "react-toastify";
function Profile({ className }) {
  const details = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();

  // Fetch User Detail
  useEffect(() => {
    dispatch(userDetail());
  }, [dispatch]);

  const handleUpdateForm = async ({ name, email, password }) => {
    try {
      await dispatch(update({ name, email, password }));

      toast.success("Update thành công");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initialFormValue = {
    name: details.name,
    email: details.email,
    password: "",
    confirmPassword: "",
  };

  return (
    <div className={className}>
      <Switch>
        <Route path="/profile/orders">
          <p>Profile/Order</p>
        </Route>
        {details && Object.keys(details).length > 0 && (
          <Route path="/profile/edit">
            <UpdateForm initialValues={initialFormValue} onSubmit={handleUpdateForm} />
          </Route>
        )}
        <Route path="/profile/logout"></Route>
      </Switch>
    </div>
  );
}

export default Profile;
