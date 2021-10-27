import { createSlice } from "@reduxjs/toolkit";

import { getProducts } from "./productThunk";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    getProductFailed: (state, action) => {
      state.error = action.payload;
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
      state.loading = false;
      state.products = action.payload;
    },
  },
});

// Action
export const productsActions = productSlice.actions;

// Slice
const productsReducer = productSlice.reducer;
export default productsReducer;
