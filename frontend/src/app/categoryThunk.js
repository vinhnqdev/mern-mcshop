import { createAsyncThunk } from "@reduxjs/toolkit";
import categoryApi from "../api/categoryApi";

export const getCategoryList = createAsyncThunk(
  "categories/getCategoryList",
  async (params, thunkAPI) => {
    try {
      const response = await categoryApi.getAll();
      return response.data;
    } catch (error) {
      throw new Error((error.response && error.response.data.message) || error.message);
    }
  }
);
