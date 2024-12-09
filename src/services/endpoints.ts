const endpoints = {
  loginApi: {
    method: 'POST',
    url: '/users/login',
  },
  signUpApi: {
    method: 'POST',
    url: '/users/signup',
  },
  getUserDetail: {
    method: 'GET',
    url: '/users/details',
  },
  getUserinfo: {
    method: 'GET',
    url: '/users/details',
  },
  getRefreshToken: {
    method: 'GET',
    url: '/users/refresh',
  },
  verifySignupOtp: {
    method: 'PATCH',
    url: '/users/verify-otp',
  },
  reSendOtp: {
    method: 'GET',
    url: '/users/send-otp?mobile_no=',
  },
  getBusinessProfileUserApi: {
    method: 'GET',
    url: '/business/owner-business-profile/',
  },
  uploadImage: {
    method: 'POST',
    url: '/upload/image',
  },
  uploadVideo: {
    method: 'POST',
    url: '/upload/video',
  },
  updateUserData: {
    method: 'PUT',
    url: '/users/update-user-details',
  },
  getGlobalProperty: {
    method: 'GET',
    url: '/global/home?',
  },
  getNotification: {
    method: 'POST',
    url: '/fcm-notification/send-notification',
  },
  logoutNotification: {
    method: 'POST',
    url: '/fcm-tokens/remove',
  },
  loginNotification: {
    method: 'POST',
    url: '/fcm-tokens/add',
  },
  getAllNotification: {
    method: 'GET',
    url: '/notification/all/',
  },
  getAllUnreadNotification: {
    method: 'GET',
    url: '/notification/unread/',
  },
  updateNotification: {
    method: 'PATCH',
    url: '/notification/update/',
  },
  getUserPosts: {
    method: 'GET',
    url: '/posts-and-stories/post/profile?',
  },
  videoUpload: {
    method: 'POST',
    url: '/upload/video',
  },
  createPostApi: {
    method: 'POST',
    url: '/posts-and-stories/post',
  },
  hideProperty: {
    method: 'POST',
    url: '/global/hide',
  },
  reActiveProperty: {
    method: 'POST',
    url: '/global/unhide',
  },
  renewProperty: {
    method: 'POST',
    url: '/global/renew',
  },
  reportPost: {
    method: 'POST',
    url: '/global/report',
  },
  requestPhoto: {
    method: 'GET',
    url: '/property/request-photo/',
  },
  deletProperty: {
    method: 'PATCH',
    url: '/property/delete',
  },
  commentListById: {
    method: 'GET',
    url: '/posts-and-stories/comment?',
  },
  addCommentById: {
    method: 'POST',
    url: '/posts-and-stories/comment',
  },
  replyCommentById: {
    method: 'POST',
    url: '/posts-and-stories/comment/reply',
  },
  addLikeToPost: {
    method: 'POST',
    url: '/posts-and-stories/like',
  },
  getPostLikes: {
    method: 'GET',
    url: '/posts-and-stories/like',
  },
  updateShareCount: {
    method: 'POST',
    url: '/posts-and-stories/share',
  },
  updateCommentById: {
    method: 'PUT',
    url: '/posts-and-stories/comment/',
  },
  deleteCommentById: {
    method: 'DELETE',
    url: '/posts-and-stories/comment/',
  },
  deletePostApi: {
    method: 'PATCH',
    url: '/posts-and-stories/post/delete',
  },
  updatePostApi: {
    method: 'PUT',
    url: '/posts-and-stories/post',
  },
  getAllReplyCommentById: {
    method: 'GET',
    url: '/posts-and-stories/comment/reply?',
  },
  storyUpload: {
    method: 'POST',
    url: '/posts-and-stories/story',
  },
  propertyFavUnfav: {
    method: 'POST',
    url: '/property/favourite',
  },
  sendOtpEmail: {
    method: 'PATCH',
    url: '/users/send-otp-email',
  },
  emailOtpVerify: {
    method: 'PATCH',
    url: '/users/verify-otp-email',
  },
  storyByCity: {
    method: 'POST',
    url: 'posts-and-stories/story-by-city',
  },
  getEmailVailability: {
    method: 'GET',
    url: '/users/find-by-email/',
  },
  googleCityAutoComplete: {
    method: 'GET',
    url: '/property/city?',
  },
  getUserImages: {
    method: 'GET',
    url: '/users/gallery/image/',
  },
  getUserAlbums: {
    method: 'GET',
    url: '/users/gallery/album/',
  },
  getUserVideos: {
    method: 'GET',
    url: '/users/gallery/video/',
  },
  getUserDetailById: {
    method: 'GET',
    url: '/users/getone/',
  },
  getAllUserFavouriteProperty: {
    method: 'GET',
    url: '/property/favouritePropertyByUserId/',
  },
  getUserProperty: {
    method: 'GET',
    url: '/property/propertyByUserId/',
  },
  propertyDescription: {
    method: 'POST',
    url: '/property/autogenerate-description',
  },
  propertyAdding: {
    method: 'POST',
    url: '/property/add',
  },
  getPaymentHistory: {
    method: 'GET',
    url: '/users/history/payments',
  },
  getSubscriptions: {
    method: 'GET',
    url: '/users/history/subscriptions',
  },
  getSubscriptionPlans: {
    method: 'GET',
    url: '/subscription/paid/plan',
  },
  getTaxInvoices: {
    method: 'GET',
    url: '/users/tax-invoices',
  },
  globalSearch: {
    method: 'GET',
    url: '/global/search',
  },
  globalNearu: {
    method: 'GET',
    url: '/global/nearu',
  },
  requestChat: {
    method: 'POST',
    url: '/contacts/sendRequest',
  },
  acceptRequestChat: {
    method: 'POST',
    url: '/contacts/acceptRequest',
  },
  rejectRequestChat: {
    method: 'POST',
    url: '/contacts/rejectRequest',
  },

  requestCallback: {
    method: 'POST',
    url: '/enquiry',
  },
  getPropertyDetails: {
    method: 'GET',
    url: '/property/one?',
  },
  uploadDocument: {
    method: 'POST',
    url: '/upload/pdf',
  },
  getAllResponses: {
    method: 'GET',
    url: '/ownerleads/all?',
  },
  getAllBusinessResponse: {
    method: 'GET',
    url: '/ownerleads/builder/all?',
  },
  getAllContacted: {
    method: 'GET',
    url: '/ownerleads/contacted-list?',
  },
  getAllFavourites: {
    method: 'GET',
    url: '/ownerleads/favorite-list?',
  },
  getAllResponseByPropId: {
    method: 'GET',
    url: '/ownerleads/searchByProperty/?',
  },
  favouriteLeads: {
    method: 'POST',
    url: '/ownerleads/favorite/',
  },
  getContactDetails: {
    method: 'GET',
    url: '/ownerleads/get-contact-details/',
  },
  contactDetailsRequest: {
    method: 'POST',
    url: '/contacts/acceptRequest',
  },
  convertToAgent: {
    method: 'POST',
    url: '/users/agent',
  },
  getCityListBySearch: {
    method: 'GET',
    url: '/property/city?city=',
  },
  getLocalityByCity: {
    method: 'GET',
    url: '/global/city-area?city=',
  },
  getChatContacts: {
    method: 'GET',
    url: '/contacts/list?',
  },
  getReviewDetail: {
    method: 'GET',
    url: '/global/static-review',
  },
  getPropertyById: {
    method: 'GET',
    url: '/property/one?',
  },

  updatePropertyById: {
    method: 'PUT',
    url: '/property/update',
  },
  highlightFetchingAPI: {
    method: 'GET',
    url: '/property/nearby?location=',
  },

  getAllSuggestions: {
    method: 'GET',
    url: '/suggestion/',
  },
  getSuggestionByValue: {
    method: 'GET',
    url: '/suggestion/get-all-suggestions?term=',
  },
  getFavoriteProperty: {
    method: 'GET',
    url: '/property/most-favorited?',
  },
  deleteAccount: {
    method: 'PATCH',
    url: 'users/delete-profile',
  },
  getTrendingProperty: {
    method: 'GET',
    url: '/property/most-viewed?',
  },
  getFeaturedProperty: {
    method: 'GET',
    url: '/property/featured?',
  },
  getAllLanguages: {
    method: 'GET',
    url: '/global/object-values/Languages',
  },
  getLookingFor: {
    method: 'GET',
    url: '/global/object-values/owner_looking_for',
  },
  getTenantFor: {
    method: 'GET',
    url: '/global/object-values/tenant_looking_for',
  },
  getBuyerFor: {
    method: 'GET',
    url: '/global/object-values/buyer_looking_for',
  },
  getPreference: {
    method: 'GET',
    url: '/global/object-values/property_preference',
  },
  getCities: {
    method: 'GET',
    url: '/global/cities',
  },
  getAreas: {
    method: 'GET',
    url: '/global/city-area',
  },
  getLookingForData: {
    method: 'GET',
    url: '/global/object-values/',
  },
  builderOnboarding: {
    method: 'PUT',
    url: '/builder/onboarding-details',
  },
  userOnboarding: {
    method: 'PUT',
    url: '/users/onboarding-details',
  },
  getPaymentUrl: {
    method: 'POST',
    url: '/subscription/main',
  },
  getBuilderPaymentUrl: {
    method: 'POST',
    url: '/subscription/builder/main',
  },

  builderListingAdding: {
    method: 'POST',
    url: '/property/builder/add',
  },

  getBuilderProperty: {
    method: 'GET',
    url: '/business/propertyByBusinessId/',
  },

  updateBuilderPropertyById: {
    method: 'PUT',
    url: '/property/builder/update',
  },
  getReview: {
    method: 'GET',
    url: '/global/mobile-static-review',
  },
  businessCategory: {
    method: 'GET',
    url: '/global/object-values/business_categories',
  },
  businessProfileCreation: {
    method: 'POST',
    url: '/business/profile/add',
  },

  getsubscriptionOptions: {
    method: 'GET',
    url: '/subscription/options',
  },
  getBusinessProfile: {
    method: 'GET',
    url: '/business/get-business-by-id/',
  },

  getBuilderLeads: {
    method: 'GET',
    url: '/subscription/available-leads',
  },
  getBuilderLeadsList: {
    method: 'GET',
    url: '/ownerleads/builder/all',
  },
  getBuilderViewDetails: {
    method: 'GET',
    url: '/ownerleads/builder/view-lead',
  },

  businessDetails: {
    method: 'GET',
    url: '/business/businessDetails/',
  },

  requestBusinessChat: {
    method: 'POST',
    url: '/contacts/builder/sendRequest',
  },

  getBuilderBusinessImagesDetails: {
    method: 'GET',
    url: '/business/gallery/image/',
  },

  getBuilderBusinessVideoDetails: {
    method: 'GET',
    url: '/business/gallery/video/',
  },

  getBuilderBusinessAlbumDetails: {
    method: 'GET',
    url: '/business/gallery/album/',
  },

  getBuilderPostDetails: {
    method: 'GET',
    url: '/posts-and-stories/post/business-profile',
  },
  businessUpdate: {
    method: 'PUT',
    url: '/business/update-profile',
  },
  subscriptionHistory: {
    method: 'GET',
    url: '/subscription/history',
  },
  businessCin: {
    method: 'GET',
    url: '/business/verify-company/',
  },
  similarProperties: {
    method: 'GET',
    url: '/property/similar-properties',
  },
  getBusinessRatings: {
    method: 'GET',
    url: 'global/rating-preview',
  },
  getBusinessReviewDetails: {
    method: 'GET',
    url: 'global/review-details',
  },
  getOneUserRating: {
    method: 'GET',
    url: 'global/one-rating',
  },
  sendRating: {
    method: 'POST',
    url: 'global/rating',
  },
  followBusiness: {
    method: 'POST',
    url: 'follow/follow-profile',
  },
  unFollowBusiness: {
    method: 'POST',
    url: '/follow/unfollow/',
  },
  sharingProperty: {
    method: 'POST',
    url: 'sharing/tagging',
  },
  eventSpaceListingAdding: {
    method: 'POST',
    url: '/business/add-event-space-listings',
  },

  exclusiveServiceListingAdding: {
    method: 'POST',
    url: '/business/add-exclusive-service-listing',
  },

  getSharingInvestment: {
    method: 'GET',
    url: 'sharing/user-tagged-properties/investment-sharing',
  },
  getShareProperty: {
    method: 'GET',
    url: 'sharing/user-tagged-properties/property-sharing',
  },
  getPropertyTagging: {
    method: 'GET',
    url: '/sharing/property-taggings',
  },

  taggingChat: {
    method: 'POST',
    url: 'sharing/tagging_chat',
  },
  getInvestmentChat: {
    method: 'GET',
    url: 'sharing/taggings-chat',
  },

  storyLike: {
    method : 'POST',
    url : 'posts-and-stories/like'
  },
  storyShare:{
    method : 'POST',
    url :'posts-and-stories/share'
  },


  jointwaitlistAdding: {
    method: 'POST',
    url: '/waitinglist/create-waitlist',
  },
  businessListing: {
    method: 'GET',
    url: '/business/get-listing-by-id/',
  },

};

export const {
  loginApi,
  signUpApi,
  getUserDetail,
  getRefreshToken,
  verifySignupOtp,
  reSendOtp,
  getBusinessProfileUserApi,
  uploadImage,
  uploadVideo,
  updateUserData,
  getGlobalProperty,
  videoUpload,
  storyUpload,
  storyByCity,
  sendOtpEmail,
  getEmailVailability,
  emailOtpVerify,
  googleCityAutoComplete,
  getUserImages,
  getUserAlbums,
  getUserVideos,
  createPostApi,
  updatePostApi,
  getUserDetailById,
  commentListById,
  addCommentById,
  deleteCommentById,
  replyCommentById,
  updateCommentById,
  getAllReplyCommentById,
  addLikeToPost,
  getPostLikes,
  updateShareCount,
  hideProperty,
  requestPhoto,
  deletProperty,
  getUserPosts,
  getAllUserFavouriteProperty,
  getUserProperty,
  propertyFavUnfav,
  deletePostApi,
  reportPost,
  getUserinfo,
  renewProperty,
  reActiveProperty,
  propertyDescription,
  propertyAdding,
  getPaymentHistory,
  getSubscriptions,
  globalSearch,
  globalNearu,
  requestChat,
  requestCallback,
  getTaxInvoices,
  getPropertyDetails,
  uploadDocument,
  getAllResponses,
  getAllBusinessResponse,
  getAllContacted,
  getAllFavourites,
  getAllResponseByPropId,
  favouriteLeads,
  getContactDetails,
  contactDetailsRequest,
  getNotification,
  acceptRequestChat,
  rejectRequestChat,
  convertToAgent,
  getCityListBySearch,
  getLocalityByCity,
  getChatContacts,
  logoutNotification,
  loginNotification,
  getAllNotification,
  getAllUnreadNotification,
  updateNotification,
  getPropertyById,
  updatePropertyById,
  highlightFetchingAPI,
  getAllSuggestions,
  getSuggestionByValue,
  getFavoriteProperty,
  deleteAccount,
  getReviewDetail,
  getTrendingProperty,
  getFeaturedProperty,
  getAllLanguages,
  getSubscriptionPlans,
  getLookingFor,
  getTenantFor,
  getBuyerFor,
  getPreference,
  getCities,
  getLookingForData,
  getAreas,
  builderOnboarding,
  userOnboarding,
  getPaymentUrl,
  getBuilderPaymentUrl,
  builderListingAdding,
  getBuilderProperty,
  updateBuilderPropertyById,
  getBusinessRatings,
  getBusinessReviewDetails,
  getOneUserRating,
  sendRating,
  getReview,
  businessCategory,
  businessProfileCreation,
  getsubscriptionOptions,
  getBusinessProfile,

  getBuilderLeads,
  getBuilderLeadsList,
  getBuilderViewDetails,

  businessDetails,
  businessCin,
  requestBusinessChat,

  getSharingInvestment,
  getShareProperty,
  getPropertyTagging,
  taggingChat,
  getInvestmentChat,

  followBusiness,
  unFollowBusiness,
  sharingProperty,

  getBuilderBusinessImagesDetails,
  getBuilderBusinessVideoDetails,
  getBuilderBusinessAlbumDetails,
  getBuilderPostDetails,
  businessUpdate,
  subscriptionHistory,
  similarProperties,

  eventSpaceListingAdding,
  exclusiveServiceListingAdding,

  storyLike,
  storyShare,

  jointwaitlistAdding,
  businessListing,

} = endpoints;
