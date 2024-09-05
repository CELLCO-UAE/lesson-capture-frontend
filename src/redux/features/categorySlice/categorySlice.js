import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  categoryData: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState: INITIAL_STATE,
  reducers: {
    setCategoryData: (state, action) => {
      state.categoryData = action.payload;
    },
  },
});

export const { setCategoryData } = categorySlice.actions;
export default categorySlice.reducer;
