import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Priority, Status, Task, User } from '../@types/types';

export type TasksResponse = {
  '@odata.context': string;
  value: Task[];
};

export const applicationsApi = createApi({
  reducerPath: 'applicationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://intravision-task.test01.intravision.ru',
    prepareHeaders: async (headers) => {
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string>({
      query: (tenantguid) => ({
        url: `/odata/tasks`,
        params: {
          tenantguid: tenantguid,
        },
      }),
      transformResponse: (response: TasksResponse) => response.value,
    }),
    getStatuses: builder.query<Status[], string>({
      query: (tenantguid) => ({
        url: `/api/${tenantguid}/Statuses`,
      }),
      transformResponse: (response: Status[]) => response,
    }),
    getPriorities: builder.query<Priority[], string>({
      query: (tenantguid) => ({
        url: `/api/${tenantguid}/Priorities`,
      }),
      transformResponse: (response: Priority[]) => response,
    }),
    getUsers: builder.query<User[], string>({
      query: (tenantguid) => ({
        url: `/api/${tenantguid}/Users`,
      }),
      transformResponse: (response: User[]) => response,
    }),
    getOneTask: builder.query<Task, { tenantguid: string; id: number }>({
      query: ({ tenantguid, id }) => ({
        url: `/api/${tenantguid}/Tasks/${id}`,
      }),
      transformResponse: (response: Task) => response,
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetStatusesQuery,
  useGetPrioritiesQuery,
  useGetUsersQuery,
  useGetOneTaskQuery,
} = applicationsApi;
