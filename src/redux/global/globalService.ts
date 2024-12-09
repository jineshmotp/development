import { apiSlice } from '../../redux/apiSlice';
import {
  getAllSuggestions,
  getFavoriteProperty,
  getSuggestionByValue,
  globalSearch,
  jointwaitlistAdding,
} from '../../services/endpoints';

export const globalService = apiSlice.injectEndpoints({
  endpoints: build => ({
    elasticSearch: build.query({
      query: queryString => ({
        ...globalSearch,
        url: globalSearch.url + `?${queryString}`,
      }),
    }),

    suggesionListing: build.query({
      query: payload => ({
        ...getAllSuggestions,
        url: getAllSuggestions.url + `${payload}`,
      }),
    }),

    suggesionByText: build.query({
      query: payload => ({
        ...getSuggestionByValue,
        url: getSuggestionByValue.url + `${payload}`,
      }),
    }),

    getMostFavorite: build.query({
      query: payload => ({
        ...getFavoriteProperty,
        url: getFavoriteProperty.url + `user=${payload}`,
      }),
    }),

    jointwaitlistadding: build.mutation({
      query: payload => ({
        ...jointwaitlistAdding,
        data: payload,
      }),
    }),
  }),
});

export const {
  useLazyElasticSearchQuery,

  useSuggesionListingQuery,
  useSuggesionByTextQuery,
  useLazySuggesionByTextQuery,
  useGetMostFavoriteQuery,
  useLazyGetMostFavoriteQuery,
  useJointwaitlistaddingMutation,
} = globalService;
