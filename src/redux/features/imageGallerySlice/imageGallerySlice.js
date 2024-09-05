import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  imageGalleryData: [],
};

const imageGallerySlice = createSlice({
  name: "image gallery",
  initialState: INITIAL_STATE,
  reducers: {
    setImageGalleryData: (state, action) => {
      state.imageGalleryData = action.payload;
    },
  },
});

export const { setImageGalleryData } = imageGallerySlice.actions;
export default imageGallerySlice.reducer;
