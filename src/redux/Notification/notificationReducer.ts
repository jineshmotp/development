import { stat } from 'react-native-fs';

import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SLICE_TYPES } from '../types';

const initialState = {
  data: {},
  fcToken: '',
};

const notificationSlice = createSlice({
  name: SLICE_TYPES.NOTIFICATION,
  initialState,
  reducers: {
    // actionPart: (state, payload) => {},
    notificationToken: (state, action) => {
      return {
        ...state,
        fcToken: action.payload,
      };
    },
  },
  extraReducers: () => {},
});

export const { notificationToken } = notificationSlice.actions;

export const getNotificationData = (state: RootState) => state.notification.data;
export const getFcToken = (state: RootState) => state.notification.fcToken;

export default notificationSlice.reducer;
