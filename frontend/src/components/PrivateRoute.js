import React from "react";
import { Redirect, Route } from "react-router";

function PrivateRoute(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  return <Route {...props}>{user ? props.children : <Redirect to="/" />}</Route>;
}

export default PrivateRoute;
