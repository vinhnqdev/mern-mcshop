import { lazy } from "react";

const route = {
  path: "/products/:id",
  exact: true,
  publicRoute: true,
  component: lazy(() => import("./")),
};

export default route;
