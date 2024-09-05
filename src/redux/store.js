import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import authReducer from "./features/authSlice/authSlice";
import categoryReducer from "./features/categorySlice/categorySlice";
import imageGalleryReducer from "./features/imageGallerySlice/imageGallerySlice";

export const store = configureStore({
  reducer: {
    categoryReducer,
    authReducer,
    imageGalleryReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
