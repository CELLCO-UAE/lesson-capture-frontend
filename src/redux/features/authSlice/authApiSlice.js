import apiSlice from "../../api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postUserCredentials: builder.mutation({
      query: (body) => ({
        url: `/auth/signup`,
        method: "POST",
        body: {
          ...body,
        },
      }),
    }),
    postLoginCredentials: builder.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body: {
          ...body,
        },
      }),
    }),
    postLogoutCredentials: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "DELETE",
      }),
      invalidatesTags: ["auth"],
    }),
    getUserInfos: builder.query({
      query: () => ({
        url: `/auth/auth-user-profile`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePostUserCredentialsMutation,
  usePostLoginCredentialsMutation,
  usePostLogoutCredentialsMutation,
  useGetUserInfosQuery,
  useLazyGetUserInfosQuery,
} = authApiSlice;
