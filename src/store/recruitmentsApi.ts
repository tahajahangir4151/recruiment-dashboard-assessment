import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Recruitment } from "@/types/types";

// Fetch users from DummyJSON and map them to the Recruitment shape
export const recruitmentsApi = createApi({
  reducerPath: "recruitmentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getRecruitments: builder.query<Recruitment[], void>({
      query: () => "users?limit=100",
      transformResponse: (response: { users: any[] }) =>
        response.users.map((u) => ({
          id: `U-${String(u.id).padStart(3, "0")}`,
          recruitmentName: `${u.firstName} ${u.lastName}`,
          candidates: typeof u.age === "number" ? u.age : 0,
          startDate: u.birthDate ? u.birthDate : new Date().toISOString().split("T")[0],
          status: "In Progress" as Recruitment["status"],
        })),
    }),
  }),
});

export const { useGetRecruitmentsQuery } = recruitmentsApi;