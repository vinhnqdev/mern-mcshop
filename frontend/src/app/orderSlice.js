import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrderById, payOrder, getMyOrders } from "./orderThunk.js";
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},
    orderDetail: {},
    orders: null,
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
    [getMyOrders.pending]: (state) => {
      state.loading = true;
    },
    [getMyOrders.rejected]: (state) => {
      state.loading = false;
    },
    [getMyOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
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
