import { createSlice } from '@reduxjs/toolkit';

// import { signupService } from '../signup/signupService';
import { RootState } from '../store';
import { SLICE_TYPES } from '../types';

const initialState = {
  business: {},
  data: {},
  eventspaceone: {},
  eventspacetwo: {},
  eventspacethree: {},

  exclusiveserviceone: {},
  exclusiveservicetwo: {},
  exclusiveservicethree: {},
};

const businessSlice = createSlice({
  name: SLICE_TYPES.BUSINESS,
  initialState,
  reducers: {
    updateBusiness: () => {
      return {
        business: {},
      };
    },

    //event space

    setEventSpaceStepOne: (state, action) => {
      return {
        ...state,
        eventspaceone: action.payload,
      };
    },

    clearEventSpaceStepOne: state => {
      return {
        ...state,
        eventspaceone: {},
      };
    },

    setEventSpaceStepTwo: (state, action) => {
      return {
        ...state,
        eventspacetwo: action.payload,
      };
    },

    clearEventSpaceStepTwo: state => {
      return {
        ...state,
        eventspacetwo: {},
      };
    },

    setEventSpaceStepThree: (state, action) => {
      return {
        ...state,
        eventspacethree: action.payload,
      };
    },

    clearEventSpaceStepThree: state => {
      return {
        ...state,
        eventspacethree: {},
      };
    },

    // exclusive service

    setExclusiveServiceStepOne: (state, action) => {
      return {
        ...state,
        exclusiveserviceone: action.payload,
      };
    },

    clearExclusiveServiceStepOne: state => {
      return {
        ...state,
        exclusiveserviceone: {},
      };
    },

    setExclusiveServiceStepTwo: (state, action) => {
      return {
        ...state,
        exclusiveservicetwo: action.payload,
      };
    },

    clearExclusiveServiceStepTwo: state => {
      return {
        ...state,
        exclusiveservicetwo: {},
      };
    },

    // updateUserData: (state, action) => {
    //   console.log('updateUserData+++++++++', action.payload);
    //   return {
    //     ...state,
    //     user: action.payload.data,
    //     loginStatus: action.payload.status,
    //   };
    // },
  },
  extraReducers: builder => {
    // builder.addMatcher(loginService.endpoints.validateLoginOTP.matchFulfilled, (state, action) => {
    //   console.log('validateLoginOTP+++', action.payload);
    //   const { payload } = action;
    //   state.accessToken = payload?.access_token;
    //   setMMKVItem(MMKV_KEYS.ACCESS_TOKEN, payload?.access_token);
    // });
    // builder.addMatcher(loginService.endpoints.getUserData.matchFulfilled, (state, action) => {
    //   console.log('getUserData+++', action.payload);
    //   const { payload } = action;
    //   state.user = payload.user;
    //   state.loginStatus = true;
    // });
    // builder.addMatcher(loginService.endpoints.verifySignupOtp.matchFulfilled, (state, action) => {
    //   console.log('verifySignupOtp+++', action.payload);
    //   const { payload } = action;
    //   state.accessToken = payload?.access_token;
    //   setMMKVItem(MMKV_KEYS.ACCESS_TOKEN, payload?.access_token);
    // });
  },
});

export const {
  updateBusiness,
  setEventSpaceStepOne,
  setEventSpaceStepTwo,
  setEventSpaceStepThree,

  clearEventSpaceStepOne,
  clearEventSpaceStepTwo,
  clearEventSpaceStepThree,

  //exclusive service

  setExclusiveServiceStepOne,
  setExclusiveServiceStepTwo,

  clearExclusiveServiceStepOne,
  clearExclusiveServiceStepTwo,
} = businessSlice.actions;

export const getBusinessDetails = (state: RootState) => state.business;

export const selectBusinessData = (state: RootState) => state.business.data;

export const selectEventSpaceData = (state: RootState) => state.business.data;
export const selectEventSpaceStepOne = (state: RootState) => state.business.eventspaceone;
export const selectEventSpaceStepTwo = (state: RootState) => state.business.eventspacetwo;
export const selectEventSpaceStepThree = (state: RootState) => state.business.eventspacethree;

//exclusive service

export const selectExclusiveServiceStepOne = (state: RootState) => state.business.exclusiveserviceone;
export const selectExclusiveServiceStepTwo = (state: RootState) => state.business.exclusiveservicetwo;

export default businessSlice.reducer;
