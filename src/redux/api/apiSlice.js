import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({}),
  tagTypes: [],
  refetchOnReconnect: true,
});

export default apiSlice;
