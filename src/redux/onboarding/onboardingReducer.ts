import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SLICE_TYPES } from '../types';

const initialState = {
  user: {
    stepOneData: {
      userRole: '',
    },
    stepTwoData: {
      userLooking: [],
    },

    stepThreeData: {
      userPreference: [],
    },
    stepFourData: {
      userCity: [],
      userDate: '',
    },
  },

  builder: {
    stepOneData: {
      fname: '',
      description: '',
      optSince: '',
    },
    stepTwoData: {
      languages: [],
      rera: '',
    },
    stepThreeData: {
      propertyType: [],
      buildType: [],
      transactionType: [
        { name: 'New', checked: false },
        { name: 'Pre Owned', checked: false },
      ],
    },
    stepFourData: {
      areaCityData: [{ city: '', locality: '' }],
      refCode: '',
    },
  },
};

const onboardingReducer = createSlice({
  name: SLICE_TYPES.ONBOARDING,
  initialState,
  reducers: {
    // selectedLanguages: (state, action) => {
    //   return {
    //     ...state,
    //     builder: {
    //       ...state.builder,
    //       stepTowData: {
    //         ...state?.builder?.stepTowData,
    //         languages: action.payload,
    //       },
    //     },
    //   };
    // },
    resetOnBoarding: (state, action) => {
      return initialState;
    },
    selectedRole: (state, action) => {
      return {
        ...state,
        role: action?.payload,
      };
    },

    userStepOne: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          stepOneData: action?.payload,
        },
      };
    },
    userStepTwo: (state, action) => {
       console.log('+++++++++++++++++++++', action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          stepTwoData: action?.payload,
        },
      };
    },
    userStepThree: (state, action) => {
      // console.log('+++++++++++++++++++++', action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          stepThreeData: action?.payload,
        },
      };
    },
    userStepFour: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          stepFourData: action?.payload,
        },
      };
    },

    builderStepOne: (state, action) => {
      return {
        ...state,
        builder: {
          ...state.builder,
          stepOneData: action?.payload,
        },
      };
    },
    builderStepTwo: (state, action) => {
      return {
        ...state,
        builder: {
          ...state.builder,
          stepTwoData: action?.payload,
        },
      };
    },
    builderStepThree: (state, action) => {
      return {
        ...state,
        builder: {
          ...state.builder,
          stepThreeData: action?.payload,
        },
      };
    },
    builderStepFour: (state, action) => {
      // console.log('+++++++++++++++++++++', action.payload);
      return {
        ...state,
        builder: {
          ...state.builder,
          stepFourData: action?.payload,
        },
      };
    },
  },
  extraReducers: builder => {
    // builder.addMatcher(homeService.endpoints.getTrendingProperty.matchFulfilled, (state, action) => {
    //   const { payload } = action;
    //   state.trendingProperty = payload?.data || [];
    // });
    // builder.addMatcher(homeService.endpoints.getFeaturedProperty.matchFulfilled, (state, action) => {
    //   const { payload } = action;
    //   state.featuredProperty = payload?.data || [];
    // });
  },
});

export const {
  builderStepFour,
  builderStepOne,
  builderStepThree,
  builderStepTwo,
  userStepOne,
  userStepTwo,
  userStepThree,
  userStepFour,
  selectedRole,
  resetOnBoarding,
} = onboardingReducer.actions;

export const getBuilderStepOne = (state: RootState) => state.onboarding.builder.stepOneData;
export const getBuilderStepTwo = (state: RootState) => state.onboarding.builder.stepTwoData;
export const getBuilderStepThree = (state: RootState) => state.onboarding.builder.stepThreeData;
export const getBuilderStepFour = (state: RootState) => state.onboarding.builder.stepFourData;
export const getBuilderData = (state: RootState) => state.onboarding.builder;
export const getUserOnboardingData = (state:RootState) => state.onboarding.user
export const getUserStepOne = (state: RootState) => state.onboarding.user.stepOneData;
export const getUserStepTwo = (state: RootState) => state.onboarding.user.stepTwoData;

export const getUserStepThree = (state: RootState) => state.onboarding.user.stepThreeData;
export const getUserStepFour = (state: RootState) => state.onboarding.user.stepFourData;
export const getSelectedRole = (state: RootState) => state.onboarding.role;
export default onboardingReducer.reducer;
