import { lazy } from "react";

const route = {
  path: "/admin/users/:id/edit",
  exact: true,
  publicRoute: false,
  isAdmin: true,
  redirectPath: "/login",
  component: lazy(() => import("./")),
};

export default route;
