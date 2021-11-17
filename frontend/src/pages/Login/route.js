import { lazy } from "react";

const route = {
  path: "/login",
  exact: true,
  publicRoute: true,
  component: lazy(() => import("./")),
};

export default route;
