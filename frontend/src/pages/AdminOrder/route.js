import { lazy } from "react";

const route = {
  path: "/admin/order-list",
  exact: true,
  publicRoute: false,
  isAdmin: true,
  redirectPath: "/login",
  component: lazy(() => import("./")),
};

export default route;
