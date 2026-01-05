import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AddRecruitmentPayload, Recruitment } from "@/types/types";

export const recruitmentsApi = createApi({
  reducerPath: "recruitmentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getRecruitments: builder.query<Recruitment[], void>({
      query: () => "users?limit=100",
      transformResponse: (response: { users: any[] }) =>
        response.users.map((u) => ({
          id: `${u.id}`,
          recruitmentName: `${u.firstName} ${u.lastName}`,
          candidates: typeof u.age === "number" ? u.age : 0,
          startDate: u.birthDate
            ? u.birthDate
            : new Date().toISOString().split("T")[0],
          status: "In Progress" as Recruitment["status"],
        })),
    }),

    addRecruitment: builder.mutation<Recruitment, AddRecruitmentPayload>({
      query: (body) => ({
        url: "users/add",
        method: "POST",
        body,
      }),
    }),

    deleteRecruiment: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRecruitmentsQuery,
  useAddRecruitmentMutation,
  useDeleteRecruimentMutation,
} = recruitmentsApi;
