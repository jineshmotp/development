import {
  getAllNotification,
  getAllUnreadNotification,
  getNotification,
  loginNotification,
  logoutNotification,
  updateNotification,
} from '../../services/endpoints';
import { apiSlice } from '../apiSlice';

export const notificationService = apiSlice.injectEndpoints({
  endpoints: build => ({
    getNotification: build.mutation({
      query: payload => ({
        ...getNotification,
        data: payload,
      }),
    }),
    logoutNotification: build.mutation({
      query: payload => ({
        ...logoutNotification,
        data: payload,
      }),
    }),
    loginNotification: build.mutation({
      query: payload => ({
        ...loginNotification,
        data: payload,
      }),
    }),
    // validateVideo: build.mutation({
    //   query: payload => ({
    //     ...videoUpload,
    //     data: payload,
    //   }),
    // }),
    // validateStory: build.mutation({
    //   query: payload => ({
    //     ...storyUpload,
    //     data: payload,
    //   }),
    // }),
    getAllNotification: build.query({
      query: payload => ({
        ...getAllNotification,
        url: getAllNotification.url + `${payload}`,
      }),
    }),
    getAllUnreadNotification: build.query({
      query: payload => ({
        ...getAllUnreadNotification,
        url: getAllUnreadNotification.url + `${payload}`,
      }),
    }),
    updateNotification: build.query({
      query: payload => ({
        ...updateNotification,
        url: updateNotification.url + `${payload}`,
      }),
    }),
  }),
});

export const {
  useGetNotificationMutation,
  useLogoutNotificationMutation,
  useLoginNotificationMutation,
  useGetAllNotificationQuery,
  useLazyGetAllNotificationQuery,
  useGetAllUnreadNotificationQuery,
  useLazyGetAllUnreadNotificationQuery,
  useLazyUpdateNotificationQuery,
} = notificationService;
