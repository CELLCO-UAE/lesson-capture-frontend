import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  categoryData: [],
  selectedCategoryData: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState: INITIAL_STATE,
  reducers: {
    setCategoryData: (state, action) => {
      state.categoryData = action.payload;
    },
    setSelectedCategoryData: (state, action) => {
      state.selectedCategoryData = action.payload;
    },
  },
});

export const { setCategoryData, setSelectedCategoryData } =
  categorySlice.actions;
export default categorySlice.reducer;
