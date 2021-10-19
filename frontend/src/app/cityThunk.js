import { createAsyncThunk } from "@reduxjs/toolkit";
import cityApi from "../api/cityApi";
export const getProvices = createAsyncThunk("city/getProvices", async (params, thunkApi) => {
  try {
    const response = await cityApi.getProvices();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getDistricts = createAsyncThunk("city/getDistricts", async (params, thunkApi) => {
  try {
    const { code, query } = params;
    const response = await cityApi.getDistricts(code, query);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getWards = createAsyncThunk("city/getWards", async (params, thunkApi) => {
  try {
    const { code, query } = params;
    const response = await cityApi.getWards(code, query);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
