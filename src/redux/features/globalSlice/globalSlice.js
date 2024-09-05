import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userNamesData: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState: INITIAL_STATE,
  reducers: {
    setUserNamesData: (state, action) => {
      state.userNamesData = action.payload;
    },
  },
});

export const { setUserNamesData } = globalSlice.actions;
export default globalSlice.reducer;
