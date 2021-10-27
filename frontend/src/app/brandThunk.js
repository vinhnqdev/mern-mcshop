import { createAsyncThunk } from "@reduxjs/toolkit";
import brandApi from "../api/brandApi";

export const getBrandList = createAsyncThunk("brands/getBrandList", async (params, thunkAPI) => {
  try {
    const response = await brandApi.getAll();
    return response.data;
  } catch (error) {
    throw new Error((error.response && error.response.data.message) || error.message);
  }
});
