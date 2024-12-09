import {
  builderOnboarding,
  getAllLanguages,
  getAreas,
  getBuyerFor,
  getCities,
  getLookingFor,
  getLookingForData,
  getPreference,
  getTenantFor,
  userOnboarding,
  getSharingInvestment,
  getShareProperty
} from '../../services/endpoints';
import { apiSlice } from '../apiSlice';

export const onboardingService = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllLanguages: build.query({
      query: () => ({
        ...getAllLanguages,
      }),
    }),
    getLookingFor: build.query({
      query: () => ({
        ...getLookingFor,
      }),
    }),
    getTenantFor: build.query({
      query: () => ({
        ...getTenantFor,
      }),
    }),
    getBuyerFor: build.query({
      query: () => ({
        ...getBuyerFor,
      }),
    }),
    getPreference: build.query({
      query: () => ({
        ...getPreference,
      }),
    }),
    getCities: build.query({
      query: () => ({
        ...getCities,
      }),
    }),
    getAreas: build.query({
      query: payload => ({
        ...getAreas,
        url: getAreas.url + `?${new URLSearchParams(payload).toString()}`,
      }),
    }),
    getLookingForData: build.query({
      query: payload => ({
        ...getLookingForData,
        url: getLookingForData?.url + payload,
      }),
    }),
    builderOnboarding: build.mutation({
      query: payload => ({
        ...builderOnboarding,
        data: payload,
      }),
    }),
    userOnboarding: build.mutation({
      query: payload => ({
        ...userOnboarding,
        data: payload,
      }),
    }),
    getInvestmentList : build.query({
      query: payload => ({
        ...getSharingInvestment,
        url : getSharingInvestment?.url + `?${payload}`,
      }),
    }),
    getSharingPropertyList : build.query({
      query:payload => ({
        ...getShareProperty,
        url : getShareProperty?.url + `?${payload}`,
      }),
    })
  }),
});

export const {
  useGetAllLanguagesQuery,
  useGetLookingForQuery,
  useGetBuyerForQuery,
  useGetTenantForQuery,
  useGetPreferenceQuery,
  useGetCitiesQuery,
  useGetLookingForDataQuery,
  useLazyGetAreasQuery,
  useBuilderOnboardingMutation,
  useUserOnboardingMutation,
  useLazyGetInvestmentListQuery,
  useLazyGetSharingPropertyListQuery
} = onboardingService;
