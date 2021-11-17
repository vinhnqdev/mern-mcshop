import { lazy } from "react";

const route = {
  path: "/admin/orders/:id/",
  exact: true,
  publicRoute: false,
  isAdmin: true,
  redirectPath: "/login",
  component: lazy(() => import("./")),
};

export default route;
