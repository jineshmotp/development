import { createSlice } from '@reduxjs/toolkit';

import { MMKV_KEYS, setMMKVItem } from '@/utils/mmkv';

// import { signupService } from '../signup/signupService';
import { RootState } from '../store';
import { SLICE_TYPES } from '../types';
import { loginService } from './loginService';

const initialState = {
  user: {},
  loginStatus: false,
  accessToken: '',
  refreshToken: '',
  reload: false,
  review: false,
};

const loginSlice = createSlice({
  name: SLICE_TYPES.LOGIN,
  initialState,
  reducers: {
    resetLogin: (state, action) => {
      return {
        user: {},
        loginStatus: false,
        accessToken: '',
        refreshToken: '',
        reload: false,
        review: false,
      };
    },
    updateUserData: (state, action) => {
      // console.log('updateUserData+++++++++', action.payload);
      return {
        ...state,
        user: { ...state.user, ...action?.payload },
      };
    },
    getReloadData: (state, action) => {
      // console.log('updateUserData+++++++++', action.payload);
      return {
        ...state,
        reload: !state.reload,
      };
    },

    updateLoginStatus: (state, action) => {
      return {
        ...state,
        loginStatus: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addMatcher(loginService.endpoints.validateLoginOTP.matchFulfilled, (state, action) => {
      // console.log('validateLoginOTP+++', action.payload);
      const { payload } = action;
      setMMKVItem(MMKV_KEYS.ACCESS_TOKEN, payload?.access_token);
      setMMKVItem(MMKV_KEYS.REFRESH_TOKEN, payload?.refresh_token);
      state.accessToken = payload?.access_token;
      state.refreshToken = payload?.refresh_token;
    });
    builder.addMatcher(loginService.endpoints.getUserData.matchFulfilled, (state, action) => {
      // console.log('getUserData+++', action.payload.data);
      const { payload } = action;
      state.user = payload.data;
      // state.loginStatus = true;
    });
    builder.addMatcher(loginService.endpoints.getUserinfo.matchFulfilled, (state, action) => {
      // console.log('getUserData+++', action.payload.data);
      const { payload } = action;
      state.user = payload.data;
    });
    builder.addMatcher(loginService.endpoints.createPostApi.matchFulfilled, (state, action) => {
      state.reload = true;
    });
    builder.addMatcher(loginService.endpoints.updatePostApi.matchFulfilled, (state, action) => {
      state.reload = true;
    });
    // builder.addMatcher(loginService.endpoints.emailOtpVerify.matchFulfilled, (state, action) => {
    //   console.log('getUserData+++', action.payload);
    //   const { payload } = action;
    //   if(payload.status==='success'){

    //   }
    //   // state.user = payload.data;
    //   // state.loginStatus = true;
    // });
    builder.addMatcher(loginService.endpoints.verifySignupOtp.matchFulfilled, (state, action) => {
      // console.log('verifySignupOtp+++', action.payload);
      const { payload } = action;
      state.accessToken = payload?.access_token;
      state.refreshToken = payload?.refresh_token;
      setMMKVItem(MMKV_KEYS.ACCESS_TOKEN, payload?.access_token);
      setMMKVItem(MMKV_KEYS.REFRESH_TOKEN, payload?.refresh_token);
    });
    builder.addMatcher(loginService.endpoints.updateUserDetails.matchFulfilled, (state, action) => {
      // console.log('updateUserDetails+++', action.payload);
      const { payload } = action;
      state.user = payload?.data;
    });
    builder.addMatcher(loginService.endpoints.getReviewDetail.matchFulfilled, (state, action) => {
      // console.log('updateUserDetails+++', action.payload);
      const { payload } = action;
      // console.log('getReviewDetail', payload);
      state.review = !payload?.data?.isReview;
    });
  },
});

export const { resetLogin, updateUserData, getReloadData, updateLoginStatus } = loginSlice.actions;

export const getUserDetails = (state: RootState) => state.login;
export const getLoginStatus = (state: RootState) => state.login.loginStatus;
export const getReloadStatus = (state: RootState) => state.login.reload;
export const getUserData = (state: RootState) => state.login.user;
export const getAppReview = (state: RootState) => state.login.review;
export const getAppToken = (state: RootState) => state.login.accessToken;

export default loginSlice.reducer;
