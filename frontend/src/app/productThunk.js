import { createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../api/productApi";

export const getProducts = createAsyncThunk("products/getProducts", async (params, thunkAPI) => {
  try {
    const response = await productApi.get();
    return response.data.reverse();
  } catch (error) {
    throw new Error((error.response && error.response.data.message) || error.message);
  }
});

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (params, thunkAPI) => {
    try {
      const response = await productApi.deleteProduct(params);
      return response.data;
    } catch (error) {
      throw new Error((error.response && error.response.data.message) || error.message);
    }
  }
);

export const addProduct = createAsyncThunk("products/addProduct", async (params, thunkAPI) => {
  try {
    const response = await productApi.addProduct(params);
    return response.data;
  } catch (error) {
    throw new Error((error.response && error.response.data.message) || error.message);
  }
});

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ product, id }, thunkAPI) => {
    console.log(product, id);

    try {
      const response = await productApi.updateProduct(product, id);
      return response.data;
    } catch (error) {
      throw new Error((error.response && error.response.data.message) || error.message);
    }
  }
);
