import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SLICE_TYPES } from '../types';

interface BuilderState {
  data: any;
  posttwo: any;
  postthree: any;
  postfour: any;
  basicdata: any;
}

const initialState: BuilderState = {
  data: {},
  posttwo: {},
  postthree: {},
  postfour: {},
};

const builderSlice = createSlice({
  name: SLICE_TYPES.LISTING,
  initialState,
  reducers: {
    setBusinessBasicData: (state, action) => {
      return {
        ...state,
        basicdata: action.payload,
      };
    },

    clearBusinessBasicData: state => {
      return {
        ...state,
        basicdata: {},
      };
    },

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
  },
  extraReducers: () => {},
});

export const {
  setPropertyStepTwoData,
  setPropertyStepThreeData,
  setPropertyStepFourData,
  clearPropertyStepTwoData,
  clearPropertyStepThreeData,
  clearPropertyStepFourData,
  setBusinessBasicData,
  clearBusinessBasicData,
} = builderSlice.actions;

export const selectPropertyListingData = (state: RootState) => state.builder.data;
export const selectPropertyStepTwoData = (state: RootState) => state.builder.posttwo;
export const selectPropertyStepThreeData = (state: RootState) => state.builder.postthree;
export const selectPropertyStepFourData = (state: RootState) => state.builder.postfour;

export const selectBusinessBasicData = (state: RootState) => state.builder.basicdata;

export default builderSlice.reducer;
