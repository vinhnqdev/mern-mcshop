import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const login = createAsyncThunk("user/login", async (params, thunkAPI) => {
  try {
    const response = await userApi.login(params);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    thunkAPI.dispatch(userActions.loginFailed(error.response && error.response.data.message));
    throw new Error();
  }
});

export const register = createAsyncThunk("user/register", async (params, thunkAPI) => {
  try {
    const response = await userApi.register(params);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(userActions.registerFailed(error.response && error.response.data.message));
    throw new Error();
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
    loading: false,
    error: "",
  },
  reducers: {
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },

    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
