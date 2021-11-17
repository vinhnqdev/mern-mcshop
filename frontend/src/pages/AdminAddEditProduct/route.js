import { lazy } from "react";

const route = {
  path: "/admin/products/:id",
  exact: true,
  publicRoute: false,
  isAdmin: true,
  redirectPath: "/login",
  component: lazy(() => import("./")),
};

export default route;
