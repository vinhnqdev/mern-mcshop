import { createSlice } from "@reduxjs/toolkit";
import { login, update, register, userDetail } from "./userThunk.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
    userDetail: {},
    loading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.current = {};
    },
  },
  extraReducers: {
    [userDetail.pending]: (state) => {
      state.loading = true;
    },
    [userDetail.rejected]: (state) => {
      state.loading = false;
    },
    [userDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
    },
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.rejected]: (state) => {
      state.loading = false;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [update.pending]: (state) => {
      state.loading = true;
    },
    [update.rejected]: (state) => {
      state.loading = false;
    },
    [update.fulfilled]: (state, action) => {
      state.loading = false;
      state.current.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
