import apiSlice from "../../api/apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryData: builder.query({
      query: (data) => ({
        url: `/categories/`,
        method: "GET",
        params: {
          ...data,
        },
      }),
      providesTags: ["category"],
    }),
    postCategoryData: builder.mutation({
      query: (data) => ({
        url: `/categories/`,
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: ["category"],
    }),
    getCategoriesNames: builder.query({
      query: () => ({
        url: `/category-names/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCategoryDataQuery,
  useLazyGetCategoryDataQuery,
  usePostCategoryDataMutation,
  useGetCategoriesNamesQuery,
  useLazyGetCategoriesNamesQuery,
} = categoryApiSlice;
