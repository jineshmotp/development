import { apiSlice } from '../../redux/apiSlice';
import {
  acceptRequestChat,
  addCommentById,
  addLikeToPost,
  commentListById,
  convertToAgent,
  createPostApi,
  deleteAccount,
  deleteCommentById,
  deletePostApi,
  deletProperty,
  emailOtpVerify,
  getAllReplyCommentById,
  getAllUserFavouriteProperty,
  getChatContacts,
  getCityListBySearch,
  getEmailVailability,
  getLocalityByCity,
  getPostLikes,
  getRefreshToken,
  getReviewDetail,
  getUserAlbums,
  getUserDetail,
  getUserDetailById,
  getUserImages,
  getUserinfo,
  getUserPosts,
  getUserProperty,
  getUserVideos,
  googleCityAutoComplete,
  hideProperty,
  loginApi,
  propertyFavUnfav,
  reActiveProperty,
  rejectRequestChat,
  renewProperty,
  replyCommentById,
  reportPost,
  requestCallback,
  requestChat,
  requestPhoto,
  reSendOtp,
  sendOtpEmail,
  similarProperties,
  updateCommentById,
  updatePostApi,
  updateShareCount,
  updateUserData,
  uploadImage,
  uploadVideo,
  verifySignupOtp,
} from '../../services/endpoints';

export const loginService = apiSlice.injectEndpoints({
  endpoints: build => ({
    validateLogin: build.mutation({
      query: ({ mobile_no, isOtp }) => ({
        ...loginApi,
        data: {
          mobile_no,
          isOtp,
        },
      }),
    }),
    validateLoginOTP: build.mutation({
      query: ({ id, isOtp, otp, mobile_no }) => ({
        ...loginApi,
        data: {
          mobile_no,
          isOtp,
          id,
          otp,
        },
      }),
    }),
    getUserData: build.query({
      query: () => ({
        ...getUserDetail,
      }),
    }),
    getUserinfo: build.query({
      query: () => ({
        ...getUserinfo,
      }),
    }),
    getUserPosts: build.query({
      query: payload => ({
        ...getUserPosts,
        url: getUserPosts.url + new URLSearchParams(payload).toString(),
      }),
    }),
    getEmailAvail: build.query({
      query: payload => ({
        ...getEmailVailability,
        url: getEmailVailability.url + payload,
      }),
    }),
    getAllUserFavouriteProperty: build.query({
      query: payload => ({
        ...getAllUserFavouriteProperty,
        url: getAllUserFavouriteProperty.url + payload,
      }),
    }),
    getRefreshToken: build.query({
      query: () => ({
        ...getRefreshToken,
      }),
    }),
    getResendOtp: build.query({
      query: payload => ({
        ...reSendOtp,
        url: reSendOtp.url + payload?.mobile_no,
      }),
    }),
    verifySignupOtp: build.mutation({
      query: ({ id, otp, phone }) => ({
        ...verifySignupOtp,
        url: verifySignupOtp.url + `?id=${id}&otp=${otp}&mobile_no=${phone}`,
        data: {},
      }),
    }),
    sentOtpEmail: build.mutation({
      query: payload => ({
        ...sendOtpEmail,
        data: payload,
      }),
    }),
    emailOtpVerify: build.mutation({
      query: payload => ({
        ...emailOtpVerify,
        data: payload,
      }),
    }),
    uploadImageFiles: build.mutation({
      query: payload => ({
        ...uploadImage,
        data: payload,
      }),
    }),
    reportPost: build.mutation({
      query: payload => ({
        ...reportPost,
        data: payload,
      }),
    }),
    uploadVideoFiles: build.mutation({
      query: payload => ({
        ...uploadVideo,
        data: payload,
      }),
    }),
    createPostApi: build.mutation({
      query: payload => ({
        ...createPostApi,
        data: payload,
      }),
    }),
    hideProperty: build.mutation({
      query: payload => ({
        ...hideProperty,
        data: payload,
      }),
    }),
    reActiveProperty: build.mutation({
      query: payload => ({
        ...reActiveProperty,
        data: payload,
        // url: reActiveProperty.url + new URLSearchParams(payload).toString(),
      }),
    }),
    renewProperty: build.mutation({
      query: payload => ({
        ...renewProperty,
        data: payload,
        // url: renewProperty.url + new URLSearchParams(payload).toString(),
      }),
    }),
    requestPhotoProperty: build.query({
      query: ({ id }) => ({
        ...requestPhoto,
        url: requestPhoto.url + id,
      }),
    }),
    deletProperty: build.mutation({
      query: payload => ({
        ...deletProperty,
        data: payload,
      }),
    }),
    deletePostApi: build.mutation({
      query: payload => ({
        ...deletePostApi,
        data: payload,
      }),
    }),
    addLikeToPost: build.mutation({
      query: payload => ({
        ...addLikeToPost,
        data: payload,
      }),
    }),
    updateShareCount: build.mutation({
      query: payload => ({
        ...updateShareCount,
        data: payload,
      }),
    }),
    getPostLikes: build.query({
      query: payload => ({
        ...getPostLikes,
        data: payload,
      }),
    }),
    updatePostApi: build.mutation({
      query: payload => ({
        ...updatePostApi,
        data: payload,
      }),
    }),
    updateUserDetails: build.mutation({
      query: payload => ({
        ...updateUserData,
        data: payload,
      }),
    }),
    propertyFavUnfav: build.mutation({
      query: payload => ({
        ...propertyFavUnfav,
        data: payload,
      }),
    }),
    commentListById: build.query({
      query: payload => ({
        ...commentListById,
        url: commentListById.url + payload,
      }),
    }),
    getAllReplyCommentById: build.query({
      query: payload => ({
        ...getAllReplyCommentById,
        url: getAllReplyCommentById.url + payload,
      }),
    }),
    deleteCommentById: build.mutation({
      query: payload => ({
        ...deleteCommentById,
        url: deleteCommentById.url + payload,
      }),
    }),
    addCommentById: build.mutation({
      query: payload => ({
        ...addCommentById,
        data: payload,
      }),
    }),
    updateCommentById: build.mutation({
      query: payload => ({
        ...updateCommentById,
        data: payload,
      }),
    }),
    replyCommentById: build.mutation({
      query: payload => ({
        ...replyCommentById,
        data: payload,
      }),
    }),
    googleCityAutoComplete: build.query({
      query: payload => ({
        ...googleCityAutoComplete,
        url: googleCityAutoComplete.url + payload,
      }),
    }),
    getUserImages: build.query({
      query: payload => ({
        ...getUserImages,
        url: getUserImages.url + payload,
      }),
    }),
    getUserAlbums: build.query({
      query: payload => ({
        ...getUserAlbums,
        url: getUserAlbums.url + payload,
      }),
    }),
    getUserVideos: build.query({
      query: payload => ({
        ...getUserVideos,
        url: getUserVideos.url + payload,
      }),
    }),
    getUserDetailById: build.query({
      query: payload => ({
        ...getUserDetailById,
        url: getUserDetailById.url + payload,
      }),
    }),
    getUserProperty: build.query({
      query: payload => ({
        ...getUserProperty,
        url: getUserProperty.url + payload,
      }),
    }),
    requestForChat: build.mutation({
      query: payload => ({
        ...requestChat,
        data: payload,
      }),
    }),

    acceptChatReq: build.mutation({
      query: payload => ({
        ...acceptRequestChat,
        data: payload,
      }),
    }),
    rejectChatReq: build.mutation({
      query: payload => ({
        ...rejectRequestChat,
        data: payload,
      }),
    }),
    requestForCallback: build.mutation({
      query: payload => ({
        ...requestCallback,
        data: payload,
      }),
    }),
    convertToAgent: build.mutation({
      query: payload => ({
        ...convertToAgent,
        data: payload,
      }),
    }),
    deleteAccount: build.mutation({
      query: payload => ({
        ...deleteAccount,
        data: payload,
      }),
    }),
    cityListBySearch: build.query({
      query: payload => ({
        ...getCityListBySearch,
        url: getCityListBySearch.url + payload,
      }),
    }),
    localityByCity: build.query({
      query: payload => ({
        ...getLocalityByCity,
        url: getLocalityByCity.url + payload,
      }),
    }),
    chatList: build.query({
      query: payload => ({
        ...getChatContacts,
        url: getChatContacts.url + payload,
      }),
    }),
    getReviewDetail: build.query({
      query: () => ({
        ...getReviewDetail,
      }),
    }),
    similarProperties: build.query({
      query: queryString => ({
        ...similarProperties,
        url: similarProperties.url + `?${queryString}`,
      }),
    }),
  }),
});

export const {
  useValidateLoginMutation,
  useGetUserDataQuery,
  useGetUserinfoQuery,
  useLazyGetUserinfoQuery,
  useLazyGetUserDataQuery,
  useValidateLoginOTPMutation,
  useGetRefreshTokenQuery,
  useLazyGetRefreshTokenQuery,
  useVerifySignupOtpMutation,
  useLazyGetResendOtpQuery,
  useUploadImageFilesMutation,
  useUploadVideoFilesMutation,
  useUpdateUserDetailsMutation,
  useLazyGetEmailAvailQuery,
  useSentOtpEmailMutation,
  useEmailOtpVerifyMutation,
  useLazyGoogleCityAutoCompleteQuery,
  useGetUserImagesQuery,
  useGetUserAlbumsQuery,
  useGetUserVideosQuery,
  useCreatePostApiMutation,
  useUpdatePostApiMutation,
  useGetUserDetailByIdQuery,
  useLazyGetUserDetailByIdQuery,
  useLazyCommentListByIdQuery,
  useAddCommentByIdMutation,
  useReplyCommentByIdMutation,
  useUpdateCommentByIdMutation,
  useLazyGetAllReplyCommentByIdQuery,
  useDeleteCommentByIdMutation,
  useAddLikeToPostMutation,
  useUpdateShareCountMutation,
  useCommentListByIdQuery,
  useLazyGetPostLikesQuery,
  useLazyRequestPhotoPropertyQuery,
  useDeletPropertyMutation,
  useHidePropertyMutation,
  useGetUserPostsQuery,
  useLazyGetUserPostsQuery,
  useGetAllUserFavouritePropertyQuery,
  useLazyGetAllUserFavouritePropertyQuery,
  useGetUserPropertyQuery,
  useLazyGetUserPropertyQuery,
  usePropertyFavUnfavMutation,
  useDeletePostApiMutation,
  useReportPostMutation,
  useRenewPropertyMutation,
  useReActivePropertyMutation,
  useRequestForChatMutation,
  useAcceptChatReqMutation,
  useRejectChatReqMutation,
  useRequestForCallbackMutation,
  useConvertToAgentMutation,
  useLazyCityListBySearchQuery,
  useLazyLocalityByCityQuery,
  useLazyChatListQuery,
  useDeleteAccountMutation,
  useGetReviewDetailQuery,
  useLazySimilarPropertiesQuery,
} = loginService;
