import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../api/productApi";
import { productsActions } from "./productsSlice";

export const getProductDetail = createAsyncThunk(
  "productDetail/get-product-detail",
  async (params, thunkAPI) => {
    try {
      const response = await productApi.getById(params);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(productsActions.getProductFailed());
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    product: null,
    loading: true,
    error: "",
  },
  reducers: {
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [getProductDetail.pending]: (state) => {
      state.loading = true;
    },

    [getProductDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
  },
});

export const productDetailAction = productDetailSlice.actions;

const productDetailReducer = productDetailSlice.reducer;
export default productDetailReducer;
