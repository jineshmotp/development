import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SLICE_TYPES } from '../types';

interface ListingState {
  data: any;
  posttwo: any;
  postthree: any;
  postfour: any;
  locationData: any;
  subscriptionData: any;
}

const initialState: ListingState = {
  data: {},
  posttwo: {},
  postthree: {},
  postfour: {},
  locationData: {},
  subscriptionData: {},
};

const listingSlice = createSlice({
  name: SLICE_TYPES.LISTING,
  initialState,
  reducers: {
    setPropertyStepTwoData: (state, action) => {
      return {
        ...state,
        posttwo: action.payload,
      };
    },

    clearPropertyStepTwoData: state => {
      return {
        ...state,
        posttwo: {},
      };
    },

    setPropertyStepThreeData: (state, action) => {
      return {
        ...state,
        postthree: action.payload,
      };
    },

    clearPropertyStepThreeData: state => {
      return {
        ...state,
        postthree: {},
      };
    },

    setPropertyStepFourData: (state, action) => {
      return {
        ...state,
        postfour: action.payload,
      };
    },
    clearPropertyStepFourData: state => {
      return {
        ...state,
        postfour: {},
      };
    },
    setPropertyLocationData: (state, action) => {
      return {
        ...state,
        locationData: action.payload,
      };
    },
    clearPropertyLocationData: state => {
      return {
        ...state,
        locationData: {},
      };
    },

    setSubscriptionData: (state, action) => {
      return {
        ...state,
        subscriptionData: action.payload,
      };
    },
    clearSubscriptionData: state => {
      return {
        ...state,
        subscriptionData: {},
      };
    },
  },
  extraReducers: () => {},
});

export const {
  setPropertyStepTwoData,
  setPropertyStepThreeData,
  setPropertyStepFourData,
  setPropertyLocationData,

  clearPropertyStepTwoData,
  clearPropertyStepThreeData,
  clearPropertyStepFourData,
  clearPropertyLocationData,

  setSubscriptionData,
  clearSubscriptionData,
} = listingSlice.actions;

export const selectPropertyListingData = (state: RootState) => state.listing.data;
export const selectPropertyStepTwoData = (state: RootState) => state.listing.posttwo;
export const selectPropertyStepThreeData = (state: RootState) => state.listing.postthree;
export const selectPropertyStepFourData = (state: RootState) => state.listing.postfour;
export const selectPropertyLocationData = (state: RootState) => state.listing.locationData;
export const selectSubscriptionData = (state: RootState) => state.listing.subscriptionData;

export default listingSlice.reducer;
