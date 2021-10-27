import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { userDetail } from "../../app/userThunk";
import Loading from "../UI/Loading";

function AdminRoute({ redirectPath, ...props }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.userDetail);
  const currentStorage = useSelector((state) => state.user.current);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const actionResult = await dispatch(userDetail());
        await unwrapResult(actionResult);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (!currentStorage) {
    return (
      <Route>
        <Redirect to="/login" />
      </Route>
    );
  }
  return user.isAdmin ? (
    <Route {...props}>{props.children}</Route>
  ) : (
    <p>Bạn không được phép để vào trang này, xin vui lòng thử lại</p>
  );
}

export default AdminRoute;
