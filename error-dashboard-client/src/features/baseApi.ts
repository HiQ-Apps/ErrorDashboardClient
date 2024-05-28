import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "configs/environment";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/` }),
  endpoints: () => ({}),
  tagTypes: ["User"],
});

export default baseApi;
