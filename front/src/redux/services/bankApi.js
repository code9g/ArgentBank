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
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: LOGIN_ENDPOINT,
        method: "POST",
        body: { email, password },
      }),
      transformResponse: (response) => response.body.token,
      transformErrorResponse: customTransformResponse(LOGIN_ENDPOINT, "POST"),
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
  useGetProfileMutation,
  useUpdateProfileMutation,
} = bankApi;

export default bankApi;
