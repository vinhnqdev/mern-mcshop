import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const login = createAsyncThunk("user/login", async (params, thunkAPI) => {
  try {
    const response = await userApi.login(params);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error(
      (error.response && error.response.data.message) || "Failed to login, try again."
    );
  }
});

export const register = createAsyncThunk("user/register", async (params, thunkAPI) => {
  try {
    const response = await userApi.register(params);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error(error.response && error.response.data.message);
  }
});

export const update = createAsyncThunk("user/update", async (params, thunkAPI) => {
  try {
    const response = await userApi.update(params);
    const currentlocalStorageUser = JSON.parse(localStorage.getItem("user"));
    const newlocalStorageUser = { ...currentlocalStorageUser, user: response.data };
    localStorage.setItem("user", JSON.stringify(newlocalStorageUser));
    return response.data;
  } catch (error) {
    throw new Error(error.response && error.response.data.message);
  }
});

export const userDetail = createAsyncThunk("user/userDetail", async (params, thunkAPI) => {
  try {
    console.log("FETCH!!!");
    const response = await userApi.getDetail();
    return response.data;
  } catch (error) {
    throw new Error(error.response && error.response.data.message);
  }
});
