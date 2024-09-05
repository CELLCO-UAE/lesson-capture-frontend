import apiSlice from "../../api/apiSlice";

const globalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserNames: builder.query({
      query: () => ({
        url: `/auth/user-names`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserNamesQuery, useLazyGetUserNamesQuery } =
  globalApiSlice;
