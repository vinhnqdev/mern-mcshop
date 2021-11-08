import React from "react";
import { Redirect, Route } from "react-router";

function PrivateRoute({ redirectPath, ...props }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return <Route {...props}>{user ? props.children : <Redirect to={redirectPath} />}</Route>;
}

export default PrivateRoute;
