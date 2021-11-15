import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import queryString from "query-string";
import productApi from "../api/productApi";
import { productsActions } from "../app/productsSlice";

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
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const priceRangeRef = useRef();
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [total, setTotal] = useState(0);
  const filter = useSelector((state) => state.products.filter);
  const [initialRender, setInitialRender] = useState(false);
  const timeoutSearchRef = useRef();
  const fixedMinPriceRange = useRef();
  const fixedMaxPriceRange = useRef();
  const { search } = useLocation();
  const queryObj = queryString.parse(search);

  const min_price_range = getMin(products, "price");
  const max_price_range = getMax(products, "price");

  useEffect(() => {
    setInitialRender(true);
    const fetchProducts = async () => {
      const {
        data: {
          pagination: { total },
          products,
        },
      } = await productApi.get({ ...filter, ...queryObj });
      setProducts(products);
      setTotal(total);
    };

    fetchProducts();
  }, [dispatch, filter]);

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

  const handleResetFixedPriceRange = () => {
    fixedMinPriceRange.current = undefined;
    fixedMaxPriceRange.current = undefined;
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setSearchSuggestions([]);
      clearTimeout(timeoutSearchRef.current);
      return;
    }
    if (timeoutSearchRef.current) {
      clearTimeout(timeoutSearchRef.current);
    }
    timeoutSearchRef.current = setTimeout(async () => {
      const {
        data: { products },
      } = await productApi.get({ page: 1, limit: 4, search: searchTerm });
      setSearchSuggestions(products);
    }, 500);
  };

  const handleSelect = async (selectedId) => {
    history.push("/products/" + selectedId);
  };

  return (
    <FilterContext.Provider
      value={{
        onFilter: handleFilterProduct,
        queryObj,
        products,
        total,
        searchSuggestions,
        onResetPriceRange: handleResetFixedPriceRange,
        onSearch: handleSearch,
        onSelect: handleSelect,
        priceRangeRef,
        firstRender: initialRender,
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
