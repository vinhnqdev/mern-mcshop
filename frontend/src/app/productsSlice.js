import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../api/productApi";

export const getProducts = createAsyncThunk("products/getProducts", async (params, thunkAPI) => {
  try {
    const response = await productApi.get();
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(
      productsActions.getProductFailed(error.response && error.response.data.message)
    );
    throw new Error();
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: "",
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
    // [getProducts.rejected]: (state, action) => {
    //   console.log("Action", action.error.response);
    //   state.loading = false;
    //   state.error = action.error;
    // },
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
