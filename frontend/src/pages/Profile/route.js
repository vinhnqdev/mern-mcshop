import { lazy } from "react";

const route = {
  path: "/profile",
  exact: false,
  publicRoute: false,
  isAdmin: false,
  redirectPath: "/login",
  component: lazy(() => import("./")),
};

export default route;
