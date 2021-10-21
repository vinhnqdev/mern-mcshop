import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrderById, payOrder } from "./orderThunk.js";
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    orderDetail: {},
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.loading = true;
    },
    [createOrder.rejected]: (state) => {
      state.loading = false;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    [getOrderById.pending]: (state) => {
      state.loading = true;
    },
    [getOrderById.rejected]: (state) => {
      state.loading = false;
    },
    [getOrderById.fulfilled]: (state, action) => {
      state.loading = false;
      state.orderDetail = action.payload;
    },
    [payOrder.pending]: (state) => {
      state.loading = true;
    },
    [payOrder.rejected]: (state) => {
      state.loading = false;
    },
    [payOrder.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

const orderReducer = orderSlice.reducer;

export default orderReducer;
