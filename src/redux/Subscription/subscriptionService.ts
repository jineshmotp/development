import { apiSlice } from '../../redux/apiSlice';
import {
  getBuilderPaymentUrl,
  getPaymentHistory,
  getPaymentUrl,
  getSubscriptionPlans,
  getSubscriptions,
  getTaxInvoices,
  subscriptionHistory,
} from '../../services/endpoints';

export const subscriptionService = apiSlice.injectEndpoints({
  endpoints: build => ({
    getPaymentDetails: build.query({
      query: () => ({
        ...getPaymentHistory,
      }),
    }),
    getSubscriptions: build.query({
      query: () => ({
        ...getSubscriptions,
      }),
    }),
    getSubscriptionPlans: build.query({
      query: payload => ({
        ...getSubscriptionPlans,
        url: getSubscriptionPlans.url + `?${new URLSearchParams(payload).toString()}`,
      }),
    }),
    getTaxInvoices: build.query({
      query: () => ({
        ...getTaxInvoices,
      }),
    }),
    getPaymentUrl: build.mutation({
      query: payload => ({
        ...getPaymentUrl,
        data: payload,
      }),
    }),
    getBuilderPaymentUrl: build.mutation({
      query: payload => ({
        ...getBuilderPaymentUrl,
        data: payload,
      }),
    }),
    subscriptionHistory: build.query({
      query: queryString => ({
        ...subscriptionHistory,
        url: subscriptionHistory.url + `?${queryString}`,
      }),
    }),
  }),
});

export const {
  useGetPaymentDetailsQuery,
  useGetSubscriptionsQuery,
  useLazyGetTaxInvoicesQuery,
  useGetSubscriptionPlansQuery,
  useLazyGetSubscriptionPlansQuery,
  useGetPaymentUrlMutation,
  useGetBuilderPaymentUrlMutation,
  useLazySubscriptionHistoryQuery,
} = subscriptionService;
