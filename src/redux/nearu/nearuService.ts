import { globalNearu } from '@/services/endpoints';

import { apiSlice } from '../../redux/apiSlice';

export const nearuService = apiSlice.injectEndpoints({
  endpoints: build => ({
    nearuGlobalData: build.query({
      query: queryString => ({
        ...globalNearu,
        url: globalNearu.url + `?${queryString}`,
      }),
    }),
  }),
});

export const { useLazyNearuGlobalDataQuery } = nearuService;
