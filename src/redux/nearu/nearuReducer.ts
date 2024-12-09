import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SLICE_TYPES } from '../types';

const initialState = {
  data: {},
  location: { city: '', street: '', lat: '', long: '', state: '' },
  autolocation: { city: '', street: '', lat: '', long: '', state: '' },
};

const nearuSlice = createSlice({
  name: SLICE_TYPES.NEARU,
  initialState,
  reducers: {
    // actionPart: (state, payload) => {},
    setLocation: (state, action) => {
      return {
        ...state,
        location: action.payload,
      };
    },
    setLocationStore: (state, action) => {
      return {
        ...state,
        autolocation: action.payload,
      };
    },
  },
  extraReducers: () => {},
});

export const { setLocation, setLocationStore } = nearuSlice.actions;

export const elasticSearchData = (state: RootState) => state.nearu.data;
export const getLatLongData = (state: RootState) => state.nearu.location;
export const setLatLongData = (state: RootState) => state.nearu.autolocation;

export default nearuSlice.reducer;
