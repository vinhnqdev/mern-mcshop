import { lazy } from "react";

const route = {
  path: "/register",
  exact: true,
  publicRoute: true,
  component: lazy(() => import(".")),
};

export default route;
