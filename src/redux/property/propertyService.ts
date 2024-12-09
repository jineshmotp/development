import {
  favouriteLeads,
  getAllContacted,
  getAllFavourites,
  getAllResponseByPropId,
  getAllResponses,
  getContactDetails,
  contactDetailsRequest,
  getPropertyDetails,
  highlightFetchingAPI,
  getAllBusinessResponse
} from '../../services/endpoints';
import { apiSlice } from '../apiSlice';

export const propertyService = apiSlice.injectEndpoints({
  endpoints: build => ({
    getPropertyDetails: build.query({
      query: payload => ({
        ...getPropertyDetails,
        url: getPropertyDetails.url + new URLSearchParams(payload).toString(),
      }),
    }),
    getAllResponses: build.query({
      query: payload => ({
        ...getAllResponses,
        url: getAllResponses.url + new URLSearchParams(payload).toString(),
      }),
    }),
    getAllBusinessResponse:build.query({
      query: payload => ({
        ...getAllBusinessResponse,
        url:getAllBusinessResponse.url+ new URLSearchParams(payload).toString(),
      })
    }),
    getAllContacted: build.query({
      query: payload => ({
        ...getAllContacted,
        url: getAllContacted.url + new URLSearchParams(payload).toString(),
      }),
    }),
    getAllFavourites: build.query({
      query: payload => ({
        ...getAllFavourites,
        url: getAllFavourites.url + new URLSearchParams(payload).toString(),
      }),
    }),
    getAllResponseByPropId: build.query({
      query: payload => ({
        ...getAllResponseByPropId,
        url: getAllResponseByPropId.url + new URLSearchParams(payload).toString(),
      }),
    }),
    getContactDetails: build.query({
      query: payload => ({
        ...getContactDetails,
        url: getContactDetails.url + payload,
      }),
    }),
    contactDetailsRequest: build.mutation({
      query: payload => ({
        ...contactDetailsRequest,
        data: payload,
      }),
    }),
    favouriteLeads: build.mutation({
      query: payload => ({
        ...favouriteLeads,
        url: favouriteLeads?.url + new URLSearchParams(payload).toString(),
      }),
    }),

    getAllHighlights: build.query({
      query: payload => ({
        ...highlightFetchingAPI,
        url: `${highlightFetchingAPI.url}${payload}`,
      }),
    }),
  }),
});

export const {
  useGetPropertyDetailsQuery,
  useLazyGetAllResponsesQuery,
  useLazyGetAllBusinessResponseQuery,
  useLazyGetAllContactedQuery,
  useLazyGetAllFavouritesQuery,
  useLazyGetAllResponseByPropIdQuery,
  useFavouriteLeadsMutation,
  useLazyGetContactDetailsQuery,
  useLazyGetAllHighlightsQuery,
  useGetAllHighlightsQuery,
  useContactDetailsRequestMutation
} = propertyService;
