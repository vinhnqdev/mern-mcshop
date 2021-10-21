import { createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

export const createOrder = createAsyncThunk("order/createOrder", async (params, thunkAPI) => {
  try {
    const response = await orderApi.add(params);
    return response.data;
  } catch (error) {
    throw new Error(error.response && error.response.data.message);
  }
});

export const getOrderById = createAsyncThunk("order/getOrderById", async (params, thunkAPI) => {
  try {
    const response = await orderApi.getOrderById(params);
    return response.data;
  } catch (error) {
    throw new Error((error.response && error.response.data.message) || error.message);
  }
});

export const payOrder = createAsyncThunk(
  "order/payOrder",
  async ({ orderId, paymentResult }, thunkAPI) => {
    try {
      const response = await orderApi.updatePaidStatus(orderId, paymentResult);
      return response.data;
    } catch (error) {
      throw new Error((error.response && error.response.data.message) || error.message);
    }
  }
);
