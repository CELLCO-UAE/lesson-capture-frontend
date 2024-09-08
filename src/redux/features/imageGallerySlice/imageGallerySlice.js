import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  imageGalleryData: [],
  imageGalleryCount: null,
};

const imageGallerySlice = createSlice({
  name: "image gallery",
  initialState: INITIAL_STATE,
  reducers: {
    setImageGalleryData: (state, action) => {
      state.imageGalleryData = action.payload;
    },
    setImageGalleryCount: (state, action) => {
      state.imageGalleryCount = action.payload;
    },
  },
});

export const { setImageGalleryData, setImageGalleryCount } =
  imageGallerySlice.actions;
export default imageGallerySlice.reducer;
