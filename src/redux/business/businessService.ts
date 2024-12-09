import {
  businessCategory,
  businessCin,
  businessDetails,
  businessListing,
  businessProfileCreation,
  businessUpdate,
  eventSpaceListingAdding,
  exclusiveServiceListingAdding,
  followBusiness,
  getBusinessProfile,
  getBusinessProfileUserApi,
  getBusinessRatings,
  getBusinessReviewDetails,
  getOneUserRating,
  sendRating,
  unFollowBusiness,
} from '../../services/endpoints';
import { apiSlice } from '../apiSlice';

export const businessService = apiSlice.injectEndpoints({
  endpoints: build => ({
    // getBusinessProfileList: build.mutation({
    //   query: id => ({
    //     method: getBusinessProfileUserApi.method,
    //     url: `getBusinessProfileUserApi.url+${id}`,
    //     data: {},
    //   }),
    // }),
    businessProfileCreation: build.mutation({
      query: payload => ({
        ...businessProfileCreation,
        data: payload,
      }),
    }),
    businessProfileUpdate: build.mutation({
      query: payload => ({
        ...businessUpdate,
        data: payload,
      }),
    }),
    getBusinessProfile: build.query({
      query: id => ({
        ...getBusinessProfile,
        url: `${getBusinessProfile.url}${id}`,
      }),
    }),
    getBusinessCin: build.query({
      query: cinNumber => ({
        ...businessCin,
        url: `${businessCin.url}${cinNumber}`,
      }),
    }),
    businessDetails: build.query({
      query: id => ({
        ...businessDetails,
        url: `${businessDetails.url}${id}`,
      }),
    }),

    getBusinessProfileList: build.query({
      query: id => ({
        ...getBusinessProfileUserApi,
        url: `${getBusinessProfileUserApi.url}${id}`,
      }),
    }),
    businessCategory: build.query({
      query: () => ({
        ...businessCategory,
      }),
    }),
    getBusinessRatings: build.query({
      query: payload => ({
        ...getBusinessRatings,
        url: getBusinessRatings.url + `?${payload}`,
      }),
    }),
    getBusinessReviewDetails: build.query({
      query: payload => ({
        ...getBusinessReviewDetails,
        url: getBusinessReviewDetails.url + `?${payload}`,
      }),
    }),
    getOneBusinessUserRating: build.query({
      query: payload => ({
        ...getOneUserRating,
        url: getOneUserRating.url + `?${payload}`,
      }),
    }),
    postBusinessReview: build.mutation({
      query: payload => ({
        ...sendRating,
        data: payload,
      }),
    }),
    onFllowBusiness: build.mutation({
      query: payload => ({
        ...followBusiness,
        data: payload,
      }),
    }),
    onUnFollowBusiness: build.query({
      query: payload => ({
        ...unFollowBusiness,
        url: unFollowBusiness.url + payload,
      }),
    }),

    eventSpaceListingAdding: build.mutation({
      query: payload => ({
        ...eventSpaceListingAdding,
        data: payload,
      }),
    }),

    exclusiveServiceListingAdding: build.mutation({
      query: payload => ({
        ...exclusiveServiceListingAdding,
        data: payload,
      }),
    }),
    businessListing: build.query({
      query: id => ({
        ...businessListing,
        url: `${businessListing.url}${id}`,
      }),
    }),
  }),
});

export const {
  useLazyGetBusinessRatingsQuery,
  useGetBusinessProfileListQuery,
  useLazyGetBusinessProfileListQuery,
  useBusinessCategoryQuery,
  useBusinessProfileCreationMutation,
  useBusinessProfileUpdateMutation,
  useLazyGetBusinessProfileQuery,
  useLazyBusinessDetailsQuery,
  useLazyGetBusinessCinQuery,
  useLazyGetBusinessReviewDetailsQuery,
  useLazyGetOneBusinessUserRatingQuery,
  usePostBusinessReviewMutation,
  useOnFllowBusinessMutation,
  useLazyOnUnFollowBusinessQuery,
  useEventSpaceListingAddingMutation,
  useExclusiveServiceListingAddingMutation,
  useLazyBusinessListingQuery,
} = businessService;
