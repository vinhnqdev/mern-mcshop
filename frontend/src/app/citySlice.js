import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getDistricts, getProvices, getWards } from "./cityThunk";
const citySlice = createSlice({
  name: "city",
  initialState: {
    provices: [],
    districts: [],
    wards: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getProvices.pending]: (state) => {
      state.loading = true;
    },
    [getProvices.rejected]: (state) => {
      state.loading = false;
    },
    [getProvices.fulfilled]: (state, action) => {
      state.loading = true;
      state.provices = action.payload;
    },
    [getDistricts.pending]: (state) => {
      state.loading = true;
    },
    [getDistricts.rejected]: (state) => {
      state.loading = false;
    },
    [getDistricts.fulfilled]: (state, action) => {
      state.loading = true;
      state.districts = action.payload.districts;
    },
    [getWards.pending]: (state) => {
      state.loading = true;
    },
    [getWards.rejected]: (state) => {
      state.loading = false;
    },
    [getWards.fulfilled]: (state, action) => {
      state.loading = true;
      state.wards = action.payload.wards;
    },
  },
});

export const cityAction = citySlice.actions;

export const selectProvices = (state) => state.city.provices;
export const selectDistricts = (state) => state.city.districts;
export const selectWards = (state) => state.city.wards;

export const selectProviceOptions = createSelector(selectProvices, (provices) => {
  return provices.map((provice) => ({
    value: provice.code,
    label: provice.name,
  }));
});

export const selectDistrictOptions = createSelector(selectDistricts, (districts) => {
  return districts.map((district) => ({
    value: district.code,
    label: district.name,
  }));
});

export const selectWardsOptions = createSelector(selectWards, (wards) => {
  return wards.map((ward) => ({
    value: ward.code,
    label: ward.name,
  }));
});
const cityReducer = citySlice.reducer;
export default cityReducer;
