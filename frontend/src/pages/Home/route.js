import { lazy } from "react";

const route = {
  path: "/",
  exact: true,
  publicRoute: true,
  component: lazy(() => import("./")),
};

export default route;
