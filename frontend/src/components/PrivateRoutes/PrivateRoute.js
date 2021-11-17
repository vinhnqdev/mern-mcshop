import React from "react";
import { Redirect, Route } from "react-router";
import { useSelector } from "react-redux";

function PrivateRoute({ redirectPath, ...props }) {
  const token = useSelector((state) => state.user.token);

  return <Route {...props}>{token ? props.children : <Redirect to={redirectPath || "/"} />}</Route>;
}

export default PrivateRoute;
