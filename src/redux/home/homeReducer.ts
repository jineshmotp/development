import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SLICE_TYPES } from '../types';
import { homeService } from './homeService';

const initialState = {
  data: {},
  isHideTabs: false,
  scrollToTop: false,
  trendingProperty: [],
  featuredProperty: [],
  isFlashOnboarding: false,
};

const homeSlice = createSlice({
  name: SLICE_TYPES.HOME,
  initialState,
  reducers: {
    hideBottomTabs: (state, action) => {
      return {
        ...state,
        isHideTabs: action.payload,
      };
    },
    scrollTop: (state, action) => {
      return {
        ...state,
        scrollToTop: action?.payload,
      };
    },

    activeFlashOnboarding: state => {
      return {
        ...state,
        isFlashOnboarding: true,
      };
    },

    deactiveFlashOnboarding: state => {
      return {
        ...state,
        isFlashOnboarding: false,
      };
    },
  },
  extraReducers: builder => {
    builder.addMatcher(homeService.endpoints.getTrendingProperty.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.trendingProperty = payload?.data || [];
    });
    builder.addMatcher(homeService.endpoints.getFeaturedProperty.matchFulfilled, (state, action) => {
      const { payload } = action;

      state.featuredProperty = payload?.data || [];
    });
  },
});

export const { hideBottomTabs, scrollTop, activeFlashOnboarding, deactiveFlashOnboarding } = homeSlice.actions;

export const getGlobalPropertyData = (state: RootState) => state.home.data;
export const getHideBottonTabs = (state: RootState) => state.home.isHideTabs;
export const getScrollToTop = (state: RootState) => state.home.scrollToTop;
export const getAllTrendingProperty = (state: RootState) => state.home.trendingProperty;
export const getAllFeaturedProperty = (state: RootState) => state.home.featuredProperty;

export const getisFlashOnboarding = (state: RootState) => state.home.isFlashOnboarding;

export default homeSlice.reducer;
