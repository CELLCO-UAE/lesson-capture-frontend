import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;
