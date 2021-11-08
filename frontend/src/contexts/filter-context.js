import { createContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { productsActions } from "../app/productsSlice";
import queryString from "query-string";
const getMin = (array, field) => {
  if (array.length === 0) return;
  return array.reduce((prev, curr) => {
    return prev[field] < curr[field] ? prev : curr;
  })[field];
};

const getMax = (array, field) => {
  if (array.length === 0) return;
  return array.reduce((prev, curr) => {
    return prev[field] > curr[field] ? prev : curr;
  })[field];
};

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const fixedMinPriceRange = useRef();
  const fixedMaxPriceRange = useRef();
  const { search } = useLocation();
  const queryObj = queryString.parse(search);

  const min_price_range = getMin(products, "price");
  const max_price_range = getMax(products, "price");

  const handleFilterProduct = (addedFilter) => {
    if (
      addedFilter.price_gte &&
      addedFilter.price_lte &&
      !fixedMinPriceRange.current &&
      !fixedMaxPriceRange.current
    ) {
      fixedMinPriceRange.current = min_price_range;
      fixedMaxPriceRange.current = max_price_range;
    }
    dispatch(productsActions.setFilter({ ...addedFilter, page: 1 }));
  };
  return (
    <FilterContext.Provider
      value={{
        onFilter: handleFilterProduct,
        filter: queryObj,
        fixedMinPriceRange: fixedMinPriceRange.current,
        fixedMaxPriceRange: fixedMaxPriceRange.current,
        minPriceRange: min_price_range,
        maxPriceRange: max_price_range,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterProvider };

export default FilterContext;
