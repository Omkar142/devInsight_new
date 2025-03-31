// client/src/redux/services/contentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getContent: builder.query({
      query: ({ page = 1, limit = 20 }) => ({
        url: '/content',
        params: { page, limit },
      }),
    }),
    
    filterContent: builder.query({
      query: ({ page = 1, limit = 20, source, category, tag }) => ({
        url: '/content/filter',
        params: { page, limit, source, category, tag },
      }),
    }),
    
    searchContent: builder.query({
      query: ({ page = 1, limit = 20, q }) => ({
        url: '/content/search',
        params: { page, limit, q },
      }),
    }),
    
    getCategories: builder.query({
      query: () => '/categories',
    }),
    
    getTags: builder.query({
      query: () => '/tags',
    }),
  }),
});

export const {
  useGetContentQuery,
  useFilterContentQuery,
  useSearchContentQuery,
  useGetCategoriesQuery,
  useGetTagsQuery,
} = contentApi;