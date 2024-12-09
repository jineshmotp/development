import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SLICE_TYPES } from '../types';

const initialState = {
  data: {},
  paymentHistory: [],
  selectPlanIndex: 0,
  userSubscriptionPlan: {},
};

const subscriptionSlice = createSlice({
  name: SLICE_TYPES.SUBSCRIPTION,
  initialState,
  reducers: {
    // actionPart: (state, payload) => {},
    getPaymentHistory: (state, action) => {
      // console.log('updateUserData+++++++++', action.payload);
      return {
        ...state,
        paymentHistory: action.payload,
      };
    },
    selectPlanIndex: (state, action) => {
      // console.log('updateUserData+++++++++', action.payload);
      return {
        ...state,
        selectPlanIndex: action.payload,
      };
    },

    setUserSubscriptionPlanData: (state, action) => {
      return {
        ...state,
        userSubscriptionPlan: action.payload,
      };
    },
  },
  extraReducers: () => {},
});

export const { getPaymentHistory, selectPlanIndex } = subscriptionSlice.actions;

export const getSubscriptionData = (state: RootState) => state.subscription.data;
export const getSelectedPlanIndex = (state: RootState) => state.subscription.selectPlanIndex;
export const getPaymentHistoryDetails = (state: RootState) => state.subscription.paymentHistory;

export default subscriptionSlice.reducer;
