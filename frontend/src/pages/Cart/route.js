import { lazy } from "react";

const route = {
  path: "/cart",
  exact: true,
  publicRoute: true,
  component: lazy(() => import("./")),
};

export default route;
