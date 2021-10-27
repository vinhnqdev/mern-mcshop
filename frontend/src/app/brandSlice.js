import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getBrandList } from "./brandThunk";

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brandList: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getBrandList.pending]: (state) => {
      state.loading = true;
    },
    [getBrandList.fulfilled]: (state, action) => {
      state.loading = false;
      state.brandList = action.payload;
    },
    [getBrandList.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Actions

export const brandActions = brandSlice.actions;

// Selections
export const selectBrandList = (state) => state.brand.brandList;

export const selectBrandOptions = createSelector(selectBrandList, (brands) => {
  return brands.map((brand) => ({
    value: brand._id,
    label: brand.name,
  }));
});

// Reducer
const brandReducer = brandSlice.reducer;

export default brandReducer;
