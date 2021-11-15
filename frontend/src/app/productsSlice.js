import { createSlice } from "@reduxjs/toolkit";

import { getProducts } from "./productThunk";

const initialFilter = {
  page: 1,
  limit: 6,
};

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    total: 0,
    filter: initialFilter,
    loading: false,
  },
  reducers: {
    getProductFailed: (state, action) => {
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilter: (state) => {
      state.filter = initialFilter;
    },
    setCategoryFilter: (state, action) => {
      state.filter = { ...initialFilter, ...action.payload };
    },
    setBrandFilter: (state, action) => {
      state.filter = { ...initialFilter, ...action.payload };
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
    },
    [getProducts.fulfilled]: (state, action) => {
      const { pagination, products } = action.payload;
      state.loading = false;
      state.products = products;
      state.total = pagination.total;
    },
  },
});

// Action
export const productsActions = productSlice.actions;

// Slice
const productsReducer = productSlice.reducer;
export default productsReducer;
