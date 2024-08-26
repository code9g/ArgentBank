import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, LOGIN_ENDPOINT, PROFILE_ENDPOINT } from "../../utils/consts";

const customTransformResponse = (endpoint) => (response) => {
  switch (response.status) {
    case 400:
      return {
        status: response.status,
        message:
          endpoint === LOGIN_ENDPOINT
            ? "Invalid username or password"
            : response.data.message,
      };
    case "FETCH_ERROR":
      return { status: response.status, message: "Failed to reach server" };
    default:
      console.error(response);
      return {
        status: response.status,
        message:
          response.data?.message ||
          response.message ||
          response.error ||
          "Unexpected error (see console for more details)",
      };
  }
};

export const bankApi = createApi({
  reducerPath: "bankApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Profile"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: LOGIN_ENDPOINT,
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response) => response.body.token,
      transformErrorResponse: customTransformResponse(LOGIN_ENDPOINT, "POST"),
      providesTags: ["Auth"],
    }),
    logout: builder.mutation({
      queryFn: async () => {
        return { status: 200, message: "User successfully disconnected" };
      },
      invalidatesTags: ["Auth", "Profile"],
    }),
    getProfile: builder.mutation({
      query: (token = null) => ({
        url: PROFILE_ENDPOINT,
        method: "POST",
        prepareHeaders: (headers) => {
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return headers;
        },
      }),
      transformResponse: (response) => response.body,
      transformErrorResponse: customTransformResponse(PROFILE_ENDPOINT, "POST"),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: ({ firstName, lastName }) => ({
        url: PROFILE_ENDPOINT,
        method: "PUT",
        body: { firstName, lastName },
      }),
      transformResponse: (response) => response.body,
      transformErrorResponse: customTransformResponse(PROFILE_ENDPOINT, "PUT"),

      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetProfileMutation,
  useUpdateProfileMutation,
} = bankApi;

export default bankApi;
