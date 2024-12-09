import { createSlice } from '@reduxjs/toolkit';







import { RootState } from '../store';
import { SLICE_TYPES } from '../types';
import { signupService } from './signupService';


const initialState = {
  // email: values.email,
  fname: '',
  lname: '',
  mobileNo: '',
  role:'',
};

const signUpSlice = createSlice({
  name: SLICE_TYPES.SIGNUP,
  initialState,
  reducers: {
    // resetLogin: () => {
    //   return {
    //     username: '',
    //     data: {},
    //     loginStatus: false,
    //     accessToken: '',
    //   };
    // },
  },
  // extraReducers: builder => {
  //   builder.addMatcher(signupService.endpoints.verifySingupOtp.matchFulfilled, (state, action) => {
  //     const { payload } = action;
  //     state.fname = payload.fname;
  //     state.lname = payload.lname;
  //     state.mobileNo = payload.mobileNo;
  //     setMMKVItem(MMKV_KEYS.ACCESS_TOKEN, payload?.token);
  //   });
  // },
});

// export const { resetLogin } = signUpSlice.actions;

export const getUserDetails = (state: RootState) => state.signup;
// export const getLoginStatus = (state: RootState) => state.login.loginStatus;

export default signUpSlice.reducer;