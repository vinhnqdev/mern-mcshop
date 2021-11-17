import { FilterProvider } from "contexts/filter-context";
import { lazy } from "react";
const ProductFilter = lazy(() => import("./"));

const Products = () => {
  return (
    <FilterProvider>
      <ProductFilter />
    </FilterProvider>
  );
};

const route = {
  path: "/products",
  exact: true,
  publicRoute: true,
  component: Products,
};

export default route;
