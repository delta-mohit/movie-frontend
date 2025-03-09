import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // ✅ Ensures cookies are sent with every request
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
