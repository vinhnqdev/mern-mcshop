import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getCategoryList } from "./categoryThunk";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getCategoryList.pending]: (state) => {
      state.loading = true;
    },
    [getCategoryList.fulfilled]: (state, action) => {
      state.loading = false;
      state.categoryList = action.payload;
    },
    [getCategoryList.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// Actions

export const categoryActions = categorySlice.actions;

// Selections
export const selectCategoryList = (state) => state.category.categoryList;

export const selectCategoryOptions = createSelector(selectCategoryList, (categories) => {
  return categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));
});

// Reducer
const categoryReducer = categorySlice.reducer;

export default categoryReducer;
