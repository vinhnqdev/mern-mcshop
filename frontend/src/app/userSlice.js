import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  update,
  register,
  userDetail,
  addUserAddress,
  getUserAddresses,
  getUserList,
  deleteUserById,
} from "./userThunk.js";

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
    userDetail: {},
    userAddress: JSON.parse(localStorage.getItem("ad")) || {},
    userAddresses: [],
    userList: [],

    loading: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.current = {};
      state.userDetail = {};
      state.userAddresses = [];
    },
    updateAddress: (state, action) => {
      state.userAddress = action.payload;
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
    [addUserAddress.pending]: (state) => {
      state.loading = true;
    },
    [addUserAddress.rejected]: (state) => {
      state.loading = false;
    },
    [addUserAddress.fulfilled]: (state, action) => {
      state.loading = false;
      state.userAddress = action.payload;
    },
    [getUserAddresses.pending]: (state) => {
      state.loading = true;
    },
    [getUserAddresses.rejected]: (state) => {
      state.loading = false;
    },
    [getUserAddresses.fulfilled]: (state, action) => {
      state.loading = false;
      state.userAddresses = action.payload;
    },
    [getUserList.pending]: (state) => {
      state.loading = true;
    },
    [getUserList.rejected]: (state) => {
      state.loading = false;
    },
    [getUserList.fulfilled]: (state, action) => {
      state.loading = false;
      state.userList = action.payload;
    },
    [deleteUserById.pending]: (state) => {
      state.loading = true;
    },
    [deleteUserById.rejected]: (state) => {
      state.loading = false;
    },
    [deleteUserById.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
