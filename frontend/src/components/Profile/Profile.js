import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";
import { update, userDetail } from "../../app/userThunk";
import UpdateForm from "../Form/UpdateForm";
import OrderDetail from "./OrderDetail";
import Orders from "./Orders";
function Profile({ className }) {
  const details = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();
  const routerMatch = useRouteMatch();

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
        <Route path={`${routerMatch.path}/orders`}>
          <Orders />
        </Route>
        {details && Object.keys(details).length > 0 && (
          <Route path={`${routerMatch.path}/edit`}>
            <UpdateForm initialValues={initialFormValue} onSubmit={handleUpdateForm} />
          </Route>
        )}
        <Route path={`${routerMatch.path}/logout`}></Route>

        <Route path={`${routerMatch.path}/view/:id`}>
          <OrderDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;
