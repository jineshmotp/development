import { apiSlice } from '../../redux/apiSlice';
import {
  
  getPropertyById,
 
  getsubscriptionOptions,
  propertyAdding,
  propertyDescription,
  

  updatePropertyById,
  uploadDocument,
  sharingProperty,
  getPropertyTagging,
  taggingChat,
  getInvestmentChat

} from '../../services/endpoints';

export const listingService = apiSlice.injectEndpoints({
  endpoints: build => ({
    propertyDescription: build.mutation({
      query: payload => ({
        ...propertyDescription,
        data: payload,
      }),
    }),
    propertyListadding: build.mutation({
      query: payload => ({
        ...propertyAdding,
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
    getAllSubscriptionOptions: build.query({
      query: payload => ({
        ...getsubscriptionOptions,
        url: getsubscriptionOptions.url + `?user_want=${payload}`,
      }),
    }),
    shareInvestmentProperty: build.mutation({
      query: payload => ({
        ...sharingProperty,
        data: payload,
      }),
    }),
    // getPropertyTagging: build.query({
    //   query: queryString => ({
    //     ...getPropertyTagging,
    //     url: getPropertyTagging.url + `?${queryString}`,
    //   }),
    // }),
    getTaggingPostDetails: build.query({
      query: queryString => ({
        ...getPropertyTagging,
        url: getPropertyTagging?.url + `?${queryString}`,
      }),
    }),
    taggingPropertyChat: build.mutation({
      query: payload => ({
        ...taggingChat,
        data: payload,
      }),
    }),
    getTaggedChatDetails: build.query({
      query: queryString => ({
        ...getInvestmentChat,
        url: getInvestmentChat?.url + `?${queryString}`,
      }),
    }),

  }),
});
export const {
  usePropertyDescriptionMutation,
  usePropertyListaddingMutation,
  useUploadListDocumentMutation,
  useGetPropertyByPropertyIdQuery,
  useLazyGetPropertyByPropertyIdQuery,
  useUpdatePropertyApiMutation,
  useGetAllSubscriptionOptionsQuery,
  useLazyGetAllSubscriptionOptionsQuery,
  useShareInvestmentPropertyMutation,
  // useLazyGetPropertyTaggingQuery,
  useLazyGetTaggingPostDetailsQuery,
  useTaggingPropertyChatMutation,
  useLazyGetTaggedChatDetailsQuery,
} = listingService;
