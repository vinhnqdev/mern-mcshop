import { lazy } from "react";

const route = {
  path: "/checkout/placeorder",
  exact: true,
  publicRoute: false,
  isAdmin: false,
  redirectPath: "/login",
  component: lazy(() => import("./")),
};

export default route;
