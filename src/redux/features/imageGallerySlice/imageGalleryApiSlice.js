import apiSlice from "../../api/apiSlice";

const imageGalleryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImageGalleryData: builder.query({
      query: (data) => ({
        url: `/lessons`,
        method: "GET",
        params: {
          ...data,
        },
      }),
      providesTags: ["image gallery"],
    }),
    postImageGalleryData: builder.mutation({
      query: (data) => ({
        url: `/lessons/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["image gallery"],
    }),
    deleteImageGalleryData: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["image gallery"],
    }),
  }),
});

export const {
  useGetImageGalleryDataQuery,
  useLazyGetImageGalleryDataQuery,
  usePostImageGalleryDataMutation,
  useDeleteImageGalleryDataMutation,
} = imageGalleryApiSlice;
