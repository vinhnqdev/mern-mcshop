import { lazy } from "react";

const route = {
  path: "*",
  exact: true,
  publicRoute: false,
  component: lazy(() => import(".")),
};

export default route;
