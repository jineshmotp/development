import {
  builderListingAdding,
  getBuilderBusinessAlbumDetails,
  getBuilderBusinessImagesDetails,
  getBuilderBusinessVideoDetails,
  getBuilderLeads,
  getBuilderLeadsList,
  getBuilderProperty,
  getBuilderViewDetails,
  getPropertyById,
  propertyAdding,
  propertyDescription,
  requestBusinessChat,
  updateBuilderPropertyById,
  updatePropertyById,
  uploadDocument,
  getBuilderPostDetails,
  createBuilderPost
  

} from '../../services/endpoints';
import { apiSlice } from '../apiSlice';

export const builderService = apiSlice.injectEndpoints({
  endpoints: build => ({
    builderListadding: build.mutation({
      query: payload => ({
        ...builderListingAdding,
        data: payload,
      }),
    }),

    uploadListDocument: build.mutation({
      query: payload => ({
        ...uploadDocument,
        data: payload,
      }),
    }),

    getPropertyByPropertyId: build.query({
      query: payload => ({
        ...getPropertyById,
        url: getPropertyById.url + new URLSearchParams(payload).toString(),
      }),
    }),

    updatePropertyApi: build.mutation({
      query: payload => ({
        ...updatePropertyById,
        data: payload,
      }),
    }),

    getBuilderProperty: build.query({
      query: payload => ({
        ...getBuilderProperty,
        url: getBuilderProperty.url + payload,
      }),
    }),

    updateBuilderPropertyApi: build.mutation({
      query: payload => ({
        ...updateBuilderPropertyById,
        data: payload,
      }),
    }),

    getBuilderLeads: build.query({
      query: () => ({
        ...getBuilderLeads,
        url: getBuilderLeads.url,
      }),
    }),
    getBuilderLeadsList: build.query({
      query: queryString => ({
        ...getBuilderLeadsList,
        url: getBuilderLeadsList.url + `?${queryString}`,
      }),
    }),
    getBuilderViewDetails: build.query({
      query: queryString => ({
        ...getBuilderViewDetails,
        url: getBuilderViewDetails.url + `?${queryString}`,
      }),
    }),

    requestForBusinessChat: build.mutation({
      query: payload => ({
        ...requestBusinessChat,
        data: payload,
      }),
    }),

    getBuilderBusinessImageDetails: build.query({
      query: payload => ({
        ...getBuilderBusinessImagesDetails,
        url: getBuilderBusinessImagesDetails.url + payload,
      }),
    }),
    getBuilderBusinessVideoDetails: build.query({
      query: payload => ({
        ...getBuilderBusinessVideoDetails,
        url: getBuilderBusinessVideoDetails.url + payload,
      }),
    }),
    getBuilderBusinessAlbumDetails: build.query({
      query: payload => ({
        ...getBuilderBusinessAlbumDetails,
        url: getBuilderBusinessAlbumDetails.url+ payload
      })
    }),
    getBuilderPostDetails : build.query({
      query : queryString =>({
        ...getBuilderPostDetails,
        url:getBuilderPostDetails.url + `?${queryString}`,
      })
    }),
  }),
});

export const {
  // usePropertyDescriptionMutation,
  // usePropertyListaddingMutation,
  // useUploadListDocumentMutation,
  // useGetPropertyByPropertyIdQuery,
  // useLazyGetPropertyByPropertyIdQuery,
  // useUpdatePropertyApiMutation,
  useGetBuilderBusinessAlbumDetailsQuery,
  useGetBuilderBusinessImageDetailsQuery,
  useGetBuilderBusinessVideoDetailsQuery,
  useBuilderListaddingMutation,
  useGetBuilderPropertyQuery,
  useLazyGetBuilderPropertyQuery,
  useUpdateBuilderPropertyApiMutation,
  useGetBuilderLeadsQuery,
  useLazyGetBuilderLeadsQuery,
  useGetBuilderLeadsListQuery,
  useLazyGetBuilderLeadsListQuery,

  useLazyGetBuilderViewDetailsQuery,
  useRequestForBusinessChatMutation,


  useLazyGetBuilderPostDetailsQuery,

} = builderService;
