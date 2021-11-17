import { lazy } from "react";

const route = {
  path: "/admin/user-list",
  exact: true,
  publicRoute: false,
  isAdmin: true,
  redirectPath: "/login",
  component: lazy(() => import("./")),
};

export default route;
