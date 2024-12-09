import { apiSlice } from '../../redux/apiSlice';
import {
  getFeaturedProperty,
  getGlobalProperty,
  getReview,
  getTrendingProperty,
  storyByCity,
  storyUpload,
  videoUpload,
  storyLike,
  storyShare
} from '../../services/endpoints';

export const homeService = apiSlice.injectEndpoints({
  endpoints: build => ({
    getGlobalPropertyData: build.query({
      query: payload => ({
        ...getGlobalProperty,
        url: getGlobalProperty.url + new URLSearchParams(payload).toString(),
      }),
    }),
    validateVideo: build.mutation({
      query: payload => ({
        ...videoUpload,
        data: payload,
      }),
    }),
    validateStory: build.mutation({
      query: payload => ({
        ...storyUpload,
        data: payload,
      }),
    }),
    UploadStory: build.mutation({
      query: payload => ({
        ...storyByCity,
        data: payload,
      }),
    }),
    getTrendingProperty: build.query({
      query: payload => ({
        ...getTrendingProperty,
        url: getTrendingProperty.url + new URLSearchParams(payload).toString(),
      }),
    }),
    getFeaturedProperty: build.query({
      query: payload => ({
        ...getFeaturedProperty,
        url: getFeaturedProperty.url + new URLSearchParams(payload).toString(),
      }),
    }),
    getReview: build.query({
      query: () => ({
        ...getReview,
      }),
    }),
    likeStory : build.mutation({
      query: payload => ({
        ...storyLike,
        data: payload,
      }),
    }),

    shareStory : build.mutation({
      query: payload => ({
        ...storyShare,
        data: payload,
      }),
    }),
    
  }),
});

export const {
  useGetGlobalPropertyDataQuery,
  useValidateVideoMutation,
  useValidateStoryMutation,
  useLazyGetGlobalPropertyDataQuery,
  useUploadStoryMutation,
  useGetTrendingPropertyQuery,
  useGetFeaturedPropertyQuery,
  useGetReviewQuery,
  useLikeStoryMutation,
  useShareStoryMutation,
} = homeService;
